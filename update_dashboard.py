import re

with open('dashboard_full_ui.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update navigation links to have IDs and onclick handlers
nav_pattern = r'(<a href="#" class="flex items-center space-x-3 px-4 py-2\.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">.*?<i data-lucide="layout-dashboard" class="w-5 h-5 text-slate-400"></i>.*?<span class="text-sm font-medium">Dashboard</span>.*?</a>)'
dashboard_link = """<a href="#" id="nav-dashboard" onclick="showView('dashboard-view')" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20 transition-colors">
                    <i data-lucide="layout-dashboard" class="w-5 h-5 text-white"></i>
                    <span class="text-sm font-medium">Dashboard</span>
                </a>"""
content = re.sub(nav_pattern, dashboard_link, content, count=1, flags=re.DOTALL)

nav_pattern2 = r'(<a href="#" class="flex items-center space-x-3 px-4 py-2\.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20">.*?<i data-lucide="file-text" class="w-5 h-5"></i>.*?<span class="text-sm font-medium">My Decisions</span>.*?</a>)'
my_decisions_link = """<a href="#" id="nav-my-decisions" onclick="showView('my-decisions-view')" class="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                    <i data-lucide="file-text" class="w-5 h-5 text-slate-400"></i>
                    <span class="text-sm font-medium">My Decisions</span>
                </a>"""
content = re.sub(nav_pattern2, my_decisions_link, content, count=1, flags=re.DOTALL)

# 2. Wrap Dashboard View
# Find the start of the scrollable content inner div
scroll_start_pattern = r'(<div class="flex-1 p-8 h-full bg-\[#F8FAFC\]">)'
# We will replace it with: 
scroll_start_replacement = r'\1\n                <div id="dashboard-view">'
content = re.sub(scroll_start_pattern, scroll_start_replacement, content, count=1)

# Find the end of it. The closing div for flex-1 p-8 h-full is right before `</div> <!-- Main Content -->`
end_pattern = r'(            </div>\n            \n        </div>\n    </div>)'

my_decisions_html = """
                </div> <!-- End Dashboard View -->

                <!-- My Decisions View -->
                <div id="my-decisions-view" class="hidden">
                    <div class="flex justify-between items-center mb-6">
                        <div>
                            <h2 class="text-2xl font-bold text-slate-900">My Decisions</h2>
                            <p class="text-sm text-slate-500 mt-1">Manage and track all your decision records.</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button class="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm">
                                <i data-lucide="filter" class="w-4 h-4 mr-2 text-slate-400"></i> Filter
                            </button>
                            <button class="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm">
                                <i data-lucide="calendar" class="w-4 h-4 mr-2 text-slate-400"></i> Date Range
                            </button>
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm">
                                <i data-lucide="plus" class="w-4 h-4 mr-2"></i> New Decision
                            </button>
                        </div>
                    </div>

                    <!-- Tabs -->
                    <div class="flex space-x-6 border-b border-slate-200 mb-6">
                        <button class="pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600 flex items-center">
                            All <span class="ml-2 bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full">24</span>
                        </button>
                        <button class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center">
                            Draft <span class="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">3</span>
                        </button>
                        <button class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center">
                            Pending <span class="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">5</span>
                        </button>
                        <button class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center">
                            Review <span class="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">2</span>
                        </button>
                        <button class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center">
                            Approved <span class="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">12</span>
                        </button>
                        <button class="pb-3 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center">
                            Rejected <span class="ml-2 bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">2</span>
                        </button>
                    </div>

                    <!-- Table -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                                    <th class="px-6 py-4 font-medium">ID / Name</th>
                                    <th class="px-6 py-4 font-medium">Category</th>
                                    <th class="px-6 py-4 font-medium">Owner</th>
                                    <th class="px-6 py-4 font-medium">Date</th>
                                    <th class="px-6 py-4 font-medium">Status</th>
                                    <th class="px-6 py-4 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-sm">
                                <tr class="hover:bg-slate-50 transition-colors cursor-pointer" onclick="showView('decision-details-view')">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-blue-600 text-xs mb-0.5">DEC-2847</div>
                                        <div class="font-semibold text-slate-900">Q4 Technology Budget Allocation</div>
                                    </td>
                                    <td class="px-6 py-4"><span class="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-xs font-medium">Finance</span></td>
                                    <td class="px-6 py-4 flex items-center mt-2"><div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mr-2">JD</div> John Doe</td>
                                    <td class="px-6 py-4 text-slate-500">Oct 12, 2025</td>
                                    <td class="px-6 py-4"><span class="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200">Pending</span></td>
                                    <td class="px-6 py-4 text-right"><button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-vertical" class="w-5 h-5"></i></button></td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-slate-500 text-xs mb-0.5">DEC-2846</div>
                                        <div class="font-semibold text-slate-900">New Office Location - Austin</div>
                                    </td>
                                    <td class="px-6 py-4"><span class="bg-green-50 text-green-600 px-2.5 py-1 rounded-md text-xs font-medium">Operations</span></td>
                                    <td class="px-6 py-4 flex items-center mt-2"><div class="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold mr-2">SC</div> Sarah Chen</td>
                                    <td class="px-6 py-4 text-slate-500">Oct 10, 2025</td>
                                    <td class="px-6 py-4"><span class="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold border border-blue-200">Review</span></td>
                                    <td class="px-6 py-4 text-right"><button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-vertical" class="w-5 h-5"></i></button></td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-slate-500 text-xs mb-0.5">DEC-2845</div>
                                        <div class="font-semibold text-slate-900">Cloud Provider Selection</div>
                                    </td>
                                    <td class="px-6 py-4"><span class="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-medium">Technology</span></td>
                                    <td class="px-6 py-4 flex items-center mt-2"><div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mr-2">JD</div> John Doe</td>
                                    <td class="px-6 py-4 text-slate-500">Oct 05, 2025</td>
                                    <td class="px-6 py-4"><span class="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">Approved</span></td>
                                    <td class="px-6 py-4 text-right"><button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-vertical" class="w-5 h-5"></i></button></td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-slate-500 text-xs mb-0.5">DEC-2844</div>
                                        <div class="font-semibold text-slate-900">Marketing Campaign Q4</div>
                                    </td>
                                    <td class="px-6 py-4"><span class="bg-pink-50 text-pink-600 px-2.5 py-1 rounded-md text-xs font-medium">Marketing</span></td>
                                    <td class="px-6 py-4 flex items-center mt-2"><div class="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold mr-2">MJ</div> Mike Ross</td>
                                    <td class="px-6 py-4 text-slate-500">Sep 28, 2025</td>
                                    <td class="px-6 py-4"><span class="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold border border-green-200">Approved</span></td>
                                    <td class="px-6 py-4 text-right"><button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-vertical" class="w-5 h-5"></i></button></td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-slate-500 text-xs mb-0.5">DEC-2843</div>
                                        <div class="font-semibold text-slate-900">Remote Work Policy Update</div>
                                    </td>
                                    <td class="px-6 py-4"><span class="bg-purple-50 text-purple-600 px-2.5 py-1 rounded-md text-xs font-medium">HR Policy</span></td>
                                    <td class="px-6 py-4 flex items-center mt-2"><div class="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold mr-2">SC</div> Sarah Chen</td>
                                    <td class="px-6 py-4 text-slate-500">Sep 20, 2025</td>
                                    <td class="px-6 py-4"><span class="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-200">Draft</span></td>
                                    <td class="px-6 py-4 text-right"><button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-vertical" class="w-5 h-5"></i></button></td>
                                </tr>
                                <tr class="hover:bg-slate-50 transition-colors">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-slate-500 text-xs mb-0.5">DEC-2842</div>
                                        <div class="font-semibold text-slate-900">Vendor Contract - Apex Security</div>
                                    </td>
                                    <td class="px-6 py-4"><span class="bg-red-50 text-red-600 px-2.5 py-1 rounded-md text-xs font-medium">Security</span></td>
                                    <td class="px-6 py-4 flex items-center mt-2"><div class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mr-2">JD</div> John Doe</td>
                                    <td class="px-6 py-4 text-slate-500">Sep 15, 2025</td>
                                    <td class="px-6 py-4"><span class="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-bold border border-red-200">Rejected</span></td>
                                    <td class="px-6 py-4 text-right"><button class="text-slate-400 hover:text-slate-600"><i data-lucide="more-vertical" class="w-5 h-5"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
                            <div>Showing 1 to 6 of 24 entries</div>
                            <div class="flex space-x-1">
                                <button class="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100">Prev</button>
                                <button class="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                                <button class="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100">2</button>
                                <button class="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100">3</button>
                                <button class="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100">Next</button>
                            </div>
                        </div>
                    </div>
                </div> <!-- End My Decisions View -->

                <!-- Decision Details View -->
                <div id="decision-details-view" class="hidden">
                    <div class="flex items-center text-xs text-slate-500 font-medium mb-4 space-x-2">
                        <a href="#" class="hover:text-blue-600 transition-colors" onclick="showView('dashboard-view')">Home</a>
                        <span>&gt;</span>
                        <a href="#" class="hover:text-blue-600 transition-colors" onclick="showView('my-decisions-view')">My Decisions</a>
                        <span>&gt;</span>
                        <span class="text-slate-800 font-semibold">DEC-2847</span>
                    </div>

                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <div class="flex items-center space-x-4 mb-2">
                                <h2 class="text-3xl font-bold text-slate-900">Q4 Technology Budget Allocation</h2>
                                <span class="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-bold border border-amber-200">Pending Approval</span>
                            </div>
                            <p class="text-sm text-slate-500">Created on Oct 12, 2025 by John Doe</p>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button class="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm">
                                <i data-lucide="edit" class="w-4 h-4 mr-2 text-slate-400"></i> Edit
                            </button>
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center shadow-sm">
                                <i data-lucide="bell" class="w-4 h-4 mr-2"></i> Send Reminder
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-6">
                        <!-- Left Column -->
                        <div class="col-span-2 space-y-6">
                            
                            <!-- Description -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Decision Context</h3>
                                <div class="text-slate-700 text-sm leading-relaxed space-y-4">
                                    <p>The objective of this decision is to finalize the allocation of the technology budget for Q4 2025. This quarter we have an increased focus on AI integration and security infrastructure upgrades, which necessitates a shift from previous allocations.</p>
                                    <p>Key drivers for this decision:</p>
                                    <ul class="list-disc pl-5 space-y-1">
                                        <li>Need to renew enterprise licenses for cloud providers.</li>
                                        <li>Initiation of the generative AI pilot project across engineering.</li>
                                        <li>Mandatory security compliance upgrades identified in the Q3 audit.</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Alternatives Considered -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Alternatives Considered</h3>
                                
                                <div class="space-y-6">
                                    <div>
                                        <div class="flex justify-between items-center mb-1">
                                            <span class="text-sm font-bold text-slate-800">Alternative A: Heavy Cloud Investment (Selected)</span>
                                            <span class="text-sm font-bold text-blue-600">85% Alignment</span>
                                        </div>
                                        <p class="text-xs text-slate-500 mb-2">Focus 60% of budget on cloud scaling and 40% on AI tooling.</p>
                                        <div class="w-full bg-slate-100 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: 85%"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="flex justify-between items-center mb-1">
                                            <span class="text-sm font-bold text-slate-800">Alternative B: Balanced Portfolio</span>
                                            <span class="text-sm font-bold text-slate-500">60% Alignment</span>
                                        </div>
                                        <p class="text-xs text-slate-500 mb-2">Equal distribution between Cloud, Security, and AI.</p>
                                        <div class="w-full bg-slate-100 rounded-full h-2">
                                            <div class="bg-slate-400 h-2 rounded-full" style="width: 60%"></div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div class="flex justify-between items-center mb-1">
                                            <span class="text-sm font-bold text-slate-800">Alternative C: Maintenance Mode</span>
                                            <span class="text-sm font-bold text-red-500">30% Alignment</span>
                                        </div>
                                        <p class="text-xs text-slate-500 mb-2">Minimal new investment; maintain current infrastructure only.</p>
                                        <div class="w-full bg-slate-100 rounded-full h-2">
                                            <div class="bg-red-400 h-2 rounded-full" style="width: 30%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Attachments -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Attachments</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="flex items-center p-3 border border-slate-200 rounded-lg">
                                        <div class="w-10 h-10 bg-red-50 rounded flex items-center justify-center mr-3">
                                            <i data-lucide="file-text" class="w-5 h-5 text-red-500"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-sm font-bold text-slate-800">Budget_Proposal_v2.pdf</div>
                                            <div class="text-xs text-slate-400">2.4 MB</div>
                                        </div>
                                        <button class="text-slate-400 hover:text-blue-600"><i data-lucide="download" class="w-4 h-4"></i></button>
                                    </div>
                                    <div class="flex items-center p-3 border border-slate-200 rounded-lg">
                                        <div class="w-10 h-10 bg-green-50 rounded flex items-center justify-center mr-3">
                                            <i data-lucide="table" class="w-5 h-5 text-green-500"></i>
                                        </div>
                                        <div class="flex-1">
                                            <div class="text-sm font-bold text-slate-800">Financial_Model.xlsx</div>
                                            <div class="text-xs text-slate-400">1.1 MB</div>
                                        </div>
                                        <button class="text-slate-400 hover:text-blue-600"><i data-lucide="download" class="w-4 h-4"></i></button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- Right Column -->
                        <div class="col-span-1 space-y-6">
                            
                            <!-- Decision Info -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Decision Info</h3>
                                <div class="space-y-4 text-sm">
                                    <div>
                                        <span class="block text-xs text-slate-500 font-medium mb-1">Impact Level</span>
                                        <span class="inline-flex items-center px-2 py-1 rounded bg-red-50 text-red-700 font-bold text-xs"><i data-lucide="alert-triangle" class="w-3 h-3 mr-1"></i> High Impact</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs text-slate-500 font-medium mb-1">Due Date</span>
                                        <span class="font-semibold text-slate-800">Oct 25, 2025 (in 5 days)</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs text-slate-500 font-medium mb-1">Category</span>
                                        <span class="inline-block bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-medium">Finance</span>
                                    </div>
                                    <div>
                                        <span class="block text-xs text-slate-500 font-medium mb-1">Tags</span>
                                        <div class="flex flex-wrap gap-2 mt-1">
                                            <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">budget</span>
                                            <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">q4</span>
                                            <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">technology</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Approval Chain -->
                            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Approval Chain</h3>
                                
                                <div class="relative pl-6 space-y-6">
                                    <!-- Timeline line -->
                                    <div class="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200"></div>
                                    
                                    <!-- Step 1 -->
                                    <div class="relative">
                                        <div class="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm flex items-center justify-center">
                                            <i data-lucide="check" class="w-3 h-3 text-white"></i>
                                        </div>
                                        <div class="text-sm">
                                            <div class="font-bold text-slate-900">Drafted</div>
                                            <div class="text-xs text-slate-500 mt-0.5">John Doe (Owner)</div>
                                            <div class="text-[10px] text-slate-400 mt-0.5">Oct 12, 10:00 AM</div>
                                        </div>
                                    </div>

                                    <!-- Step 2 -->
                                    <div class="relative">
                                        <div class="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm flex items-center justify-center">
                                            <i data-lucide="check" class="w-3 h-3 text-white"></i>
                                        </div>
                                        <div class="text-sm">
                                            <div class="font-bold text-slate-900">Peer Review</div>
                                            <div class="text-xs text-slate-500 mt-0.5">Sarah Chen (Engineering)</div>
                                            <div class="text-[10px] text-slate-400 mt-0.5">Oct 14, 2:30 PM</div>
                                        </div>
                                    </div>

                                    <!-- Step 3 -->
                                    <div class="relative">
                                        <div class="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-amber-400 border-4 border-white shadow-sm animate-pulse"></div>
                                        <div class="text-sm">
                                            <div class="font-bold text-amber-600">Finance Approval</div>
                                            <div class="text-xs text-slate-500 mt-0.5">Michael Ross (CFO)</div>
                                            <div class="text-[10px] font-medium text-amber-500 mt-0.5">Pending Action</div>
                                        </div>
                                    </div>

                                    <!-- Step 4 -->
                                    <div class="relative opacity-50">
                                        <div class="absolute -left-[29px] top-1 w-5 h-5 rounded-full bg-slate-200 border-4 border-white shadow-sm"></div>
                                        <div class="text-sm">
                                            <div class="font-bold text-slate-600">Final Sign-off</div>
                                            <div class="text-xs text-slate-500 mt-0.5">Elena Rodriguez (CEO)</div>
                                            <div class="text-[10px] text-slate-400 mt-0.5">Awaiting previous steps</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> <!-- End Decision Details View -->
\1
"""
content = re.sub(end_pattern, my_decisions_html, content, count=1)

# Add Javascript logic at the end
script_tag = """
    <!-- Initialize Lucide icons -->
    <script>
        lucide.createIcons();

        function showView(viewId) {
            // Hide all views
            document.getElementById('dashboard-view').classList.add('hidden');
            document.getElementById('my-decisions-view').classList.add('hidden');
            document.getElementById('decision-details-view').classList.add('hidden');

            // Show selected view
            document.getElementById(viewId).classList.remove('hidden');

            // Reset navigation active states
            const navDashboard = document.getElementById('nav-dashboard');
            const navMyDecisions = document.getElementById('nav-my-decisions');
            
            navDashboard.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors";
            
            navMyDecisions.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors";

            // Set active state based on viewId
            if (viewId === 'dashboard-view') {
                navDashboard.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20 transition-colors";
            } else if (viewId === 'my-decisions-view' || viewId === 'decision-details-view') {
                navMyDecisions.className = "flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-900/20 transition-colors";
            }
            
            // Re-initialize icons since we might change SVG classes if we re-render, but here we just leave them.
            // Actually, lucide creates SVGs. We can change the stroke color on the SVG directly.
            if (navDashboard.querySelector('svg')) {
                const svg = navDashboard.querySelector('svg');
                if (viewId === 'dashboard-view') {
                    svg.classList.remove('text-slate-400');
                    svg.classList.add('text-white');
                } else {
                    svg.classList.remove('text-white');
                    svg.classList.add('text-slate-400');
                }
            }
            if (navMyDecisions.querySelector('svg')) {
                const svg = navMyDecisions.querySelector('svg');
                if (viewId === 'dashboard-view') {
                    svg.classList.remove('text-white');
                    svg.classList.add('text-slate-400');
                } else {
                    svg.classList.remove('text-slate-400');
                    svg.classList.add('text-white');
                }
            }
        }
    </script>
</body>
</html>"""

content = re.sub(r'    <!-- Initialize Lucide icons -->\s+<script>\s+lucide\.createIcons\(\);\s+</script>\s+</body>\s+</html>', script_tag, content, flags=re.DOTALL)

with open('dashboard_full_ui.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Update complete")
