// =========================================================
// users.js – User Management Page
// =========================================================

let allUsers = [];
let currentPage = 1;
const rowsPerPage = 8;

// Role name lookup (by role_id) populated after fetch
const roleMap = {};

document.addEventListener("DOMContentLoaded", () => {
    fetchRoles().then(() => fetchUsers());
});

async function fetchRoles() {
    try {
        const res = await fetch(`${API_URL}/roles`);
        if (!res.ok) return;
        const roles = await res.json();
        roles.forEach(r => { roleMap[r.id] = r.role_name; });
    } catch (_) {}
}

async function fetchUsers() {
    try {
        const res = await fetch(`${API_URL}/users/`);
        if (!res.ok) throw new Error("Failed to load users");
        allUsers = await res.json();
        updateStats();
        renderTable();
    } catch (err) {
        document.getElementById("usersTableBody").innerHTML =
            `<tr><td colspan="7" class="text-center py-5 text-danger">
                <i data-lucide="alert-circle" style="width:18px;height:18px;" class="me-2"></i>${err.message}
             </td></tr>`;
        if (window.lucide) lucide.createIcons();
    }
}

function updateStats() {
    const total    = allUsers.length;
    const active   = allUsers.filter(u => u.is_active).length;
    const inactive = total - active;
    const admins   = allUsers.filter(u => {
        const roleName = (roleMap[u.role_id] || "").toLowerCase();
        return roleName === "administrator" || roleName === "admin";
    }).length;

    document.getElementById("statTotal").innerText    = total;
    document.getElementById("statActive").innerText   = active;
    document.getElementById("statInactive").innerText = inactive;
    document.getElementById("statAdmins").innerText   = admins;
}

function handleSearch() {
    currentPage = 1;
    renderTable();
}

function renderTable() {
    const query      = (document.getElementById("userSearch")?.value || "").toLowerCase();
    const roleFilter = (document.getElementById("roleFilter")?.value || "").toLowerCase();

    const filtered = allUsers.filter(u => {
        const roleName = (roleMap[u.role_id] || "").toLowerCase();
        const matchSearch = !query ||
            u.full_name.toLowerCase().includes(query) ||
            (u.email || "").toLowerCase().includes(query) ||
            (u.employee_id || "").toLowerCase().includes(query) ||
            (u.designation || "").toLowerCase().includes(query);
        const matchRole = !roleFilter || roleName.includes(roleFilter);
        return matchSearch && matchRole;
    });

    const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start    = (currentPage - 1) * rowsPerPage;
    const pageData = filtered.slice(start, start + rowsPerPage);

    const tbody = document.getElementById("usersTableBody");
    if (pageData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center py-5 text-muted">
            <i data-lucide="search-x" style="width:20px;height:20px;" class="me-2"></i>No users found.
        </td></tr>`;
        if (window.lucide) lucide.createIcons();
    } else {
        tbody.innerHTML = pageData.map(u => {
            const roleName   = roleMap[u.role_id] || "Unknown";
            const initials   = u.full_name.split(" ").map(p => p[0]).join("").substring(0, 2).toUpperCase();
            const roleClass  = "role-" + roleName.toLowerCase().replace(/\s/g, "");
            const statusBadge = u.is_active
                ? `<span class="badge" style="background:#ECFDF5;color:#059669;font-size:11px;font-weight:700;">Active</span>`
                : `<span class="badge" style="background:#FEF2F2;color:#DC2626;font-size:11px;font-weight:700;">Inactive</span>`;
            return `
            <tr>
                <td class="px-4 py-3">
                    <div class="d-flex align-items-center gap-3">
                        <div class="user-avatar-sm">${initials}</div>
                        <div>
                            <div class="fw-semibold text-dark">${u.full_name}</div>
                            <div class="text-muted" style="font-size:12px;">${u.email || ''}</div>
                        </div>
                    </div>
                </td>
                <td class="px-4">
                    <code style="background:#F1F5F9;color:#0F172A;padding:2px 8px;border-radius:4px;font-size:12px;">${u.employee_id || '—'}</code>
                </td>
                <td class="px-4">
                    <span class="role-badge ${roleClass}">${roleName}</span>
                </td>
                <td class="px-4 text-muted" style="font-size:13px;">${u.designation || '—'}</td>
                <td class="px-4 text-muted" style="font-size:13px;">${u.phone || '—'}</td>
                <td class="px-4">${statusBadge}</td>
                <td class="px-4 text-end">
                    <a href="#" class="btn btn-sm btn-outline-primary px-3" style="font-size:12px;" title="View user details">
                        <i data-lucide="eye" style="width:13px;height:13px;" class="me-1"></i>View
                    </a>
                </td>
            </tr>`;
        }).join("");
        if (window.lucide) lucide.createIcons();
    }

    document.getElementById("paginationInfo").innerText =
        `Showing ${start + 1}–${Math.min(start + rowsPerPage, filtered.length)} of ${filtered.length} users`;
    document.getElementById("pageIndicator").innerText = `${currentPage} / ${totalPages}`;
    document.getElementById("btnPrev").disabled = currentPage === 1;
    document.getElementById("btnNext").disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) { currentPage--; renderTable(); }
}
function nextPage() {
    currentPage++;
    renderTable();
}
