let currentDecision = null;
let currentAlternatives = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchDecisionDetails();
    fetchAlternatives();
});

async function fetchDecisionDetails() {
    try {
        const response = await fetch(`${API_URL}/decisions/${DECISION_ID}`);
        if (!response.ok) throw new Error("Failed to load decision");
        
        currentDecision = await response.json();
        renderDecisionDetails();
    } catch (error) {
        showToast("Danger", error.message);
    }
}

function renderDecisionDetails() {
    document.getElementById("detailTitle").innerText = currentDecision.title;
    document.getElementById("detailDescription").innerText = currentDecision.description;
    document.getElementById("detailCreator").innerText = `User #${currentDecision.created_by}`;
    document.getElementById("detailDate").innerText = new Date(currentDecision.created_at).toLocaleDateString();
    
    const badge = document.getElementById("decisionStatusBadge");
    badge.innerText = currentDecision.status;
    badge.className = "badge " + getStatusBadgeClass(currentDecision.status);

    document.getElementById("statusSelect").value = currentDecision.status;
}

function getStatusBadgeClass(status) {
    if (status === "Approved") return "bg-success";
    if (status === "Rejected") return "bg-danger";
    if (status === "Under Review") return "bg-warning text-dark";
    if (status === "Archived") return "bg-dark";
    return "bg-secondary";
}

async function updateStatus() {
    const newStatus = document.getElementById("statusSelect").value;
    try {
        const response = await fetch(`${API_URL}/decisions/${DECISION_ID}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        });
        if (!response.ok) throw new Error("Failed to update status");
        
        showToast("Success", "Status updated successfully");
        fetchDecisionDetails();
    } catch (error) {
        showToast("Danger", error.message);
    }
}

// ================= ALTERNATIVES =================

async function fetchAlternatives() {
    try {
        const response = await fetch(`${API_URL}/alternatives/decision/${DECISION_ID}`);
        if (!response.ok) throw new Error("Failed to load alternatives");
        
        currentAlternatives = await response.json();
        renderAlternativesTable();
    } catch (error) {
        showToast("Danger", error.message);
    }
}

function renderAlternativesTable() {
    const tbody = document.getElementById("alternativesTableBody");
    tbody.innerHTML = "";

    if (currentAlternatives.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No alternatives added yet.</td></tr>`;
        return;
    }

    currentAlternatives.forEach(alt => {
        let riskBadge = "bg-secondary";
        if (alt.risk_level === "Low") riskBadge = "bg-success";
        if (alt.risk_level === "Medium") riskBadge = "bg-warning text-dark";
        if (alt.risk_level === "High") riskBadge = "bg-danger";

        tbody.innerHTML += `
            <tr>
                <td class="ps-4">
                    <div class="fw-bold text-primary">${alt.title}</div>
                    <div class="small text-muted text-truncate" style="max-width:200px;">${alt.description || 'N/A'}</div>
                </td>
                <td>$${alt.cost || '0.00'}</td>
                <td><span class="badge ${riskBadge}">${alt.risk_level || 'N/A'}</span></td>
                <td><span class="badge bg-info text-dark">${alt.feasibility_score || '-'} / 10</span></td>
                <td class="text-end pe-4">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="openAlternativeModal(${alt.id})"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteAlternative(${alt.id})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function openAlternativeModal(id = null) {
    if (id) {
        const alt = currentAlternatives.find(x => x.id === id);
        if (!alt) return;
        document.getElementById("altModalTitle").innerText = "Edit Alternative";
        document.getElementById("altId").value = alt.id;
        document.getElementById("altTitle").value = alt.title;
        document.getElementById("altDescription").value = alt.description || "";
        document.getElementById("altPros").value = alt.pros || "";
        document.getElementById("altCons").value = alt.cons || "";
        document.getElementById("altCost").value = alt.cost || "";
        document.getElementById("altRisk").value = alt.risk_level || "Medium";
        document.getElementById("altFeasibility").value = alt.feasibility_score || "";
    } else {
        document.getElementById("altModalTitle").innerText = "Add Alternative";
        document.getElementById("altId").value = "";
        document.getElementById("altTitle").value = "";
        document.getElementById("altDescription").value = "";
        document.getElementById("altPros").value = "";
        document.getElementById("altCons").value = "";
        document.getElementById("altCost").value = "";
        document.getElementById("altRisk").value = "Medium";
        document.getElementById("altFeasibility").value = "";
    }
    
    new bootstrap.Modal(document.getElementById("alternativeModal")).show();
}

async function saveAlternative() {
    const id = document.getElementById("altId").value;
    const payload = {
        title: document.getElementById("altTitle").value.trim(),
        description: document.getElementById("altDescription").value.trim(),
        pros: document.getElementById("altPros").value.trim(),
        cons: document.getElementById("altCons").value.trim(),
        cost: parseFloat(document.getElementById("altCost").value) || null,
        risk_level: document.getElementById("altRisk").value,
        feasibility_score: parseInt(document.getElementById("altFeasibility").value) || null,
    };

    if (!payload.title) {
        showToast("Warning", "Title is required");
        return;
    }

    try {
        let response;
        if (id) {
            response = await fetch(`${API_URL}/alternatives/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } else {
            payload.decision_id = DECISION_ID;
            response = await fetch(`${API_URL}/alternatives/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        }

        if (!response.ok) throw new Error("Failed to save alternative");

        bootstrap.Modal.getInstance(document.getElementById("alternativeModal")).hide();
        showToast("Success", id ? "Alternative updated" : "Alternative added");
        fetchAlternatives();
    } catch (error) {
        showToast("Danger", error.message);
    }
}

async function deleteAlternative(id) {
    if (!confirm("Delete this alternative?")) return;

    try {
        const response = await fetch(`${API_URL}/alternatives/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete alternative");
        
        showToast("Success", "Alternative deleted");
        fetchAlternatives();
    } catch (error) {
        showToast("Danger", error.message);
    }
}
