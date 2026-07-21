from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
)
import requests

app = Flask(__name__)

# Secret Key
app.secret_key = "expert_decision_platform"

# FastAPI Backend URL
API_URL = "http://127.0.0.1:8000"


# ===========================
# HOME
# ===========================

@app.route("/")
def home():
    return render_template("landing.html")


# ===========================
# LOGIN
# ===========================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        payload = {
            "employee_id": request.form["employee_id"],
            "password": request.form["password"]
        }

        response = requests.post(
            f"{API_URL}/users/login",
            json=payload
        )

        if response.status_code == 200:

            token = response.json()

            # Save login session
            session["logged_in"] = True
            session["token"] = token["access_token"]
            session["user_id"] = token["user_id"]
            session["role_name"] = token.get("role_name", "User")
            full_name = token.get("full_name", "User")
            session["full_name"] = full_name
            
            parts = full_name.split()
            session["initials"] = (parts[0][0] + (parts[-1][0] if len(parts) > 1 else "")).upper()

            flash("Login Successful", "success")

            return redirect(url_for("dashboard"))

        flash("Invalid Employee ID or Password", "danger")

    return render_template("login.html")


# ===========================
# REGISTER
# ===========================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        payload = {
            "full_name": request.form["full_name"],
            "email": request.form["email"],
            "password": request.form["password"],
            "role_id": int(request.form["role_id"]),
            "team_id": int(request.form.get("team_id", 1)),
            "employee_id": request.form.get("employee_id", ""),
            "designation": request.form.get("designation", ""),
            "phone": request.form.get("phone", ""),
            "verification_code": request.form.get("verification_code", "")
        }

        response = requests.post(
            f"{API_URL}/users/register",
            json=payload
        )

        print("Status Code:", response.status_code)
        print("Response:", response.text)

        if response.status_code in [200, 201]:

            flash("Registration Successful", "success")
            return redirect(url_for("login"))

        try:
            error_msg = response.json().get("detail", "Registration Failed")
        except:
            error_msg = response.text
        flash(f"Registration Failed: {error_msg}", "danger")

    return render_template("register.html")

# ===========================
# API PROXIES (Email Verification & Password Reset)
# ===========================
from flask import jsonify

@app.route("/api/send-code", methods=["POST"])
def send_code():
    data = request.json
    try:
        response = requests.post(
            f"{API_URL}/users/send-verification-code",
            json=data
        )
        if response.status_code == 200:
            return jsonify(response.json()), 200
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"detail": "Backend connection error. Ensure the FastAPI backend is running."}), 500
    except ValueError:
        return jsonify({"detail": "Received an invalid response from the backend server."}), 500

@app.route("/api/verify-code", methods=["POST"])
def verify_code():
    data = request.json
    try:
        response = requests.post(
            f"{API_URL}/users/check-verification-code",
            json=data
        )
        if response.status_code == 200:
            return jsonify(response.json()), 200
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"detail": "Backend connection error. Ensure the FastAPI backend is running."}), 500
    except ValueError:
        return jsonify({"detail": "Received an invalid response from the backend server."}), 500

@app.route("/api/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    try:
        response = requests.post(
            f"{API_URL}/users/reset-password",
            json=data
        )
        if response.status_code == 200:
            return jsonify(response.json()), 200
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"detail": "Backend connection error. Ensure the FastAPI backend is running."}), 500
    except ValueError:
        return jsonify({"detail": "Received an invalid response from the backend server."}), 500

# ===========================
# DASHBOARD
# ===========================

