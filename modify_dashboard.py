import re

with open("dashboard_full_ui.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Sidebar Nav Links
nav_links = """            <!-- Nav Links -->
            <nav class="flex-1 px-4 space-y-1">
                <a href="#" id="nav-dashboard" onclick="showView('dashboard-view', this)" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20 transition-colors">
                    <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
                    <span class="text-sm font-medium">Dashboard</span>
                </a>
                <a href="#" id="nav-my-decisions" onclick="showView('my-decisions-view', this)" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                    <i data-lucide="file-text" class="w-5 h-5 text-slate-400"></i>
                    <span class="text-sm font-medium">My Decisions</span>
                </a>"""

# Since the string in the file might have different spaces, let's use regex
content = re.sub(
    r'<!-- Nav Links -->\s*<nav class="flex-1 px-4 space-y-1">\s*<a href="#" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">\s*<i data-lucide="layout-dashboard" class="w-5 h-5 text-slate-400"></i>\s*<span class="text-sm font-medium">Dashboard</span>\s*</a>\s*<a href="#" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20">\s*<i data-lucide="file-text" class="w-5 h-5"></i>\s*<span class="text-sm font-medium">My Decisions</span>\s*</a>',
    nav_links,
    content
)

# 2. Wrap Dashboard View
header_start = content.find('<!-- Top Header -->')
if header_start != -1 and 'id="dashboard-view"' not in content:
    content = content[:header_start] + '<div id="dashboard-view" class="flex-1 flex flex-col min-h-0">\n            ' + content[header_start:]

# 3. Add New Views before script tag
script_tag = "    <!-- Initialize Lucide icons -->"
new_views = """
        </div> <!-- End dashboard-view -->
        
        <!-- My Decisions View -->
        <div id="my-decisions-view" class="hidden flex-1 flex flex-col min-h-0">
            <!-- Top Header -->
            <header class="px-8 py-6 border-b border-slate-200 bg-white flex justify-between items-center z-10 shrink-0">
                <div>
                    <div class="text-xs text-slate-500 font-medium mb-1">Home &nbsp;&gt;&nbsp; My Decisions</div>
                    <h1 class="text-2xl font-bold text-slate-900">My Decisions</h1>
                </div>
                
                <div class="flex items-center space-x-6">
                    <!-- Search -->
                    <div class="relative">
                        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                        <input type="text" placeholder="Search decisions..." class="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            <span class="text-[10px] text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white shadow-sm">⌘K</span>
                        </div>
                    </div>
                    <!-- Notification -->
                    <button class="relative text-slate-400 hover:text-slate-600">
                        <i data-lucide="bell" class="w-5 h-5"></i>
                        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <!-- Avatar -->
                    <button class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">JD</button>
                </div>
            </header>

            <div class="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center space-x-3">
                        <div class="relative">
                            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                            <input type="text" placeholder="Search my decisions..." class="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                        </div>
                        <button class="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <i data-lucide="filter" class="w-4 h-4 mr-2 text-slate-400"></i> Filter <i data-lucide="chevron-down" class="w-4 h-4 ml-2 text-slate-400"></i>
                        </button>
                        <button class="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <i data-lucide="calendar" class="w-4 h-4 mr-2 text-slate-400"></i> Date Range
                        </button>
                    </div>
                    <button class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm">
                        <i data-lucide="plus" class="w-4 h-4 mr-2"></i> New Decision
                    </button>
                </div>

                <!-- Tabs -->
                <div class="flex items-center space-x-2 mb-6 border-b border-slate-200 pb-px">
                    <button class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full">All (24)</button>
                    <button class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full">Draft (4)</button>
                    <button class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full">Pending (8)</button>
                    <button class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full">Review (3)</button>
                    <button class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full">Approved (7)</button>
                    <button class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-full">Rejected (2)</button>
                </div>

                <!-- Table -->
                <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th class="px-6 py-4">ID</th>
                                <th class="px-6 py-4">Decision Title</th>
                                <th class="px-6 py-4">Category</th>
                                <th class="px-6 py-4">Priority</th>
                                <th class="px-6 py-4">Status</th>
                                <th class="px-6 py-4">Date</th>
                                <th class="px-6 py-4 text-center">...</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            <tr class="hover:bg-slate-50 cursor-pointer transition-colors group" onclick="showView('decision-details-view')">
                                <td class="px-6 py-4 text-slate-400 font-medium">DEC-2847</td>
                                <td class="px-6 py-4 font-bold text-slate-900 group-hover:text-blue-600">Q4 Technology Budget Allocation</td>
                                <td class="px-6 py-4 text-slate-600">Finance</td>
                                <td class="px-6 py-4"><span class="text-amber-600 font-medium">High</span></td>
                                <td class="px-6 py-4"><span class="px-2.5 py-1 text-[10px] font-bold text-amber-600 bg-amber-50 rounded-full">Pending</span></td>
                                <td class="px-6 py-4 text-slate-500">Dec 15</td>
                                <td class="px-6 py-4 text-center text-slate-400"><i data-lucide="more-horizontal" class="w-4 h-4 mx-auto"></i></td>
                            </tr>
                            <tr class="hover:bg-slate-50 cursor-pointer transition-colors">
                                <td class="px-6 py-4 text-slate-400 font-medium">DEC-2831</td>
                                <td class="px-6 py-4 font-bold text-slate-900">Remote Work Policy Update 2025</td>
                                <td class="px-6 py-4 text-slate-600">HR Policy</td>
                                <td class="px-6 py-4"><span class="text-blue-600 font-medium">Medium</span></td>
                                <td class="px-6 py-4"><span class="px-2.5 py-1 text-[10px] font-bold text-green-600 bg-green-50 rounded-full">Approved</span></td>
                                <td class="px-6 py-4 text-slate-500">Dec 12</td>
                                <td class="px-6 py-4 text-center text-slate-400"><i data-lucide="more-horizontal" class="w-4 h-4 mx-auto"></i></td>
                            </tr>
                            <tr class="hover:bg-slate-50 cursor-pointer transition-colors">
                                <td class="px-6 py-4 text-slate-400 font-medium">DEC-2820</td>
                                <td class="px-6 py-4 font-bold text-slate-900">Cloud Infrastructure Migration</td>
                                <td class="px-6 py-4 text-slate-600">Technology</td>
                                <td class="px-6 py-4"><span class="text-red-600 font-medium">Critical</span></td>
                                <td class="px-6 py-4"><span class="px-2.5 py-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 rounded-full">Review</span></td>
                                <td class="px-6 py-4 text-slate-500">Dec 10</td>
                                <td class="px-6 py-4 text-center text-slate-400"><i data-lucide="more-horizontal" class="w-4 h-4 mx-auto"></i></td>
                            </tr>
                            <tr class="hover:bg-slate-50 cursor-pointer transition-colors">
                                <td class="px-6 py-4 text-slate-400 font-medium">DEC-2811</td>
                                <td class="px-6 py-4 font-bold text-slate-900">New Vendor Onboarding — Acme Corp</td>
                                <td class="px-6 py-4 text-slate-600">Procurement</td>
                                <td class="px-6 py-4"><span class="text-slate-500 font-medium">Low</span></td>
                                <td class="px-6 py-4"><span class="px-2.5 py-1 text-[10px] font-bold text-slate-600 bg-slate-100 rounded-full">Draft</span></td>
                                <td class="px-6 py-4 text-slate-500">Dec 8</td>
                                <td class="px-6 py-4 text-center text-slate-400"><i data-lucide="more-horizontal" class="w-4 h-4 mx-auto"></i></td>
                            </tr>
                            <tr class="hover:bg-slate-50 cursor-pointer transition-colors">
                                <td class="px-6 py-4 text-slate-400 font-medium">DEC-2798</td>
                                <td class="px-6 py-4 font-bold text-slate-900">Product Roadmap Q1 2025</td>
                                <td class="px-6 py-4 text-slate-600">Product</td>
                                <td class="px-6 py-4"><span class="text-amber-600 font-medium">High</span></td>
                                <td class="px-6 py-4"><span class="px-2.5 py-1 text-[10px] font-bold text-green-600 bg-green-50 rounded-full">Approved</span></td>
                                <td class="px-6 py-4 text-slate-500">Dec 5</td>
                                <td class="px-6 py-4 text-center text-slate-400"><i data-lucide="more-horizontal" class="w-4 h-4 mx-auto"></i></td>
                            </tr>
                            <tr class="hover:bg-slate-50 cursor-pointer transition-colors">
                                <td class="px-6 py-4 text-slate-400 font-medium">DEC-2790</td>
                                <td class="px-6 py-4 font-bold text-slate-900">Security Policy Enhancement v2</td>
                                <td class="px-6 py-4 text-slate-600">Security</td>
                                <td class="px-6 py-4"><span class="text-red-600 font-medium">Critical</span></td>
                                <td class="px-6 py-4"><span class="px-2.5 py-1 text-[10px] font-bold text-red-600 bg-red-50 rounded-full">Rejected</span></td>
                                <td class="px-6 py-4 text-slate-500">Dec 2</td>
                                <td class="px-6 py-4 text-center text-slate-400"><i data-lucide="more-horizontal" class="w-4 h-4 mx-auto"></i></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="px-6 py-4 border-t border-slate-200 bg-white flex justify-between items-center">
                        <span class="text-sm text-slate-500">Showing 6 of 24 decisions</span>
                        <div class="flex items-center space-x-1">
                            <button class="w-8 h-8 flex items-center justify-center rounded bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-200"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                            <button class="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-medium border border-blue-600">1</button>
                            <button class="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium">2</button>
                            <button class="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 font-medium">3</button>
                            <button class="w-8 h-8 flex items-center justify-center rounded bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Decision Details View -->
        <div id="decision-details-view" class="hidden flex-1 flex flex-col min-h-0">
            <!-- Top Header -->
            <header class="px-8 py-6 border-b border-slate-200 bg-white flex justify-between items-center z-10 shrink-0">
                <div>
                    <div class="text-xs text-slate-500 font-medium mb-1 hover:text-blue-600 cursor-pointer" onclick="showView('my-decisions-view', document.getElementById('nav-my-decisions'))">Home &nbsp;&gt;&nbsp; My Decisions &nbsp;&gt;&nbsp; DEC-2847</div>
                    <h1 class="text-2xl font-bold text-slate-900">Decision Details</h1>
                </div>
                
                <div class="flex items-center space-x-6">
                    <!-- Search -->
                    <div class="relative">
                        <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
                        <input type="text" placeholder="Search decisions..." class="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    </div>
                    <button class="relative text-slate-400 hover:text-slate-600">
                        <i data-lucide="bell" class="w-5 h-5"></i>
                        <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-sm">JD</button>
                </div>
            </header>

            <div class="flex-1 p-8 overflow-y-auto bg-[#F8FAFC]">
                
                <div class="flex justify-between items-start mb-6">
                    <div class="flex items-center space-x-3">
                        <span class="text-amber-500 font-bold text-sm">Pending</span>
                        <span class="text-slate-400 text-sm">DEC 2847 - Submitted Dec 15, 2024</span>
                    </div>
                    <div class="flex space-x-3">
                        <button class="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
                            <i data-lucide="edit-3" class="w-4 h-4 mr-2"></i> Edit
                        </button>
                        <button class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm">
                            <i data-lucide="send" class="w-4 h-4 mr-2"></i> Send Reminder
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-6">
                    <!-- Left Column -->
                    <div class="col-span-2 space-y-6">
                        <!-- Main Info Card -->
                        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h2 class="text-xl font-bold text-slate-900 mb-4">Q4 Technology Budget Allocation</h2>
                            <div class="flex space-x-2 mb-6">
                                <span class="px-2.5 py-1 text-[10px] font-bold text-blue-700 bg-blue-50 rounded-full border border-blue-100">Finance</span>
                                <span class="px-2.5 py-1 text-[10px] font-bold text-amber-700 bg-amber-50 rounded-full border border-amber-100">High Priority</span>
                                <span class="px-2.5 py-1 text-[10px] font-bold text-slate-700 bg-slate-50 rounded-full border border-slate-200">Q4 2024</span>
                            </div>
                            <p class="text-slate-600 text-sm leading-relaxed">
                                This decision covers the allocation of $2.4M for Q4 technology investments including cloud infrastructure upgrades, security tooling enhancements, and developer productivity tooling. The budget must be finalized before December 31, 2024 to comply with fiscal year accounting requirements.
                            </p>
                        </div>

                        <!-- Alternatives -->
                        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 class="text-base font-bold text-slate-900 mb-5">Alternatives Considered</h3>
                            
                            <div class="space-y-4">
                                <!-- Option A -->
                                <div class="p-4 border border-slate-100 rounded-lg bg-slate-50">
                                    <div class="flex justify-between items-center mb-2">
                                        <div class="font-bold text-slate-900 text-sm">Option A: Full Cloud Migration</div>
                                        <div class="text-blue-600 font-bold text-sm">85/100</div>
                                    </div>
                                    <p class="text-xs text-slate-500 mb-3">Allocate 100% to cloud infrastructure. Highest ROI long term.</p>
                                    <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div class="h-full bg-green-500 rounded-full" style="width: 85%"></div>
                                    </div>
                                </div>
                                
                                <!-- Option B -->
                                <div class="p-4 border border-slate-100 rounded-lg bg-white">
                                    <div class="flex justify-between items-center mb-2">
                                        <div class="font-bold text-slate-900 text-sm">Option B: Hybrid Approach</div>
                                        <div class="text-blue-600 font-bold text-sm">70/100</div>
                                    </div>
                                    <p class="text-xs text-slate-500 mb-3">Split 60/40 between cloud and on-premise. Lower risk.</p>
                                    <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div class="h-full bg-amber-500 rounded-full" style="width: 70%"></div>
                                    </div>
                                </div>

                                <!-- Option C -->
                                <div class="p-4 border border-slate-100 rounded-lg bg-white">
                                    <div class="flex justify-between items-center mb-2">
                                        <div class="font-bold text-slate-900 text-sm">Option C: Status Quo</div>
                                        <div class="text-blue-600 font-bold text-sm">40/100</div>
                                    </div>
                                    <p class="text-xs text-slate-500 mb-3">Maintain existing infrastructure with minor upgrades.</p>
                                    <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div class="h-full bg-red-500 rounded-full" style="width: 40%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-6">
                        <!-- Decision Info -->
                        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 class="text-base font-bold text-slate-900 mb-4">Decision Info</h3>
                            <div class="space-y-4">
                                <div class="flex justify-between">
                                    <span class="text-sm text-slate-500">Submitter</span>
                                    <span class="text-sm font-medium text-slate-900">Sarah Chen</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-slate-500">Department</span>
                                    <span class="text-sm font-medium text-slate-900">Finance</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-slate-500">Category</span>
                                    <span class="text-sm font-medium text-slate-900">Budget</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-slate-500">Priority</span>
                                    <span class="text-sm font-medium text-slate-900">High</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-slate-500">Deadline</span>
                                    <span class="text-sm font-medium text-slate-900">Dec 31, 2024</span>
                                </div>
                            </div>
                        </div>

                        <!-- Approval Chain -->
                        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 class="text-base font-bold text-slate-900 mb-5">Approval Chain</h3>
                            <div class="relative pl-3 space-y-6 before:absolute before:inset-0 before:ml-[0.625rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                                
                                <div class="relative flex items-center justify-between">
                                    <div class="absolute -left-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm">
                                        <i data-lucide="check" class="w-3 h-3 text-white"></i>
                                    </div>
                                    <div class="ml-10">
                                        <div class="font-bold text-sm text-slate-900 flex items-center">Sarah Chen</div>
                                        <div class="text-xs text-slate-500">Submitted - Dec 15</div>
                                    </div>
                                </div>

                                <div class="relative flex items-center justify-between">
                                    <div class="absolute -left-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm">
                                        <i data-lucide="clock" class="w-3 h-3 text-white"></i>
                                    </div>
                                    <div class="ml-10">
                                        <div class="font-bold text-sm text-slate-900 flex items-center">
                                            Dr. Mark Lee
                                        </div>
                                        <div class="text-xs text-slate-500">Review - Pending</div>
                                    </div>
                                </div>

                                <div class="relative flex items-center justify-between">
                                    <div class="absolute -left-1 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm"></div>
                                    <div class="ml-10">
                                        <div class="font-bold text-sm text-slate-400">VP Operations</div>
                                        <div class="text-xs text-slate-400">Approval - --</div>
                                    </div>
                                </div>

                                <div class="relative flex items-center justify-between">
                                    <div class="absolute -left-1 w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center border-2 border-white z-10 shadow-sm"></div>
                                    <div class="ml-10">
                                        <div class="font-bold text-sm text-slate-400">CTO Office</div>
                                        <div class="text-xs text-slate-400">Final - --</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
"""

script_js = """
    <script>
        function showView(viewId, navElement = null) {
            // Hide all views
            document.getElementById('dashboard-view').classList.add('hidden');
            document.getElementById('my-decisions-view').classList.add('hidden');
            document.getElementById('decision-details-view').classList.add('hidden');
            
            // Show target view
            document.getElementById(viewId).classList.remove('hidden');
            
            // Update nav active state if element provided
            if (navElement) {
                // Reset both to inactive style
                let dash = document.getElementById('nav-dashboard');
                let mydec = document.getElementById('nav-my-decisions');
                
                // Set to inactive
                dash.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors";
                dash.querySelector('i').className = "w-5 h-5 text-slate-400";
                
                mydec.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors";
                mydec.querySelector('i').className = "w-5 h-5 text-slate-400";
                
                // Set active style
                navElement.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20 transition-colors";
                navElement.querySelector('i').className = "w-5 h-5";
            } else {
                // Determine active element based on viewId if no element passed
                let activeNavId = null;
                if (viewId === 'dashboard-view') activeNavId = 'nav-dashboard';
                else if (viewId === 'my-decisions-view' || viewId === 'decision-details-view') activeNavId = 'nav-my-decisions';
                
                if (activeNavId) {
                    showView(viewId, document.getElementById(activeNavId));
                }
            }
            
            // Re-init lucide icons for newly visible elements
            lucide.createIcons();
        }
    </script>
"""

if "id=\"my-decisions-view\"" not in content:
    content = content.replace(script_tag, new_views + script_js + "\n" + script_tag)

with open("dashboard_full_ui.html", "w", encoding="utf-8") as f:
    f.write(content)
