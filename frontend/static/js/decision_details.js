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
    
    // Update owner info using new fields
    const creatorName = currentDecision.creator_name || `User #${currentDecision.created_by}`;
    const creatorInitials = currentDecision.creator_initials || 'U';
    
    // Select the avatar and name elements (need to update the HTML to give them IDs if not already)
    const creatorContainer = document.getElementById("detailCreator").parentElement;
    if (creatorContainer) {
        const avatar = creatorContainer.querySelector('.avatar-sm');
        if (avatar) avatar.innerText = creatorInitials;
        document.getElementById("detailCreator").innerText = creatorName;
    }
    
    document.getElementById("detailDate").innerText = new Date(currentDecision.created_at).toLocaleDateString();
    
    const badge = document.getElementById("decisionStatusBadge");
    badge.innerText = currentDecision.status;
    badge.className = "badge " + getStatusBadgeClass(currentDecision.status);

    document.getElementById("statusSelect").value = currentDecision.status;
    
    // Update Category badge in the right column if we can find it
    // Wait, the HTML has it hardcoded as "General", let's update it in the HTML later if needed,
    // or just find it by some selector. For now, let's render the Approval Chain.
    renderApprovalChain();
}

function renderApprovalChain() {
    const container = document.getElementById("approvalChainContainer");
    if (!container) return;
    
    container.innerHTML = "";
    
    // First step: Draft Created (always completed)
    const dateStr = new Date(currentDecision.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const creatorName = currentDecision.creator_name || `User #${currentDecision.created_by}`;
    
    let html = `
        <div class="timeline-item completed">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h6 class="fw-bold mb-0 text-sm">Draft Created</h6>
                    <p class="text-muted mb-0" style="font-size: 12px;">${creatorName}</p>
                </div>
                <small class="text-muted" style="font-size: 11px;">${dateStr}</small>
            </div>
        </div>
    `;
    
    // Add reviews
    if (currentDecision.reviews && currentDecision.reviews.length > 0) {
        currentDecision.reviews.forEach((review, idx) => {
            let itemClass = "timeline-item";
            let titleClass = "fw-semibold text-secondary";
            let statusText = `Pending: ${review.reviewer_name || 'User ' + review.reviewer_id}`;
            let icon = "";
            let timeLabel = "";
            
            if (review.status === "Approved") {
                itemClass = "timeline-item completed";
                titleClass = "fw-bold";
                statusText = `${review.reviewer_name || 'User ' + review.reviewer_id} <i class="bi bi-check-circle-fill text-success ms-1"></i>`;
                timeLabel = new Date(review.reviewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } else if (review.status === "Rejected") {
                itemClass = "timeline-item completed";
                titleClass = "fw-bold text-danger";
                statusText = `${review.reviewer_name || 'User ' + review.reviewer_id} <i class="bi bi-x-circle-fill text-danger ms-1"></i>`;
                timeLabel = new Date(review.reviewed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            } else if (review.status === "Pending") {
                itemClass = "timeline-item active";
                titleClass = "fw-bold text-primary";
                timeLabel = `<span class="text-primary fw-bold" style="font-size: 11px;">Current</span>`;
            }
            
            let approvalTypeLabel = review.approval_type ? review.approval_type + " Approval" : "Review Step";
            
            html += `
                <div class="${itemClass}">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="${titleClass} mb-0 text-sm">${approvalTypeLabel}</h6>
                            <p class="text-muted mb-0" style="font-size: 12px;">${statusText}</p>
                        </div>
                        <small class="text-muted" style="font-size: 11px;">${timeLabel}</small>
                    </div>
                </div>
            `;
        });
    } else {
        html += `
            <div class="timeline-item">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-semibold text-secondary mb-0 text-sm">No Reviewers Assigned</h6>
                    </div>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
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

// ==========================================
// TAB NAVIGATION LOGIC (Workflow 3 and 3b)
// ==========================================

let activeTab = 'overview';
let activeThreadId = null;

function switchTab(tabName) {
    activeTab = tabName;
    
    // Reset tabs UI
    const tabNames = ['overview', 'rationale', 'discussions', 'meeting_notes', 'documents', 'history'];
    tabNames.forEach(t => {
        const link = document.getElementById(`tab-link-${t}`);
        const pane = document.getElementById(`tab-pane-${t}`);
        if (link) {
            link.classList.remove('active', 'fw-bold');
            link.classList.add('text-secondary', 'fw-semibold');
        }
        if (pane) {
            pane.classList.add('d-none');
        }
    });

    // Set active tab UI
    const activeLink = document.getElementById(`tab-link-${tabName}`);
    const activePane = document.getElementById(`tab-pane-${tabName}`);
    if (activeLink) {
        activeLink.classList.add('active', 'fw-bold');
        activeLink.classList.remove('text-secondary', 'fw-semibold');
    }
    if (activePane) {
        activePane.classList.remove('d-none');
    }

    // Trigger tab-specific loaders
    if (tabName === 'rationale') {
        renderRationale();
    } else if (tabName === 'discussions') {
        loadThreads();
    } else if (tabName === 'meeting_notes') {
        loadMeetingNotes();
    } else if (tabName === 'documents') {
        loadDocuments();
    } else if (tabName === 'history') {
        loadHistory();
    }
}

// Check URL query parameters for default tab
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const threadParam = urlParams.get('thread');
    
    if (tabParam) {
        switchTab(tabParam);
        if (tabParam === 'discussions' && threadParam) {
            activeThreadId = parseInt(threadParam);
            setTimeout(() => selectThread(activeThreadId), 500);
        }
    } else {
        switchTab('overview');
    }
});

// ==========================================
// RATIONALE LOGIC
// ==========================================

function renderRationale() {
    // Populate Pros/Cons
    const prosConsList = document.getElementById('rationaleProsCons');
    const riskTable = document.getElementById('rationaleRiskTable');
    
    if (prosConsList) {
        prosConsList.innerHTML = '';
        if (currentAlternatives.length === 0) {
            prosConsList.innerHTML = '<div class="col-12 text-muted text-center">No alternatives available to draw Pros & Cons.</div>';
        } else {
            currentAlternatives.forEach(alt => {
                const pros = alt.pros ? alt.pros.split('\n').map(p => `<li>${p}</li>`).join('') : '<li>No pros documented</li>';
                const cons = alt.cons ? alt.cons.split('\n').map(c => `<li>${c}</li>`).join('') : '<li>No cons documented</li>';
                
                prosConsList.innerHTML += `
                    <div class="col-md-6">
                        <div class="border rounded p-3 h-100 bg-light">
                            <h6 class="fw-bold mb-2 text-dark">${alt.title}</h6>
                            <div class="row">
                                <div class="col-6">
                                    <small class="text-success fw-bold d-block mb-1">PROS</small>
                                    <ul class="ps-3 text-muted text-xs mb-0">${pros}</ul>
                                </div>
                                <div class="col-6">
                                    <small class="text-danger fw-bold d-block mb-1">CONS</small>
                                    <ul class="ps-3 text-muted text-xs mb-0">${cons}</ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    }

    if (riskTable) {
        riskTable.innerHTML = '';
        if (currentAlternatives.length === 0) {
            riskTable.innerHTML = '<tr><td colspan="3" class="text-center text-muted">No options analyzed.</td></tr>';
        } else {
            currentAlternatives.forEach(alt => {
                let mitigation = 'Standard rollout and verification';
                if (alt.risk_level === 'High') {
                    mitigation = 'Parallel deployment with full rollback capabilities; automated integration checks.';
                } else if (alt.risk_level === 'Medium') {
                    mitigation = 'Phased migration rollout, training resources allocation.';
                }
                
                let badgeClass = alt.risk_level === 'High' ? 'danger' : (alt.risk_level === 'Medium' ? 'warning' : 'success');

                riskTable.innerHTML += `
                    <tr>
                        <td class="fw-semibold text-dark">${alt.title} - Implementation Risk</td>
                        <td><span class="badge bg-${badgeClass}-subtle text-${badgeClass} border border-${badgeClass}-subtle">${alt.risk_level || 'Low'}</span></td>
                        <td class="text-muted">${mitigation}</td>
                    </tr>
                `;
            });
        }
    }
}

// ==========================================
// DISCUSSIONS & COMMENTS LOGIC
// ==========================================

let threadsCache = [];

async function loadThreads() {
    try {
        const res = await fetch(`${API_URL}/decisions/${DECISION_ID}/threads`);
        if (!res.ok) throw new Error("Failed to load threads");
        threadsCache = await res.json();
        renderThreadsList();
    } catch (err) {
        showToast("Danger", err.message);
    }
}

function renderThreadsList() {
    const container = document.getElementById('threadsListContainer');
    const query = document.getElementById('threadSearch').value.toLowerCase();
    
    if (!container) return;
    container.innerHTML = '';
    
    const filtered = threadsCache.filter(t => t.topic.toLowerCase().includes(query));
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="text-center text-muted py-4 small">No discussion threads found.</div>';
        return;
    }
    
    filtered.forEach(t => {
        const isActive = activeThreadId === t.id;
        const badgeClass = t.status === 'Open' ? 'bg-primary-subtle text-primary border-primary-subtle' : 'bg-success-subtle text-success border-success-subtle';
        
        container.innerHTML += `
            <div class="border rounded p-3 hover-shadow transition" style="cursor: pointer; background: ${isActive ? '#f8fafc' : '#fff'}; border-color: ${isActive ? '#3b82f6 !important' : '#e2e8f0'};" onclick="selectThread(${t.id})">
                <div class="d-flex justify-content-between align-items-start mb-1">
                    <span class="fw-bold text-sm text-dark">${t.topic}</span>
                    <span class="badge ${badgeClass} border rounded-pill" style="font-size: 9px;">${t.status}</span>
                </div>
                <div class="d-flex justify-content-between text-muted mt-2" style="font-size: 10px;">
                    <span>${t.comments ? t.comments.length : 0} comments</span>
                    <span>${new Date(t.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        `;
    });

    document.getElementById('threadSearch').addEventListener('input', renderThreadsList);
}

function openNewThreadModal() {
    document.getElementById('newThreadTopicInput').value = '';
    const modal = new bootstrap.Modal(document.getElementById('newThreadModal'));
    modal.show();
}

async function submitNewThread() {
    const topic = document.getElementById('newThreadTopicInput').value.trim();
    if (!topic) {
        showToast("Warning", "Topic is required");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/decisions/${DECISION_ID}/threads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                topic: topic,
                created_by: USER_ID
            })
        });

        if (!res.ok) throw new Error("Failed to start thread");
        
        const data = await res.json();
        bootstrap.Modal.getInstance(document.getElementById('newThreadModal')).hide();
        showToast("Success", "Discussion thread started");
        
        activeThreadId = data.id;
        loadThreads().then(() => selectThread(data.id));
    } catch (err) {
        showToast("Danger", err.message);
    }
}

