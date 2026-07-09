console.log("Expert Decision Replay Platform");

function showToast(message, type="success") {
    const toastEl = document.getElementById("liveToast");
    const toastBody = document.getElementById("toastMessage");
    toastBody.innerText = message;
    
    // reset classes
    toastEl.classList.remove("text-bg-success", "text-bg-danger", "text-bg-warning", "text-bg-info");
    toastEl.classList.add("text-bg-" + type);

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}