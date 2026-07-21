from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role
from app.models.team import Team
from app.models.decision import Decision
from app.models.review import Review
from app.models.replay import Replay
from app.models.activity_log import ActivityLog


def _time_ago(dt) -> str:
    """Convert a datetime to a human-readable 'X min/hr ago' string."""
    if dt is None:
        return "—"
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)
    diff = now - dt
    seconds = int(diff.total_seconds())
    if seconds < 60:
        return f"{seconds} sec ago"
    elif seconds < 3600:
        return f"{seconds // 60} min ago"
    elif seconds < 86400:
        return f"{seconds // 3600} hr{'s' if seconds // 3600 > 1 else ''} ago"
    else:
        return f"{seconds // 86400} day{'s' if seconds // 86400 > 1 else ''} ago"


def _severity_for_action(action: str) -> str:
    low = action.lower()
    if any(k in low for k in ("fail", "denied", "blocked", "suspend", "deactivat", "breach", "critical")):
        return "Critical"
    if any(k in low for k in ("warning", "attempt", "update", "role", "permission", "password reset")):
        return "Warning"
    return "Info"


def _module_for_action(action: str) -> str:
    low = action.lower()
    if "login" in low or "auth" in low or "password" in low:
        return "Auth"
    if "decision" in low:
        return "Decisions"
    if "role" in low or "permission" in low:
        return "Roles"
    if "user" in low or "account" in low:
        return "Users"
    if "report" in low or "export" in low:
        return "Reports"
    if "review" in low:
        return "Reviews"
    return "System"