async function selectThread(threadId) {
    activeThreadId = threadId;
    renderThreadsList();

    const thread = threadsCache.find(t => t.id === threadId);
    if (!thread) return;

    document.getElementById('currentThreadTopic').innerText = thread.topic;
    
    const statusBadge = document.getElementById('currentThreadStatus');
    statusBadge.innerText = thread.status;
    statusBadge.style.display = 'inline-block';
    statusBadge.className = `badge ${thread.status === 'Open' ? 'bg-primary-subtle text-primary border-primary-subtle' : 'bg-success-subtle text-success border-success-subtle'} border rounded-pill text-xs mt-1`;

    const feed = document.getElementById('commentsFeedContainer');
    feed.innerHTML = '';

    if (!thread.comments || thread.comments.length === 0) {
        feed.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="bi bi-chat-dots-fill fs-2 mb-2 d-block text-secondary"></i>
                No comments posted yet. Start the discussion!
            </div>
        `;
    } else {
        // Fetch users to map comments authors name
        const uRes = await fetch(`${API_URL}/users/`);
        const users = uRes.ok ? await uRes.json() : [];
        const userMap = {};
        users.forEach(u => { userMap[u.id] = u; });

        thread.comments.forEach(c => {
            const author = userMap[c.user_id] || { full_name: "Anonymous User" };
            const initials = author.full_name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
            
            feed.innerHTML += `
                <div class="d-flex align-items-start mb-3 border-bottom pb-2">
                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 fw-bold shadow-sm" style="width: 32px; height: 32px; font-size: 11px;">
                        ${initials}
                    </div>
                    <div class="ms-3 flex-grow-1">
                        <div class="d-flex justify-content-between align-items-baseline mb-1">
                            <span class="fw-bold text-dark small">${author.full_name}</span>
                            <span class="text-muted" style="font-size: 10px;">${new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <p class="text-muted small mb-0" style="line-height: 1.4;">${c.content}</p>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('addCommentFormBox').style.display = 'block';
}

async function submitComment() {
    const content = document.getElementById('newCommentContent').value.trim();
    if (!content) {
        showToast("Warning", "Comment cannot be empty");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/decisions/threads/${activeThreadId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: content,
                user_id: USER_ID
            })
        });

        if (!res.ok) throw new Error("Failed to post comment");
        
        document.getElementById('newCommentContent').value = '';
        showToast("Success", "Comment posted");
        loadThreads().then(() => selectThread(activeThreadId));
    } catch (err) {
        showToast("Danger", err.message);
    }
}