@app.route("/dashboard")
def dashboard():

    if "token" not in session:
        return redirect(url_for("login"))

    headers = {
        "Authorization": f"Bearer {session['token']}"
    }

    user_id = session.get("user_id", 2)

    response = requests.get(
        f"{API_URL}/dashboard/{user_id}",
        headers=headers
    )

    dashboard = {}

    if response.status_code == 200:
        dashboard = response.json()

    role = session.get("role_name", "User")
    if role == "Manager":
        template = "manager_dashboard.html"
    elif role == "Administrator" or role == "Admin":
        template = "dashboard.html"
    else:
        template = "employee_dashboard.html"

    total_decisions = dashboard.get("total_decisions", 0)
    approved_decisions = dashboard.get("approved_decisions", 0)
    pending_reviews = dashboard.get("pending_reviews", 0)
    rejected_decisions = dashboard.get("rejected_decisions", 0)
    draft_decisions = dashboard.get("draft_decisions", 0)

    # Pre-compute bar widths to avoid Jinja arithmetic inside style attributes
    approved_pct = int(approved_decisions / total_decisions * 100) if total_decisions > 0 else 0
    pending_pct  = int(pending_reviews    / total_decisions * 100) if total_decisions > 0 else 0
    rejected_pct = int(rejected_decisions / total_decisions * 100) if total_decisions > 0 else 0
    draft_pct    = int(draft_decisions    / total_decisions * 100) if total_decisions > 0 else 0

    return render_template(
        template,
        dashboard=dashboard,
        # Unpack for convenient direct access in templates
        total_users=dashboard.get("total_users", 0),
        active_users=dashboard.get("active_users", 0),
        total_decisions=total_decisions,
        pending_reviews=pending_reviews,
        total_replays=dashboard.get("total_replays", 0),
        approved_decisions=approved_decisions,
        rejected_decisions=rejected_decisions,
        draft_decisions=draft_decisions,
        total_audit_logs=dashboard.get("total_audit_logs", 0),
        system_health=dashboard.get("system_health", "99%"),
        recent_decisions=dashboard.get("recent_decisions", []),
        recent_reviews=dashboard.get("recent_reviews", []),
        recent_replays=dashboard.get("recent_replays", []),
        recent_users=dashboard.get("recent_users", []),
        recent_audit_logs=dashboard.get("recent_audit_logs", []),
        approval_flow=dashboard.get("approval_flow", []),
        # Pre-computed percentage widths for progress bars
        approved_pct=approved_pct,
        pending_pct=pending_pct,
        rejected_pct=rejected_pct,
        draft_pct=draft_pct,
    )

# ===========================
# USERS
# ===========================

@app.route("/users")
def users():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("users.html")


# ===========================
# ROLES
# ===========================

@app.route("/roles")
def roles():

    if not session.get("logged_in"):
        return redirect(url_for("login"))

    return render_template("roles.html")


# ===========================
# TEAMS
# ===========================

@app.route("/teams")
def teams():

    if not session.get("logged_in"):
        return redirect(url_for("login"))

    return render_template("teams.html")


# ===========================
# CREATE DECISION WIZARD
# ===========================

@app.route("/create_decision")
def create_decision():
    if "token" not in session:
        return redirect(url_for("login"))
    return render_template("create_decision.html")

# ===========================
# DECISIONS
# ===========================

@app.route("/decisions")
def decisions():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("decisions.html")


# ===========================
# DECISION DETAILS
# ===========================

@app.route("/decision/<int:id>")
def decision_details(id):

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("decision_details.html", decision_id=id)


# ===========================
# ALTERNATIVES
# ===========================

@app.route("/alternatives")
def alternatives():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("alternatives.html")


# ===========================
# DISCUSSION
# ===========================

@app.route("/discussion")
def discussion():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("discussion.html")


# ===========================
# REVIEWS
# ===========================

@app.route("/reviews")
def reviews():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("reviews.html")


# ===========================
# REPLAYS
# ===========================

@app.route("/replays")
def replays():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("replays.html")


# ===========================
# KNOWLEDGE REPOSITORY
# ===========================

@app.route("/repository")
def repository():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("repository.html")


# ===========================
# AUDIT
# ===========================

@app.route("/audit")
def audit():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("audit.html")


# ===========================
# REPORTS
# ===========================

@app.route("/reports")
def reports():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("reports.html")


# ===========================
# PROFILE
# ===========================

@app.route("/profile")
def profile():

    if not session.get("logged_in"):
        return redirect(url_for("login"))

    response = requests.get(
        f"{API_URL}/profile/{session['user_id']}"
    )

    if response.status_code != 200:

        flash("Unable to load profile.", "danger")

        return redirect(url_for("dashboard"))

    profile = response.json()

    return render_template(
        "profile.html",
        profile=profile
    )


@app.route("/profile/update", methods=["POST"])
def update_profile():

    if not session.get("logged_in"):
        return redirect(url_for("login"))

    payload = {

        "full_name": request.form["full_name"],

        "phone": request.form["phone"],

        "designation": request.form["designation"]

    }

    response = requests.put(

        f"{API_URL}/profile/{session['user_id']}",

        json=payload

    )

    if response.status_code == 200:

        flash("Profile Updated Successfully", "success")

    else:

        flash("Unable to update profile", "danger")

    return redirect(url_for("profile"))

# ===========================
# UPLOAD
# ===========================

@app.route("/upload")
def upload():

    if "token" not in session:
        return redirect(url_for("login"))

    return render_template("upload.html")


# ===========================
# LOGOUT
# ===========================

@app.route("/logout")
def logout():

    session.clear()

    flash("Logged Out Successfully", "info")

    return redirect(url_for("login"))


# ===========================
# START APPLICATION
# ===========================

if __name__ == "__main__":
    app.run(debug=True)