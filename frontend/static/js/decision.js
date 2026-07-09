let allDecisions = [];
let currentPage = 1;
const rowsPerPage = 5;

document.addEventListener("DOMContentLoaded", () => {
    fetchDecisions();

    document.getElementById("searchInput").addEventListener("input", function() {
        currentPage = 1;
        renderTable();
    });
});

async function fetchDecisions() {
    try {
        const response = await fetch(`${API_URL}/decisions/`);
        if (!response.ok) throw new Error("Failed to load decisions");
        allDecisions = await response.json();
        renderTable();
    } catch (error) {
        showToast("Danger", error.message);
    }
}

function renderTable() {
    const tbody = document.getElementById("decisionsTableBody");
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    
    let filtered = allDecisions.filter(d => 
        d.title.toLowerCase().includes(searchQuery) || 
        d.description.toLowerCase().includes(searchQuery)
    );

    const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * rowsPerPage;
    const paginated = filtered.slice(start, start + rowsPerPage);

    tbody.innerHTML = "";
    
    if (paginated.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-4 text-muted">No decisions found.</td></tr>`;
    } else {
        paginated.forEach(d => {
            const dateStr = new Date(d.created_at).toLocaleDateString();
            let statusBadge = "bg-secondary";
            if(d.status === "Approved") statusBadge = "bg-success";
            if(d.status === "Rejected") statusBadge = "bg-danger";
            if(d.status === "Under Review") statusBadge = "bg-warning text-dark";

            tbody.innerHTML += `
                <tr>
                    <td class="ps-4 fw-semibold">#${d.id}</td>
                    <td>
                        <a href="/decision/${d.id}" class="text-decoration-none fw-bold text-primary">${d.title}</a>
                        <div class="small text-muted text-truncate" style="max-width:300px;">${d.description}</div>
                    </td>
                    <td><span class="badge ${statusBadge}">${d.status}</span></td>
                    <td class="text-muted small">${dateStr}</td>
                    <td class="text-end pe-4">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="openEditModal(${d.id})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDecision(${d.id})"><i class="bi bi-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    document.getElementById("paginationInfo").innerText = `Showing page ${currentPage} of ${totalPages} (${filtered.length} total)`;
    document.getElementById("btnPrev").disabled = currentPage === 1;
    document.getElementById("btnNext").disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

function nextPage() {
    currentPage++;
    renderTable();
}

function openCreateModal() {
    document.getElementById("decisionId").value = "";
    document.getElementById("decisionTitle").value = "";
    document.getElementById("decisionDescription").value = "";
    document.getElementById("modalTitle").innerText = "Create Decision";
}

function openEditModal(id) {
    const d = allDecisions.find(x => x.id === id);
    if (!d) return;

    document.getElementById("decisionId").value = d.id;
    document.getElementById("decisionTitle").value = d.title;
    document.getElementById("decisionDescription").value = d.description;
    document.getElementById("modalTitle").innerText = "Edit Decision";
    
    const modal = new bootstrap.Modal(document.getElementById("decisionModal"));
    modal.show();
}

async function saveDecision() {
    const id = document.getElementById("decisionId").value;
    const title = document.getElementById("decisionTitle").value.trim();
    const description = document.getElementById("decisionDescription").value.trim();

    if (!title || !description) {
        showToast("Warning", "Title and description are required.");
        return;
    }

    const payload = id ? { title, description } : { title, description, created_by: USER_ID };
    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/decisions/${id}` : `${API_URL}/decisions/`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Failed to save decision");

        bootstrap.Modal.getInstance(document.getElementById("decisionModal")).hide();
        showToast("Success", id ? "Decision updated" : "Decision created");
        fetchDecisions();
    } catch (error) {
        showToast("Danger", error.message);
    }
}

async function deleteDecision(id) {
    if (!confirm("Are you sure you want to delete this decision?")) return;

    try {
        const response = await fetch(`${API_URL}/decisions/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete decision");
        
        showToast("Success", "Decision deleted successfully");
        fetchDecisions();
    } catch (error) {
        showToast("Danger", error.message);
    }
}