class DashboardRepository:

    @staticmethod
    def get_dashboard(db: Session, user_id: int):

        import hashlib

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            return None

        role = (
            db.query(Role)
            .filter(Role.id == user.role_id)
            .first()
        )

        team = (
            db.query(Team)
            .filter(Team.id == user.team_id)
            .first()
        )

        role_name = role.role_name if role else "User"

        # Apply Hash for User Details if not Administrator
        if role_name in ("Administrator", "Admin"):
            display_user = user.full_name
        else:
            display_user = hashlib.sha256(user.full_name.encode()).hexdigest()[:12]

        # ── Default (non-admin) fields ──────────────────────────────
        total_users = 0
        active_users = 0
        total_audit_logs = 0
        approved_decisions = 0
        rejected_decisions = 0
        draft_decisions = 0
        recent_users_raw = []
        recent_audit_raw = []

        if role_name in ("Administrator", "Admin"):
            # ── Core stats ──────────────────────────────────────────
            total_decisions = db.query(Decision).count()
            pending_reviews = db.query(Review).filter(Review.status == "Pending").count()
            total_replays = db.query(Replay).count()
            approved_decisions = db.query(Decision).filter(Decision.status == "Approved").count()
            rejected_decisions = db.query(Decision).filter(Decision.status == "Rejected").count()
            draft_decisions = db.query(Decision).filter(Decision.status == "Draft").count()

            # ── Recent decisions with enriched info ─────────────────
            raw_decisions = (
                db.query(Decision)
                .order_by(Decision.id.desc())
                .limit(5)
                .all()
            )

            recent_decisions = []
            for d in raw_decisions:
                creator = db.query(User).filter(User.id == d.created_by).first()
                created_at_str = d.created_at.strftime("%b %d, %Y") if d.created_at else "—"
                recent_decisions.append({
                    "id": d.id,
                    "title": d.title,
                    "status": d.status,
                    "department": creator.designation or "—" if creator else "—",
                    "approver_name": creator.full_name if creator else "—",
                    "created_at_str": created_at_str,
                })

            recent_reviews = db.query(Review).order_by(Review.id.desc()).limit(5).all()
            recent_replays = db.query(Replay).order_by(Replay.id.desc()).limit(5).all()

            # ── User stats ──────────────────────────────────────────
            total_users = db.query(User).count()
            active_users = db.query(User).filter(User.is_active == True).count()

            # Recent new users
            recent_users_raw_query = (
                db.query(User)
                .order_by(User.id.desc())
                .limit(4)
                .all()
            )
            for u in recent_users_raw_query:
                u_role = db.query(Role).filter(Role.id == u.role_id).first()
                u_team = db.query(Team).filter(Team.id == u.team_id).first()
                parts = u.full_name.split()
                initials = (parts[0][0] + (parts[-1][0] if len(parts) > 1 else "")).upper()
                recent_users_raw.append({
                    "id": u.id,
                    "full_name": u.full_name,
                    "role_name": u_role.role_name if u_role else "User",
                    "team_name": u_team.team_name if u_team else "—",
                    "initials": initials,
                })

            # ── Audit / Activity logs ───────────────────────────────
            total_audit_logs = db.query(ActivityLog).count()
            logs_raw = (
                db.query(ActivityLog)
                .order_by(ActivityLog.id.desc())
                .limit(6)
                .all()
            )
            for log in logs_raw:
                log_user = db.query(User).filter(User.id == log.user_id).first()
                parts = (log_user.full_name.split() if log_user else ["System"])
                short_name = parts[0][0] + ". " + parts[-1] if len(parts) > 1 else parts[0]
                recent_audit_raw.append({
                    "user_name": short_name,
                    "action": log.action,
                    "module": _module_for_action(log.action),
                    "time_ago": _time_ago(log.created_at),
                    "severity": _severity_for_action(log.action),
                })

            # ── Approval flow ───────────────────────────────────────
            total = total_decisions or 1  # avoid division by zero
            in_review = db.query(Decision).filter(Decision.status == "In Review").count()
            archived = db.query(Decision).filter(Decision.status == "Archived").count()

            approval_flow = [
                {"stage": "Submitted",  "count": total_decisions, "pct": 100,                                        "color": "#94A3B8"},
                {"stage": "In Review",  "count": in_review,        "pct": round(in_review / total * 100),             "color": "#3B82F6"},
                {"stage": "Approved",   "count": approved_decisions,"pct": round(approved_decisions / total * 100),   "color": "#10B981"},
                {"stage": "Rejected",   "count": rejected_decisions,"pct": round(rejected_decisions / total * 100),   "color": "#EF4444"},
                {"stage": "Archived",   "count": archived,          "pct": round(archived / total * 100),             "color": "#CBD5E1"},
            ]

        elif role_name == "Manager":
            team_users = [u.id for u in db.query(User).filter(User.team_id == user.team_id).all()]
            total_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users)).count()
            pending_reviews = db.query(Review).filter(Review.reviewer_id == user_id, Review.status == "Pending").count()
            total_replays = db.query(Replay).filter(Replay.performed_by.in_(team_users)).count()
            approved_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users), Decision.status == "Approved").count()
            rejected_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users), Decision.status == "Rejected").count()
            draft_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users), Decision.status == "Draft").count()
            raw_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users)).order_by(Decision.id.desc()).limit(5).all()
            recent_decisions = [{"id": d.id, "title": d.title, "status": d.status, "department": None, "approver_name": None, "created_at_str": d.created_at.strftime("%b %d, %Y") if d.created_at else "—"} for d in raw_decisions]
            recent_reviews_raw = db.query(Review).filter(Review.reviewer_id == user_id, Review.status == "Pending").order_by(Review.id.desc()).limit(5).all()
            recent_reviews = []
            for r in recent_reviews_raw:
                d = db.query(Decision).filter(Decision.id == r.decision_id).first()
                if d:
                    author = db.query(User).filter(User.id == d.created_by).first()
                    author_name = author.full_name if author else "Unknown"
                    author_initials = (author_name.split()[0][0] + (author_name.split()[-1][0] if len(author_name.split()) > 1 else "")).upper() if author_name != "Unknown" else "U"
                    department = d.department if d.department else "General"
                    priority = d.priority_level if d.priority_level else "Medium"
                    recent_reviews.append({
                        "id": r.id,
                        "decision_id": r.decision_id,
                        "decision_title": d.title,
                        "author_name": author_name,
                        "author_initials": author_initials,
                        "department": department,
                        "priority": priority,
                        "time_ago": _time_ago(r.created_at)
                    })
            recent_replays = db.query(Replay).filter(Replay.performed_by.in_(team_users)).order_by(Replay.id.desc()).limit(5).all()
            approval_flow = []

        else:  # Employee / Reviewer
            total_decisions = db.query(Decision).filter(Decision.created_by == user_id).count()
            pending_reviews = db.query(Review).filter(Review.reviewer_id == user_id, Review.status == "Pending").count()
            total_replays = db.query(Replay).filter(Replay.performed_by == user_id).count()
            approved_decisions = db.query(Decision).filter(Decision.created_by == user_id, Decision.status == "Approved").count()
            rejected_decisions = db.query(Decision).filter(Decision.created_by == user_id, Decision.status == "Rejected").count()
            draft_decisions = db.query(Decision).filter(Decision.created_by == user_id, Decision.status == "Draft").count()
            raw_decisions = db.query(Decision).filter(Decision.created_by == user_id).order_by(Decision.id.desc()).limit(5).all()
            recent_decisions = [{"id": d.id, "title": d.title, "status": d.status, "department": None, "approver_name": None, "created_at_str": d.created_at.strftime("%b %d, %Y") if d.created_at else "—"} for d in raw_decisions]
            recent_reviews_raw = db.query(Review).filter(Review.reviewer_id == user_id, Review.status == "Pending").order_by(Review.id.desc()).limit(5).all()
            recent_reviews = []
            for r in recent_reviews_raw:
                d = db.query(Decision).filter(Decision.id == r.decision_id).first()
                recent_reviews.append({
                    "id": r.id,
                    "decision_id": r.decision_id,
                    "decision_title": d.title if d else "Unknown Decision",
                    "status": r.status,
                    "comments": r.comments,
                    "time_ago": _time_ago(r.created_at)
                })
            
            recent_replays = db.query(Replay).filter(Replay.performed_by == user_id).order_by(Replay.id.desc()).limit(5).all()
            
            logs_raw = db.query(ActivityLog).filter(ActivityLog.user_id == user_id).order_by(ActivityLog.id.desc()).limit(5).all()
            for log in logs_raw:
                recent_audit_raw.append({
                    "user_name": "You",
                    "action": log.action,
                    "module": _module_for_action(log.action),
                    "time_ago": _time_ago(log.created_at),
                    "severity": _severity_for_action(log.action),
                })
            approval_flow = []

        from app.models.notification import Notification
        unread_notifications_count = db.query(Notification).filter(Notification.user_id == user_id, Notification.is_read == False).count()
        recent_notifications_raw = db.query(Notification).filter(Notification.user_id == user_id).order_by(Notification.created_at.desc()).limit(5).all()
        recent_notifications = []
        for n in recent_notifications_raw:
            type_mapping = {
                "Alert": "warning",
                "Review Request": "info",
                "Approved": "success",
                "Rejected": "error",
                "System Update": "info"
            }
            n_type = type_mapping.get(n.notification_type, "info")
            if "fail" in n.message.lower() or "denied" in n.message.lower():
                n_type = "error"
                
            recent_notifications.append({
                "id": n.id,
                "title": n.notification_type,
                "message": n.message,
                "is_read": n.is_read,
                "type": n_type,
                "time_ago": _time_ago(n.created_at)
            })

        return {
            "user": display_user,
            "role": role_name,
            "team": team.team_name if team else "",

            "total_decisions": total_decisions,
            "pending_reviews": pending_reviews,
            "total_replays": total_replays,
            "approved_decisions": approved_decisions,
            "rejected_decisions": rejected_decisions,
            "draft_decisions": draft_decisions,
            "unread_notifications_count": unread_notifications_count,
            "recent_notifications": recent_notifications,

            "total_users": total_users,
            "active_users": active_users,
            "total_audit_logs": total_audit_logs,
            "system_health": "99%",

            "recent_decisions": recent_decisions,
            "recent_reviews": recent_reviews,
            "recent_replays": recent_replays,
            "recent_users": recent_users_raw,
            "recent_audit_logs": recent_audit_raw,
            "approval_flow": approval_flow,
        }