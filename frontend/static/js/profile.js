// =========================================
// Expert Decision Replay Platform
// Profile Module
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Profile Module Loaded");

    const profileForm = document.querySelector("form");

    if (!profileForm) {
        return;
    }

    const fullName = document.querySelector("input[name='full_name']");
    const phone = document.querySelector("input[name='phone']");
    const designation = document.querySelector("input[name='designation']");
    const submitButton = document.querySelector("button[type='submit']");

    // =========================================
    // Full Name Validation
    // =========================================

    fullName.addEventListener("input", function () {

        if (this.value.length < 3) {

            this.classList.add("is-invalid");

        } else {

            this.classList.remove("is-invalid");

            this.classList.add("is-valid");

        }

    });

    // =========================================
    // Phone Validation
    // =========================================

    phone.addEventListener("input", function () {

        const phoneRegex = /^[0-9]{10}$/;

        if (this.value === "") {

            this.classList.remove("is-valid");
            this.classList.remove("is-invalid");
            return;

        }

        if (phoneRegex.test(this.value)) {

            this.classList.remove("is-invalid");
            this.classList.add("is-valid");

        } else {

            this.classList.remove("is-valid");
            this.classList.add("is-invalid");

        }

    });

    // =========================================
    // Designation Validation
    // =========================================

    designation.addEventListener("input", function () {

        if (this.value.length >= 2) {

            this.classList.add("is-valid");
            this.classList.remove("is-invalid");

        } else {

            this.classList.remove("is-valid");
            this.classList.add("is-invalid");

        }

    });

    // =========================================
    // Form Submit
    // =========================================

    profileForm.addEventListener("submit", function (e) {

        const confirmUpdate = confirm(
            "Are you sure you want to update your profile?"
        );

        if (!confirmUpdate) {

            e.preventDefault();
            return;

        }

        submitButton.disabled = true;

        submitButton.innerHTML =
            "Updating...";

    });

    // =========================================
    // Auto Hide Alerts
    // =========================================

    const alerts = document.querySelectorAll(".alert");

    alerts.forEach(function (alert) {

        setTimeout(function () {

            alert.style.transition = "0.5s";

            alert.style.opacity = "0";

            setTimeout(function () {

                alert.remove();

            }, 500);

        }, 3000);

    });

});