// ==========================================
// MEETING NOTES LOGIC
// ==========================================

let meetingNotesCache = [];

async function loadMeetingNotes() {
    try {
        const res = await fetch(`${API_URL}/decisions/${DECISION_ID}/meeting_notes`);
        if (!res.ok) throw new Error("Failed to load meeting notes");
        meetingNotesCache = await res.json();
        renderMeetingNotesList();
    } catch (err) {
        showToast("Danger", err.message);
    }
}

function renderMeetingNotesList() {
    const container = document.getElementById('meetingNotesContainer');
    const partContainer = document.getElementById('meetingParticipantsContainer');
    
    if (!container) return;
    container.innerHTML = '';
    
    if (meetingNotesCache.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="bi bi-calendar-x fs-2 d-block mb-2"></i>
                No meeting notes recorded.
            </div>
        `;
        return;
    }

    meetingNotesCache.forEach(n => {
        const date = n.meeting_date ? new Date(n.meeting_date).toLocaleDateString() : 'N/A';
        const time = n.meeting_date ? new Date(n.meeting_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
        
        container.innerHTML += `
            <div class="border rounded p-3 mb-3 hover-shadow transition" style="cursor: pointer;" onclick="viewMeetingNoteDetail(${n.id})">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-bold text-dark mb-0">${n.title}</h6>
                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill text-xs">Completed</span>
                </div>
                <p class="text-muted text-sm mb-2 text-truncate" style="max-width: 600px;">${n.notes}</p>
                <div class="d-flex align-items-center justify-content-between text-muted text-xs">
                    <span><i class="bi bi-calendar me-1"></i> ${date} ${time ? '· ' + time : ''}</span>
                    <span>View Note Details <i class="bi bi-chevron-right"></i></span>
                </div>
            </div>
        `;
    });

    // Populate unique authors as participants
    if (partContainer) {
        partContainer.innerHTML = '';
        const uniqueParticipants = new Set();
        meetingNotesCache.forEach(n => uniqueParticipants.add(n.created_by));
        
        fetch(`${API_URL}/users/`).then(r => r.ok ? r.json() : []).then(users => {
            const userMap = {};
            users.forEach(u => { userMap[u.id] = u; });
            
            if (uniqueParticipants.size === 0) {
                partContainer.innerHTML = '<span class="text-muted text-xs">No active participants.</span>';
            } else {
                uniqueParticipants.forEach(id => {
                    const u = userMap[id] || { full_name: "Anonymous" };
                    partContainer.innerHTML += `
                        <div class="d-flex align-items-center gap-2">
                            <div class="avatar-sm bg-light text-primary border" style="width: 24px; height: 24px; font-size: 10px;">${u.full_name.substring(0,2).toUpperCase()}</div>
                            <span class="text-dark fw-medium text-xs">${u.full_name}</span>
                        </div>
                    `;
                });
            }
        });
    }
}

function openNewMeetingNoteModal() {
    document.getElementById('newMeetingTitle').value = '';
    document.getElementById('newMeetingNotes').value = '';
    document.getElementById('newMeetingDate').value = '';
    new bootstrap.Modal(document.getElementById('newMeetingNoteModal')).show();
}

async function submitNewMeetingNote() {
    const title = document.getElementById('newMeetingTitle').value.trim();
    const notes = document.getElementById('newMeetingNotes').value.trim();
    const date = document.getElementById('newMeetingDate').value;

    if (!title || !notes) {
        showToast("Warning", "Title and Notes are required");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/decisions/${DECISION_ID}/meeting_notes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                notes: notes,
                meeting_date: date ? new Date(date).toISOString() : null,
                created_by: USER_ID
            })
        });

        if (!res.ok) throw new Error("Failed to record meeting notes");
        
        bootstrap.Modal.getInstance(document.getElementById('newMeetingNoteModal')).hide();
        showToast("Success", "Meeting notes recorded");
        loadMeetingNotes();
    } catch (err) {
        showToast("Danger", err.message);
    }
}

function viewMeetingNoteDetail(noteId) {
    const note = meetingNotesCache.find(n => n.id === noteId);
    if (!note) return;

    document.getElementById('detailNoteTitle').innerText = note.title;
    document.getElementById('detailNoteDate').innerText = note.meeting_date ? new Date(note.meeting_date).toLocaleString() : 'N/A';
    document.getElementById('detailNoteContent').innerText = note.notes;
    
    new bootstrap.Modal(document.getElementById('meetingNoteDetailModal')).show();
}

// ==========================================
// SUPPORTING DOCUMENTS LOGIC
// ==========================================

async function loadDocuments() {
    try {
        const res = await fetch(`${API_URL}/decisions/${DECISION_ID}`);
        if (!res.ok) throw new Error("Failed to load documents");
        const dec = await res.json();
        
        const tbody = document.getElementById('documentsTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        const attachments = dec.attachments || [];

        if (attachments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-5">No files uploaded yet.</td></tr>`;
            return;
        }

        // Fetch users mapping
        const uRes = await fetch(`${API_URL}/users/`);
        const users = uRes.ok ? await uRes.json() : [];
        const userMap = {};
        users.forEach(u => { userMap[u.id] = u; });

        attachments.forEach(att => {
            const size = (att.file_size / (1024 * 1024)).toFixed(2) + ' MB';
            const date = new Date(att.uploaded_at).toLocaleDateString();
            const u = userMap[att.uploaded_by] || { full_name: "Anonymous uploader" };
            
            // Render file type icon based on extension
            let extIcon = 'bi-file-earmark';
            if (att.filename.endsWith('.pdf')) extIcon = 'bi-file-pdf text-danger';
            else if (att.filename.endsWith('.xlsx') || att.filename.endsWith('.xls')) extIcon = 'bi-file-spreadsheet text-success';
            else if (att.filename.endsWith('.docx') || att.filename.endsWith('.doc')) extIcon = 'bi-file-word text-primary';
            else if (att.filename.endsWith('.pptx') || att.filename.endsWith('.ppt')) extIcon = 'bi-file-slides text-warning';

            tbody.innerHTML += `
                <tr>
                    <td class="ps-4">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi ${extIcon} fs-5"></i>
                            <span class="fw-bold text-dark">${att.filename}</span>
                        </div>
                    </td>
                    <td>${size}</td>
                    <td>${u.full_name}</td>
                    <td>${date}</td>
                    <td class="text-end pe-4">
                        <!-- Direct download path pointing to backend uploads -->
                        <a href="${API_URL}/${att.file_path}" class="btn btn-sm btn-outline-primary me-2" download>Download</a>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        showToast("Danger", err.message);
    }
}

// Drag & drop file uploads handler
window.addEventListener('load', () => {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('bg-primary-subtle');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('bg-primary-subtle');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('bg-primary-subtle');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files);
            }
        });

        fileInput.addEventListener('change', () => {
            const files = fileInput.files;
            if (files.length > 0) {
                handleFileUpload(files);
            }
        });
    }
});

async function handleFileUpload(files) {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('user_id', USER_ID);
    formData.append('decision_id', DECISION_ID);

    try {
        const res = await fetch(`${API_URL}/upload/`, {
            method: "POST",
            body: formData
        });

        if (!res.ok) throw new Error("Failed to upload file");
        
        showToast("Success", "File uploaded and linked successfully");
        loadDocuments();
    } catch (err) {
        showToast("Danger", err.message);
    }
}

// ==========================================
// HISTORY LOGIC
// ==========================================

async function loadHistory() {
    const container = document.getElementById('versionHistoryContainer');
    if (!container) return;

    if (!currentDecision.versions || currentDecision.versions.length === 0) {
        container.innerHTML = '<div class="text-center py-4 text-muted small">No version history available.</div>';
        return;
    }

    container.innerHTML = '';
    
    // Fetch users for mapping if needed
    const uRes = await fetch(`${API_URL}/users/`);
    const users = uRes.ok ? await uRes.json() : [];
    const userMap = {};
    users.forEach(u => { userMap[u.id] = u; });

    currentDecision.versions.forEach((v, index) => {
        const isLatest = index === 0; // Assuming backend orders by version_number DESC
        const itemClass = isLatest ? "timeline-item active" : "timeline-item completed";
        
        const dateStr = new Date(v.created_at).toLocaleString();
        const changer = userMap[v.changed_by] ? userMap[v.changed_by].full_name : `User #${v.changed_by || 'System'}`;
        const reason = v.change_reason || "System Update";

        container.innerHTML += `
            <div class="${itemClass}">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-bold mb-1 text-sm text-dark">Version ${v.version_number} <span class="badge bg-light text-secondary border fw-normal ms-2">${v.status}</span></h6>
                        <p class="text-muted mb-1 text-xs"><span class="fw-semibold text-dark">Reason:</span> ${reason}</p>
                        <p class="text-muted mb-0" style="font-size: 12px;"><i class="bi bi-person me-1"></i> ${changer}</p>
                    </div>
                    <small class="text-muted" style="font-size: 11px;">${dateStr}</small>
                </div>
            </div>
        `;
    });
}
