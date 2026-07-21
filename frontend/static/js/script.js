console.log("Expert Decision Replay Platform");

function showToast(titleOrMessage, message=null) {
    let type = "success";
    let body = titleOrMessage;
    if (message !== null) {
        // Support both signatures: (message, type) and (type, message)
        const t = titleOrMessage.toLowerCase();
        if (t === "danger" || t === "error") {
            type = "danger";
        } else if (t === "warning") {
            type = "warning";
        } else if (t === "info") {
            type = "info";
        } else {
            type = "success";
        }
        body = message;
    }
    const toastEl = document.getElementById("liveToast");
    if (!toastEl) return;
    const toastBody = document.getElementById("toastMessage");
    toastBody.innerText = body;
    
    // reset classes
    toastEl.classList.remove("text-bg-success", "text-bg-danger", "text-bg-warning", "text-bg-info");
    toastEl.classList.add("text-bg-" + type);

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}