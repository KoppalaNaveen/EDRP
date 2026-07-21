// =========================================================
// repository.js – Knowledge Repository Page
// =========================================================

let allDecisions = [];
let currentCat   = "";
let currentPage  = 1;
const rowsPerPage = 9;

document.addEventListener("DOMContentLoaded", () => {
    fetchApprovedDecisions();
});

async function fetchApprovedDecisions() {
    try {
        const res = await fetch(`${API_URL}/decisions/`);
        if (!res.ok) throw new Error("Failed to load decisions");
        const all  = await res.json();
        allDecisions = all.filter(d => d.status === "Approved");
        buildCategoryFilters();
        updateStats();
        renderCards();
    } catch (err) {
        document.getElementById("repoGrid").innerHTML = `
            <div class="col-12 text-center py-5 text-danger">
                <i data-lucide="alert-circle" style="width:24px;height:24px;" class="me-2"></i>${err.message}
            </div>`;
        if (window.lucide) lucide.createIcons();
    }
}

function buildCategoryFilters() {
    const cats = [...new Set(allDecisions.map(d => d.category_name).filter(Boolean))].sort();
    const container = document.getElementById("categoryBtns");
    container.innerHTML = cats.map(c => `
        <button class="btn btn-sm px-3 fw-semibold"
            style="background:rgba(255,255,255,0.1);color:#CBD5E1;font-size:11px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);"
            onclick="setCat('${c}', this)">${c}</button>`).join("");
}

function setCat(cat, btn) {
    currentCat  = cat;
    currentPage = 1;
    // Reset styles
    document.getElementById("catAll").style.background = cat === "" ? "#2563EB" : "rgba(255,255,255,0.1)";
    document.getElementById("catAll").style.color      = cat === "" ? "white"   : "#CBD5E1";
    document.querySelectorAll("#categoryBtns button").forEach(b => {
        const isActive = b.textContent.trim() === cat;
        b.style.background = isActive ? "#2563EB" : "rgba(255,255,255,0.1)";
        b.style.color      = isActive ? "white"   : "#CBD5E1";
    });
    renderCards();
}

function filterRepo() {
    currentPage = 1;
    renderCards();
}

function updateStats() {
    document.getElementById("repoCount").innerText         = allDecisions.length;
    document.getElementById("repoCategoryCount").innerText =
        new Set(allDecisions.map(d => d.category_name).filter(Boolean)).size;
}

function getFiltered() {
    const query = (document.getElementById("repoSearch")?.value || "").toLowerCase();
    return allDecisions.filter(d => {
        const matchCat = !currentCat || d.category_name === currentCat;
        const matchSearch = !query ||
            d.title.toLowerCase().includes(query) ||
            (d.description || "").toLowerCase().includes(query) ||
            (d.category_name || "").toLowerCase().includes(query) ||
            (d.creator_name || "").toLowerCase().includes(query);
        return matchCat && matchSearch;
    });
}

function renderCards() {
    const filtered   = getFiltered();
    const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const start    = (currentPage - 1) * rowsPerPage;
    const pageData = filtered.slice(start, start + rowsPerPage);

    const grid = document.getElementById("repoGrid");

    if (pageData.length === 0) {
        grid.innerHTML = `
            <div class="col-12" style="display:flex;flex-direction:column;align-items:center;padding:80px 0;color:#94A3B8;text-align:center;">
                <i data-lucide="book-open" style="width:48px;height:48px;color:#CBD5E1;" class="mb-3"></i>
                <h5 class="fw-semibold text-dark mb-1">No Approved Decisions Found</h5>
                <p class="text-muted">Try adjusting your search or category filter.</p>
            </div>`;
        if (window.lucide) lucide.createIcons();
    } else {
        grid.innerHTML = pageData.map(d => {
            const date     = new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            const initials = d.creator_initials || (d.creator_name || "U").substring(0, 2).toUpperCase();
            const desc     = (d.description || "No description provided.").substring(0, 120);
            const cat      = d.category_name || "Uncategorized";
            return `
            <div class="col-md-6 col-lg-4">
                <div class="repo-card">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span style="background:#ECFDF5;color:#059669;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;">✓ Approved</span>
                        <span style="background:#EEF2FF;color:#4F46E5;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;">${cat}</span>
                    </div>
                    <div class="repo-card-title">${d.title}</div>
                    <div class="repo-card-desc">${desc}${d.description && d.description.length > 120 ? "…" : ""}</div>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                        <div class="d-flex align-items-center gap-2">
                            <div style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#667EEA,#764BA2);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;">${initials}</div>
                            <span class="text-muted" style="font-size:11px;">${d.creator_name || "Unknown"}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="text-muted" style="font-size:11px;">${date}</span>
                            <a href="/decision/${d.id}" class="btn btn-sm px-3" style="background:#EEF2FF;color:#4F46E5;font-size:11px;font-weight:600;border:none;">View →</a>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join("");
        if (window.lucide) lucide.createIcons();
    }

    const info = filtered.length === 0 ? "" :
        `Showing ${start + 1}–${Math.min(start + rowsPerPage, filtered.length)} of ${filtered.length} results`;
    document.getElementById("repoPaginationInfo").innerText = info;
    document.getElementById("repoBtnPrev").disabled = currentPage === 1;
    document.getElementById("repoBtnNext").disabled = currentPage === totalPages;
}

function prevPage() { if (currentPage > 1) { currentPage--; renderCards(); } }
function nextPage() { currentPage++; renderCards(); }
