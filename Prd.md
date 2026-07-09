# Product Requirements Document (PRD)
# Expert Decision Replay Platform (EDRP)



**Stack:** FastAPI (Python) + PostgreSQL + React.js


---

## 1. Overview

The Expert Decision Replay Platform (EDRP) is a centralized web application that records, tracks, and preserves organizational decisions — the problem, alternatives considered, evaluation criteria, risks, stakeholders, discussions, approvals, and final outcomes.

The goal is to prevent institutional knowledge loss. Instead of decisions living in someone's inbox or a forgotten Slack thread, EDRP gives every decision a permanent, searchable, auditable record — so new employees, other teams, or the same team six months later can understand **why** a choice was made, not just **what** was chosen.

**Note on tech stack:** The original spec listed Tkinter/PyQt/Flask as frontend options. This PRD assumes the stack you're actually building — **FastAPI + PostgreSQL + React** — since that's what Milestone 1 is already implementing. Everything below (API contracts, data flow, UI) is written against that stack.

### 1.1 Target Users
- Enterprises, consulting firms, engineering orgs, healthcare institutions, government departments, universities, research organizations.

### 1.2 Core Value Proposition
| Problem | EDRP Solution |
|---|---|
| Decisions get made verbally / in scattered docs | Structured, mandatory decision record |
| No visibility into why an alternative was rejected | Alternative Analysis module with pros/cons, cost, risk |
| No accountability trail for approvals | Multi-level approval workflow with audit log |
| Repeating past mistakes | Searchable Knowledge Repository with tags/categories |
| No reporting for leadership | Analytics dashboards + exportable reports |

---

## 2. Goals & Success Metrics

| Goal | Metric | Target |
|---|---|---|
| Adoption | % of org decisions logged in EDRP vs. offline | >70% within 3 months of rollout |
| Approval efficiency | Avg. approval turnaround time | <48 hrs for standard decisions |
| Knowledge reuse | Searches per week on Knowledge Repository | Growing month over month |
| System reliability | API uptime | 99.5% |
| Performance | API p95 latency | <300ms for standard reads |
| Auditability | % of decisions with complete audit trail | 100% (non-negotiable) |

---

## 3. User Roles & Permissions

| Role | Description | Key Permissions |
|---|---|---|
| **Employee** | Creates and manages own decisions | Create/edit own decisions (draft), comment, view assigned reviews, view org-wide approved decisions (read-only) |
| **Reviewer** | Assigned to evaluate a decision at one approval stage | Comment, approve/reject at their stage, request more info, view full decision context |
| **Manager** | Owns team decisions, approves at manager level, views team analytics | All Reviewer permissions + team dashboard, team reports, escalation handling |
| **Administrator** | System owner | User/role/team management, system configuration, full audit log access, override permissions, org-wide analytics |

### 3.1 Role-Based Access Control (RBAC) Matrix

| Action | Employee | Reviewer | Manager | Admin |
|---|:---:|:---:|:---:|:---:|
| Create decision | ✅ | ✅ | ✅ | ✅ |
| Edit own draft decision | ✅ | ✅ | ✅ | ✅ |
| Edit others' decision | ❌ | ❌ | ✅ (team) | ✅ |
| Approve/reject | ❌ | ✅ (assigned) | ✅ | ✅ |
| View all org decisions | ❌ | ❌ | Team only | ✅ |
| Manage users/roles | ❌ | ❌ | ❌ | ✅ |
| Export reports | ✅ (own) | ✅ (own) | ✅ (team) | ✅ (org) |
| View audit logs | ❌ | ❌ | Team | ✅ |

---

## 4. Decision Lifecycle Workflow (Detailed)

This is the core state machine of the entire platform. Every decision object moves through these states:

```
DRAFT → UNDER_REVIEW → (APPROVED | REJECTED) → ARCHIVED
                ↑              |
                └── revision requested ──┘
```

### 4.1 State Definitions

1. **Draft** — Creator is filling out the decision record. Fully editable. Not visible to reviewers yet.
2. **Under Review** — Submitted for approval. Locked from free editing (edits require a new version). Assigned reviewer(s)/approver(s) notified.
3. **Approved** — All required approval levels signed off. Decision becomes part of the permanent Knowledge Repository.
4. **Rejected** — An approver rejected it. Creator is notified with rejection reason; can revise and resubmit (creates new version) or abandon.
5. **Archived** — Decision is no longer active (superseded, expired, or manually archived) but remains searchable for historical reference.

### 4.2 End-to-End Workflow Steps

**Step 1 — Decision Creation (Employee/Manager)**
1. User clicks "Create Decision" on dashboard.
2. Fills structured form: Title, Problem Statement, Category, Stakeholders, Target Decision Date.
3. Saves as Draft (auto-saved every 30s to prevent data loss).

**Step 2 — Alternative Analysis**
4. User adds 2+ alternatives, each with: description, pros, cons, estimated cost, feasibility score, risk level.
5. System requires at least one alternative marked as "Recommended" before submission is allowed.

**Step 3 — Discussion & Collaboration**
6. Stakeholders tagged in the decision receive a notification and can comment/add meeting notes before submission (pre-approval discussion phase).
7. Files (specs, cost sheets, vendor quotes) can be attached at this stage.

**Step 4 — Submission for Review**
8. Creator clicks "Submit for Approval." System validates all required fields are complete.
9. Decision status → `Under Review`. A version snapshot is created (v1).
10. Approval chain is auto-assigned based on Category + decision value/impact rules configured by Admin (e.g., decisions >₹5L require 2 approval levels).

**Step 5 — Multi-Level Approval**
11. Reviewer 1 gets notified → reviews → Approves / Rejects / Requests Changes.
    - If **Requests Changes**: status reverts to Draft, creator notified with comments, must resubmit (creates v2).
    - If **Rejected**: workflow ends, status → Rejected, full reason logged.
    - If **Approved**: moves to next approval level (if any) or finalizes.
12. This repeats for each configured approval level (e.g., Reviewer → Manager → Admin/Director for high-impact decisions).
13. Escalation: if a reviewer doesn't act within SLA (e.g., 72 hrs), system auto-escalates to their manager and logs the escalation event.

**Step 6 — Finalization**
14. On final approval, status → `Approved`. Timestamp, all approver signatures, and full history are locked/immutable.
15. Decision is indexed into the Knowledge Repository (searchable, tagged).
16. Implementation status field becomes active (Not Started → In Progress → Completed) for post-decision tracking.

**Step 7 — Post-Decision Tracking**
17. Assigned owner updates implementation status and can log the eventual outcome (Success / Partial / Failed + notes) — this closes the feedback loop that makes future decisions smarter.

**Step 8 — Archival**
18. Decisions can be manually archived by Admin/Manager, or auto-archived after a configurable retention period of inactivity. Archived decisions remain fully searchable and read-only.

### 4.3 Workflow Diagram (textual)

```
[Employee]
   |
   v
Create Decision (Draft) --> Add Alternatives --> Pre-approval Discussion
   |
   v
Submit for Review --------> [Under Review]
   |                             |
   |                    Auto-assign approval chain
   |                             |
   v                             v
                         Reviewer decision:
                    Approve | Reject | Request Changes
                             |
        ┌────────────────────┼─────────────────────┐
        v                    v                      v
   [Approved: next      [Rejected: END,        [Draft: revise
    level or DONE]        notify creator]        & resubmit]
        |
        v
  [Approved - Final]
        |
        v
  Knowledge Repository (indexed, searchable)
        |
        v
  Implementation Tracking --> Outcome Logging --> Archived
```

---

## 5. Data Flow Architecture

### 5.1 High-Level Data Flow

```
[React Frontend]
     | HTTPS (JWT in Authorization header)
     v
[FastAPI Application Layer]
     |--> Auth Middleware (JWT verify, role check)
     |--> Request Validation (Pydantic schemas)
     v
[Business Logic / Service Layer]
     |--> Decision Service
     |--> Approval Service
     |--> Notification Service
     |--> Audit Service
     |--> File Service
     v
[Data Access Layer (SQLAlchemy ORM)]
     v
[PostgreSQL Database]  <---->  [Redis (cache/session/queue)]
     |
     v
[File Storage: Local / AWS S3] (for attachments)
```

### 5.2 Detailed Data Flow — "Create & Submit a Decision"

1. **Client → API**: React sends `POST /api/v1/decisions` with JSON body (title, problem statement, category, stakeholder IDs).
2. **API → Auth**: JWT middleware decodes token, extracts `user_id`, `role`; verifies token not expired/blacklisted (checked against Redis blacklist for logout).
3. **API → Validation**: Pydantic schema `DecisionCreate` validates types/required fields; returns 422 on failure.
4. **API → Service**: `DecisionService.create()` builds ORM object, sets `status=DRAFT`, `created_by=user_id`, `version=1`.
5. **Service → DB**: SQLAlchemy commits new row to `decisions` table; a corresponding row is written to `decision_versions` (snapshot) and `audit_logs` (`action=CREATED`).
6. **DB → Service → API → Client**: Returns serialized decision object + `201 Created`.
7. **On Submit** (`PATCH /api/v1/decisions/{id}/submit`):
   - Service validates business rules (≥1 alternative, ≥1 recommended) — else 400 with explicit error.
   - Approval chain resolved via `ApprovalRuleEngine` (reads `approval_rules` table matched by category/impact).
   - `approval_instances` rows created for each level, status `PENDING`.
   - Notification Service pushes event to a queue (Redis/Celery or FastAPI BackgroundTasks) → email/in-app notification to first-level reviewer.
   - Audit log entry: `action=SUBMITTED`.

### 5.3 Detailed Data Flow — "Approval Action"

1. Reviewer opens "Pending Approvals" → `GET /api/v1/approvals?assigned_to=me&status=pending`.
2. Reviewer clicks Approve/Reject → `POST /api/v1/approvals/{id}/decide` with `{decision: "approve", comments: "..."}`.
3. Service verifies caller is the assigned approver for that `approval_instance` (403 if not).
4. Transaction (atomic):
   - Update `approval_instances.status`.
   - If final level → update `decisions.status = APPROVED`, freeze `decisions.locked = true`.
   - Insert `audit_logs` row.
   - If more levels remain → activate next `approval_instances` row, notify next reviewer.
5. Notification fan-out to creator + stakeholders.
6. Response returned to client; frontend updates UI state via re-fetch or optimistic update.

### 5.4 File Attachment Data Flow

1. Client requests pre-signed upload target: `POST /api/v1/decisions/{id}/attachments/init`.
2. API generates a storage key, returns either a local upload endpoint or an S3 pre-signed URL.
3. Client uploads file directly (to S3) or via API (local storage mode).
4. API records metadata row in `attachments` table (filename, size, mime type, uploader, storage path/URL, decision_id).
5. Virus/type scan (basic mime + extension allow-list) runs before marking `status=available`.

### 5.5 Reporting/Analytics Data Flow

1. Scheduled job (Celery beat / cron) aggregates daily stats into `analytics_snapshots` table (pre-computed, avoids expensive live joins).
2. Dashboard reads from `analytics_snapshots` for fast load; drill-down queries hit live tables with indexed filters.
3. Export requests (`POST /api/v1/reports/export?format=pdf`) trigger a background job that renders the report (WeasyPrint/ReportLab for PDF, openpyxl for Excel) and returns a downloadable file link.

---

## 6. UI/UX Design

### 6.1 Design Principles
- **Clarity over cleverness** — decision records are read by people under time pressure; information hierarchy must be obvious.
- **Progressive disclosure** — show summary first, details on demand (accordion/tabs for alternatives, discussion, history).
- **Status always visible** — every decision card/page shows a colored status badge (Draft = gray, Under Review = amber, Approved = green, Rejected = red, Archived = slate).
- **Consistent with your portfolio's visual language** — clean cards, subtle hover states, purposeful motion (you've already explored this in your portfolio work).

### 6.2 Core Screens

**1. Login / Auth**
- Email + password, JWT-based session, "Forgot password" flow, optional OAuth2 (Google/Microsoft SSO for enterprise).

**2. Dashboard (role-aware)**
- *Employee*: My Decisions (grouped by status), Pending Reviews I'm tagged in, Recent Activity feed.
- *Manager*: Team Decisions table, Pending Approvals queue, Decision Statistics widgets (approval rate, avg turnaround).
- *Admin*: System-wide Analytics, User Activity heatmap, Organization Reports shortcuts.
- Common: quick "Create Decision" CTA button, global search bar, notification bell.

**3. Create/Edit Decision (multi-step form)**
- Step 1: Basic Info (title, category, problem statement, stakeholders, target date)
- Step 2: Alternatives (repeatable card list — add/remove alternative, each with pros/cons/cost/feasibility/risk sliders or fields)
- Step 3: Attachments (drag-and-drop file upload zone)
- Step 4: Review & Submit (read-only summary, "Submit for Approval" button)
- Autosave indicator ("Saved 12s ago") to reduce anxiety about losing work.

**4. Decision Detail Page**
- Header: Title, status badge, category, owner, created/updated dates.
- Tabs: **Overview** | **Alternatives** | **Discussion** | **Approval History** | **Attachments** | **Audit Log**
- Sticky sidebar: current approval stage, assigned approver, action buttons (if current user is the approver).

**5. Approval Queue**
- Table/list of pending approvals assigned to current user, sortable by due date/SLA countdown, with inline Approve/Reject/Request Changes actions (opens a modal for comments).

**6. Knowledge Repository (Search)**
- Search bar with filters: category, date range, tags, status, department.
- Results as cards showing title, summary, outcome badge (Success/Partial/Failed) — this is the "learn from the past" screen, so surfacing outcome is critical.
- Timeline view toggle (chronological visualization of decisions by category).

**7. Reports**
- Report type selector (Decision / Approval / Team / Audit).
- Filter panel (date range, team, category).
- Preview table + Export buttons (PDF/Excel).

**8. Admin Panel**
- User management table (invite, edit role, deactivate).
- Team management.
- Approval rule configuration (map category/impact → approval chain).
- System configuration (SLA thresholds, notification settings).

### 6.3 UX Flow Notes
- Use **optimistic UI updates** for comments/likes to feel instant, but **not** for approval actions (those need confirmed server response given their legal/audit weight).
- Use a **confirmation modal** before any Submit/Approve/Reject action ("This action will be logged and cannot be undone" for approve/reject).
- Mobile-responsive at minimum for Dashboard, Approval Queue, and Decision Detail (managers will often approve from their phone).

---

## 7. Backend Architecture (FastAPI)

### 7.1 Project Structure
```
edrp-backend/
├── app/
│   ├── main.py
│   ├── core/
│   │   ├── config.py          # env settings (Pydantic Settings)
│   │   ├── security.py        # JWT create/verify, password hashing
│   │   └── dependencies.py    # get_current_user, role checkers
│   ├── models/                # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── decision.py
│   │   ├── alternative.py
│   │   ├── approval.py
│   │   ├── discussion.py
│   │   ├── attachment.py
│   │   └── audit_log.py
│   ├── schemas/                # Pydantic request/response models
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py
│   │       ├── users.py
│   │       ├── decisions.py
│   │       ├── alternatives.py
│   │       ├── approvals.py
│   │       ├── discussions.py
│   │       ├── attachments.py
│   │       ├── reports.py
│   │       └── analytics.py
│   ├── services/                # business logic
│   ├── db/
│   │   ├── session.py
│   │   └── base.py
│   └── tasks/                   # background jobs (notifications, reports)
├── alembic/                     # migrations
├── tests/
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

### 7.2 Key API Endpoints

| Method | Endpoint | Purpose | Roles |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Login, returns JWT | All |
| POST | `/api/v1/auth/refresh` | Refresh access token | All |
| GET | `/api/v1/users/me` | Current user profile | All |
| POST | `/api/v1/users` | Create user | Admin |
| PATCH | `/api/v1/users/{id}/role` | Change role | Admin |
| POST | `/api/v1/decisions` | Create decision (draft) | Employee+ |
| GET | `/api/v1/decisions` | List decisions (filtered) | All (scoped) |
| GET | `/api/v1/decisions/{id}` | Get decision detail | Scoped |
| PUT | `/api/v1/decisions/{id}` | Update draft | Owner/Admin |
| PATCH | `/api/v1/decisions/{id}/submit` | Submit for review | Owner |
| POST | `/api/v1/decisions/{id}/alternatives` | Add alternative | Owner |
| POST | `/api/v1/decisions/{id}/discussions` | Add comment | Stakeholders |
| GET | `/api/v1/approvals?assigned_to=me` | My pending approvals | Reviewer+ |
| POST | `/api/v1/approvals/{id}/decide` | Approve/Reject/Request changes | Assigned approver |
| POST | `/api/v1/decisions/{id}/attachments` | Upload file | Owner/Stakeholder |
| GET | `/api/v1/audit-logs?decision_id=` | Get audit trail | Manager/Admin |
| GET | `/api/v1/analytics/dashboard` | Dashboard stats | Role-scoped |
| POST | `/api/v1/reports/export` | Generate report file | Role-scoped |

### 7.3 Authentication & Security
- **JWT** access token (short-lived, 15–30 min) + **refresh token** (7 days, HttpOnly cookie).
- Passwords hashed with **bcrypt/argon2**.
- Role-based dependency injection: `Depends(require_role(["manager", "admin"]))` guards on routes.
- Rate limiting on `/auth/login` to prevent brute force (e.g., via `slowapi`).
- All mutating endpoints logged to `audit_logs` with actor, action, before/after diff (JSON), timestamp, IP.
- HTTPS enforced; CORS locked to known frontend origin(s).

### 7.4 Background Jobs
- Use **FastAPI BackgroundTasks** for lightweight, immediate jobs (send single email/notification).
- Use **Celery + Redis** (or `arq`) for heavier/scheduled jobs: SLA escalation checks (runs every 15 min), daily analytics aggregation, report generation, retention/auto-archive sweep.

### 7.5 Notification Service
- Channels: in-app (stored in `notifications` table, polled or via WebSocket), email (SMTP/SendGrid).
- Events: decision assigned for review, approval decision made, comment mention, SLA breach warning, escalation.

---

## 8. Database Design (PostgreSQL)

### 8.1 Core Tables (Entity Overview)

**users**
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | varchar | |
| email | varchar unique | |
| password_hash | varchar | |
| role | enum(employee, reviewer, manager, admin) | |
| team_id | UUID FK → teams | nullable |
| is_active | boolean | |
| created_at / updated_at | timestamptz | |

**teams**
| id | UUID PK |
| name | varchar |
| manager_id | UUID FK → users |

**decisions**
| id | UUID PK |
| title | varchar |
| problem_statement | text |
| category | varchar (FK to categories or enum) |
| status | enum(draft, under_review, approved, rejected, archived) |
| impact_level | enum(low, medium, high) |
| created_by | UUID FK → users |
| current_version | int |
| locked | boolean |
| implementation_status | enum(not_started, in_progress, completed) |
| outcome | enum(success, partial, failed, pending) nullable |
| outcome_notes | text nullable |
| created_at / updated_at | timestamptz |

**decision_versions** (snapshot history — supports "version history" requirement)
| id | UUID PK |
| decision_id | UUID FK |
| version_number | int |
| snapshot_json | jsonb (full decision state at that version) |
| created_by | UUID FK |
| created_at | timestamptz |

**alternatives**
| id | UUID PK |
| decision_id | UUID FK |
| title | varchar |
| description | text |
| pros | text[] or jsonb |
| cons | text[] or jsonb |
| estimated_cost | numeric |
| feasibility_score | int (1–10) |
| risk_level | enum(low, medium, high) |
| is_recommended | boolean |

**approval_rules** (configurable by Admin)
| id | UUID PK |
| category | varchar |
| impact_level | enum |
| approval_chain | jsonb (ordered list of role/user requirements) |

**approval_instances**
| id | UUID PK |
| decision_id | UUID FK |
| level_order | int |
| assigned_to | UUID FK → users |
| status | enum(pending, approved, rejected, changes_requested) |
| comments | text |
| decided_at | timestamptz nullable |
| sla_due_at | timestamptz |

**discussions**
| id | UUID PK |
| decision_id | UUID FK |
| author_id | UUID FK |
| content | text |
| type | enum(comment, meeting_note, rationale) |
| created_at | timestamptz |

**attachments**
| id | UUID PK |
| decision_id | UUID FK nullable |
| discussion_id | UUID FK nullable |
| filename | varchar |
| storage_path | varchar |
| mime_type | varchar |
| size_bytes | bigint |
| uploaded_by | UUID FK |
| created_at | timestamptz |

**audit_logs**
| id | UUID PK |
| entity_type | varchar (decision, user, approval, etc.) |
| entity_id | UUID |
| action | varchar (created, updated, submitted, approved, rejected, etc.) |
| actor_id | UUID FK |
| diff | jsonb nullable |
| ip_address | varchar |
| created_at | timestamptz |

**notifications**
| id | UUID PK |
| user_id | UUID FK |
| type | varchar |
| message | text |
| is_read | boolean |
| related_entity_id | UUID nullable |
| created_at | timestamptz |

**analytics_snapshots** (pre-aggregated, refreshed daily)
| id | UUID PK |
| snapshot_date | date |
| scope | enum(org, team) |
| scope_id | UUID nullable |
| metrics_json | jsonb (decisions_created, approvals_completed, avg_turnaround_hours, etc.) |

### 8.2 Key Relationships
- `users` 1—N `decisions` (created_by)
- `decisions` 1—N `alternatives`, `decision_versions`, `discussions`, `attachments`, `approval_instances`
- `teams` 1—N `users`
- Every mutating action across all tables → 1 row in `audit_logs` (polymorphic via `entity_type` + `entity_id`)

### 8.3 Indexing Strategy
- `decisions(status, category, created_by)` composite index for dashboard filters.
- `approval_instances(assigned_to, status)` for fast "pending approvals" queries.
- `audit_logs(entity_type, entity_id)` for fast audit trail lookup.
- Full-text search index (PostgreSQL `tsvector`) on `decisions(title, problem_statement)` for Knowledge Repository search.

### 8.4 Redis Usage
- Session/token blacklist (logout invalidation).
- Cache for dashboard analytics (short TTL, e.g., 5 min).
- Celery broker/backend for background jobs.

---

## 9. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | API p95 < 300ms for reads; support 100+ concurrent users initially |
| Security | JWT auth, RBAC, HTTPS only, input validation via Pydantic, SQLi-safe via ORM |
| Scalability | Stateless FastAPI instances behind load balancer; DB read replicas if needed later |
| Availability | 99.5% uptime target; automated backups (daily DB dump + point-in-time recovery) |
| Auditability | Immutable audit log for every state-changing action |
| Data Retention | Configurable archive policy; soft-delete only, no hard deletes on decisions |
| Compliance | Exportable audit trail for compliance reviews (PDF/Excel) |

---

## 10. Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, TanStack Query, Tailwind CSS |
| Backend | Python, FastAPI, Uvicorn |
| ORM/Migrations | SQLAlchemy, Alembic |
| Validation | Pydantic |
| Database | PostgreSQL |
| Cache/Queue | Redis, Celery (or `arq`) |
| Auth | JWT, OAuth2 (optional SSO) |
| File Storage | Local disk (dev) / AWS S3 (prod) |
| Reports | WeasyPrint or ReportLab (PDF), openpyxl (Excel) |
| DevOps | Docker, Docker Compose, GitHub Actions (CI/CD) |
| Testing | Pytest (backend), Postman/Newman (API), React Testing Library (frontend) |
| Monitoring | Prometheus + Grafana (or simpler: Sentry for error tracking) |

---

## 11. Week-Wise Implementation Plan (8 Weeks)

### Milestone 1 — Foundation (Week 1–2)
**Week 1**
- Day 1–2: Requirement finalization, ER diagram, wireframes for core screens (Dashboard, Create Decision, Decision Detail).
- Day 3–4: Repo setup — FastAPI backend skeleton, React frontend skeleton, Docker Compose (Postgres + Redis + API + Web).
- Day 5: Database schema v1 (users, teams, decisions, alternatives) + Alembic migration setup.

**Week 2**
- Day 1–2: JWT auth (login, refresh, password hashing), `get_current_user` dependency, role-check dependency.
- Day 3–4: User Management module — registration/invite, role assignment, team management, profile CRUD.
- Day 5: Frontend — login page, protected routes, role-aware dashboard shell.
- **Milestone 1 deliverables:** Project initialized, auth working end-to-end, DB schema finalized, roles implemented.

### Milestone 2 — Core Decision Workflow (Week 3–4)
**Week 3**
- Day 1–2: Decision Management CRUD (create/edit/draft), decision categories, status field.
- Day 3–4: Alternative Analysis module (add/edit alternatives, pros/cons, cost, feasibility, risk).
- Day 5: Version history — snapshot on every submit/edit-after-submit.

**Week 4**
- Day 1–2: File upload/attachment service (local storage first, S3-ready abstraction).
- Day 3–4: Discussion Module — comments, meeting notes, decision rationale threads.
- Day 5: Frontend — multi-step Create Decision form, Decision Detail page with tabs.
- **Milestone 2 deliverables:** Complete decision creation-to-submission workflow, file attachments, discussion/collaboration working.

### Milestone 3 — Approvals, Audit, Reporting (Week 5–6)
**Week 5**
- Day 1–2: Approval rule engine (category/impact → approval chain config), `approval_instances` model.
- Day 3–4: Multi-level approval API (approve/reject/request changes), SLA fields, escalation logic (scheduled job).
- Day 5: Notification service (in-app + email) wired into submit/approve/reject/escalate events.

**Week 6**
- Day 1–2: Audit logging middleware/service applied across all mutating endpoints.
- Day 3–4: Reports & Analytics — dashboard aggregation queries, `analytics_snapshots` job, report export (PDF/Excel).
- Day 5: Frontend — Approval Queue screen, Dashboards (Employee/Manager/Admin variants), Reports screen.
- **Milestone 3 deliverables:** Approval workflows completed, audit trail complete, reports and dashboards functional.

### Milestone 4 — Hardening & Launch (Week 7–8)
**Week 7**
- Day 1–2: Knowledge Repository — full-text search, tag/category filtering, timeline view.
- Day 3–4: Testing — pytest unit/integration tests for services, Postman collection for API contract tests, React component tests for critical flows.
- Day 5: Bug fixing from test pass; performance pass on slow queries (add indexes as needed).

**Week 8**
- Day 1–2: Dockerize full stack (multi-stage builds), docker-compose for prod-like environment, environment/config hardening (secrets management).
- Day 3: Deployment to cloud (e.g., a single VM/Render/Railway or your chosen provider) + basic monitoring (Sentry/Prometheus).
- Day 4: Documentation — API docs (FastAPI auto Swagger + a written README), architecture doc, user guide.
- Day 5: Final testing pass, demo/presentation prep.
- **Milestone 4 deliverables:** Production-ready platform, successful deployment, complete documentation.

---

## 12. Evaluation Checkpoints

| Checkpoint | Criteria |
|---|---|
| End of Week 2 | Auth completed, user management functional, DB schema finalized |
| End of Week 4 | Decision management + alternatives + discussion module working end-to-end |
| End of Week 6 | Approval workflow completed, reports generating correctly, dashboards operational |
| End of Week 8 | Deployment live, all tests passing, documentation submitted |

---

## 13. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Scope creep (too many "nice to have" modules) | Delays core delivery | Lock Milestone 1–3 scope; push extras (SSO, advanced analytics) to a v2 backlog |
| Approval logic complexity underestimated | Week 5–6 slippage | Start approval rule engine design in Week 3 in parallel with decision CRUD |
| File storage costs/complexity (S3) | Blocked uploads | Build local storage first with a storage-interface abstraction; swap to S3 later without touching business logic |
| Solo-developer bandwidth | Missed milestones | Keep weekly scope realistic (already reflected in the day-by-day breakdown above); cut Knowledge Repository search sophistication (basic ILIKE search) if Week 7 is tight |
| Audit log completeness gaps | Compliance failure | Build a single reusable `log_action()` service used by every mutating endpoint from Week 2 onward, not bolted on later |

---

## 14. Future Enhancements (Post-MVP / v2 Backlog)
- SSO/OAuth2 enterprise login (Google Workspace/Microsoft Entra).
- AI-assisted decision summarization and "similar past decisions" recommendations (this fits naturally given your AI/ML background — could genuinely differentiate the product).
- Slack/Teams integration for approval notifications.
- Mobile app (React Native) for on-the-go approvals.
- Advanced analytics: decision quality scoring based on outcome tracking over time.

---

*End of PRD.*
