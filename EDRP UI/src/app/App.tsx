import React, { useId, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard, FileText, PlusCircle, CheckSquare, BookOpen,
  MessageSquare, BarChart2, Shield, Users, Settings, Search, Bell,
  ChevronRight, Download, Clock, Check, X, Eye, Upload, Zap,
  TrendingUp, LogOut, Plus, Filter, Archive, Edit3, Send,
  Star, UserCheck, Calendar, Award, MoreHorizontal, ChevronDown,
  AlertTriangle, Database, FileCheck, Activity, Lock, RefreshCw,
  GitBranch, ArrowRight, Paperclip, Reply, AtSign, Trash2,
  Tag, Hash, Clipboard, ChevronUp, FileUp, AlertCircle, Link2,
  ThumbsUp, Bookmark, FolderOpen, MapPin, Mail, HelpCircle,
  Inbox, LifeBuoy, Ticket, Bot, ChevronLeft, Circle
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line
} from "recharts";

// ══════════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════════
const FW = 1200, FH = 840;
const SC = 0.25;
const TW = 300, TH = 210;

const C = {
  blue: "#2563EB", blueD: "#1D4ED8", blueL: "#EFF6FF", blueMid: "#BFDBFE",
  navy: "#1E293B", slate: "#334155",
  bg: "#F8FAFC", white: "#FFFFFF",
  g50: "#F8FAFC", g100: "#F1F5F9", g200: "#E2E8F0",
  g300: "#CBD5E1", g400: "#94A3B8", g500: "#64748B",
  g600: "#475569", g700: "#334155", g800: "#1E293B", g900: "#0F172A",
  green: "#10B981", greenL: "#ECFDF5",
  red: "#EF4444", redL: "#FEF2F2",
  amber: "#F59E0B", amberL: "#FFFBEB",
  purple: "#8B5CF6", purpleL: "#F5F3FF",
  indigo: "#6366F1", indigoL: "#EEF2FF",
  teal: "#14B8A6", tealL: "#F0FDFA",
};

// ══════════════════════════════════════════════════════════════════
// SHARED LAYOUT COMPONENTS
// ══════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { id: "dashboard",     label: "Dashboard",           Icon: LayoutDashboard },
  { id: "decisions",     label: "My Decisions",         Icon: FileText },
  { id: "create",        label: "Create Decision",      Icon: PlusCircle },
  { id: "reviews",       label: "Pending Reviews",      Icon: CheckSquare, badge: 5 },
  { id: "discussions",   label: "Discussions",          Icon: MessageSquare },
  { id: "knowledge",     label: "Knowledge Repository", Icon: BookOpen },
  { id: "notifications", label: "Notifications",        Icon: Bell },
  { id: "email",         label: "Email Service",        Icon: Mail },
  { id: "support",       label: "Support Center",       Icon: HelpCircle },
  { id: "profile",       label: "Profile",              Icon: Users },
  { id: "settings",      label: "Settings",             Icon: Settings },
];

function Sidebar({ active }: { active: string }) {
  return (
    <div style={{ width: 240, height: "100%", background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "28px 20px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={21} color="white" />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>EDRP</div>
            <div style={{ color: C.g400, fontSize: 11 }}>Decision Platform</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "14px 10px", overflow: "hidden" }}>
        {NAV_ITEMS.map(({ id, label, Icon, badge }: any) => {
          const on = active === id;
          return (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, marginBottom: 2, background: on ? C.blue : "transparent" }}>
              <Icon size={16} color={on ? "white" : C.g400} />
              <span style={{ fontSize: 13, fontWeight: on ? 600 : 400, color: on ? "white" : C.g400, flex: 1 }}>{label}</span>
              {badge && <span style={{ background: C.red, color: "white", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{badge}</span>}
            </div>
          );
        })}
      </nav>
      <div style={{ padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>JD</span>
          </div>
          <div>
            <div style={{ color: "white", fontSize: 13, fontWeight: 500 }}>John Doe</div>
            <div style={{ color: C.g400, fontSize: 11 }}>Administrator</div>
          </div>
          <LogOut size={15} color={C.g400} style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </div>
  );
}

function TopNav({ title, breadcrumb }: { title: string; breadcrumb?: string[] }) {
  return (
    <div style={{ height: 68, flexShrink: 0, display: "flex", alignItems: "center", padding: "0 28px", gap: 16, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.g200}` }}>
      <div style={{ flex: 1 }}>
        {breadcrumb && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
            {breadcrumb.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={12} color={C.g300} />}
                <span style={{ fontSize: 11, color: i < breadcrumb.length - 1 ? C.g400 : C.g600, fontWeight: i < breadcrumb.length - 1 ? 400 : 500 }}>{item}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{ fontSize: 22, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em" }}>{title}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.g100, border: `1px solid ${C.g200}`, borderRadius: 12, padding: "10px 16px", width: 290 }}>
        <Search size={15} color={C.g400} />
        <span style={{ fontSize: 13, color: C.g400 }}>Search decisions...</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: C.g300, border: `1px solid ${C.g200}`, borderRadius: 4, padding: "2px 5px" }}>⌘K</span>
      </div>
      <div style={{ position: "relative", padding: 8 }}>
        <Bell size={21} color={C.g500} />
        <div style={{ position: "absolute", top: 4, right: 4, width: 15, height: 15, background: C.red, borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>3</span>
        </div>
      </div>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px white,0 0 0 5px #EFF6FF" }}>
        <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>JD</span>
      </div>
    </div>
  );
}

function AppLayout({ active, title, breadcrumb, children }: any) {
  return (
    <div style={{ width: FW, minHeight: FH, display: "flex", background: C.g50, fontFamily: "'Inter',-apple-system,sans-serif" }}>
      <Sidebar active={active} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopNav title={title} breadcrumb={breadcrumb} />
        <div style={{ flex: 1, padding: 28 }}>{children}</div>
      </div>
    </div>
  );
}

function SBadge({ s }: { s: string }) {
  const map: Record<string, [string, string]> = {
    Draft: [C.g100, C.g600], Pending: [C.amberL, C.amber], Review: [C.indigoL, C.indigo],
    Approved: [C.greenL, C.green], Rejected: [C.redL, C.red], Archived: [C.purpleL, C.purple],
    Active: [C.greenL, C.green], Inactive: [C.g100, C.g500], Admin: [C.blueL, C.blue],
    Manager: [C.purpleL, C.purple], Reviewer: [C.indigoL, C.indigo], Viewer: [C.tealL, C.teal],
  };
  const [bg, color] = map[s] || [C.g100, C.g600];
  return <span style={{ fontSize: 12, fontWeight: 600, color, background: bg, padding: "4px 11px", borderRadius: 20, display: "inline-block", whiteSpace: "nowrap" }}>{s}</span>;
}

function Thumb({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{ width: TW, borderRadius: 10, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.14),0 4px 12px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)", background: "white" }}>
        <div style={{ height: 10, background: "#DADDE1", display: "flex", alignItems: "center", padding: "0 8px", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6058" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFC130" }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#29CD41" }} />
          <div style={{ flex: 1, background: "white", borderRadius: 4, height: 6, marginLeft: 6, display: "flex", alignItems: "center", padding: "0 4px" }}>
            <span style={{ fontSize: 3.5, color: "#9CA3AF" }}>edrp.enterprise.com</span>
          </div>
        </div>
        <div style={{ width: TW, minHeight: TH, overflow: "hidden", position: "relative" }}>
          <div style={{ width: FW, minHeight: FH, zoom: SC }}>
            {children}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 10, fontWeight: 700, color: C.g600, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center", lineHeight: 1.3 }}>
        {label}
      </div>
    </div>
  );
}

function Arr({ dim = false }: { dim?: boolean }) {
  const col = dim ? C.g300 : C.blue;
  return (
    <div style={{ width: 52, flexShrink: 0, marginTop: 108, display: "flex", alignItems: "center" }}>
      <div style={{ width: 34, height: 2, background: col }} />
      <div style={{ width: 0, height: 0, borderLeft: `9px solid ${col}`, borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} />
    </div>
  );
}

function FlowSection({ num, title, desc, color = C.blue, children }: any) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, padding: "0 48px" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${color}55` }}>
          <span style={{ color: "white", fontSize: 14, fontWeight: 800 }}>{num}</span>
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.g800, letterSpacing: "-0.02em", fontFamily: "'Inter',sans-serif" }}>{title}</div>
          {desc && <div style={{ fontSize: 12, color: C.g400, marginTop: 1, fontFamily: "'Inter',sans-serif" }}>{desc}</div>}
        </div>
        <div style={{ flex: 1, height: 1, background: C.g200 }} />
      </div>
      <div style={{ padding: "0 48px" }}>{children}</div>
    </div>
  );
}

function ScreenRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>{children}</div>;
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 1: LANDING PAGE
// ══════════════════════════════════════════════════════════════════
export function LandingScreen() {
  const features = [
    { Icon: FileText,   title: "Decision Management",   desc: "Create, review and manage organizational decisions in a structured, traceable workflow." },
    { Icon: CheckSquare,title: "Approval Workflow",     desc: "Support multi-level approval and review processes across roles and departments." },
    { Icon: BookOpen,   title: "Knowledge Repository",  desc: "Search and reuse previous organizational decisions to build institutional knowledge." },
    { Icon: Database,   title: "Audit & Compliance",    desc: "Maintain complete decision history, version control and audit logs for full traceability." },
  ];

  return (
    <div style={{ width: FW, height: FH, background: "#F8FAFC", fontFamily: "'Inter',sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 56px", height: 72, background: "white", borderBottom: `1px solid ${C.g200}`, flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={20} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em" }}>EDRP</div>
            <div style={{ fontSize: 10, color: C.g400, marginTop: -1 }}>Decision Platform</div>
          </div>
        </div>
        {/* Nav */}
        <nav style={{ display: "flex", gap: 36 }}>
          {["Home", "Features", "About", "Contact"].map((item, i) => (
            <span key={item} style={{ fontSize: 14, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? C.blue : C.g600, cursor: "pointer", borderBottom: i === 0 ? `2px solid ${C.blue}` : "none", paddingBottom: 2 }}>{item}</span>
          ))}
        </nav>
        {/* Auth buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ padding: "9px 22px", borderRadius: 8, border: `1px solid ${C.g200}`, background: "white", color: C.g700, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Sign In</button>
          <button style={{ padding: "9px 22px", borderRadius: 8, border: "none", background: C.blue, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }}>Register</button>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 64, paddingBottom: 56, paddingLeft: 120, paddingRight: 120 }}>
        <div style={{ maxWidth: 680, textAlign: "center" as const }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.blueL, border: `1px solid ${C.blueMid}`, borderRadius: 20, padding: "5px 14px", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Enterprise Decision Management</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: C.g900, lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px" }}>
            Expert Decision<br />
            <span style={{ color: C.blue }}>Replay Platform</span>
          </h1>
          <p style={{ fontSize: 17, color: C.g600, lineHeight: 1.75, margin: "0 auto 36px", maxWidth: 580 }}>
            A centralized platform for creating, reviewing, approving and managing organizational decisions with complete transparency, collaboration and traceability.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={{ padding: "13px 32px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>
              Get Started →
            </button>
            <button style={{ padding: "13px 32px", borderRadius: 10, border: `1px solid ${C.g200}`, background: "white", color: C.g700, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* ── Features ───────────────────────────────────────── */}
      <div style={{ padding: "0 56px 40px", flex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {features.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: "white", borderRadius: 14, padding: "22px 20px", border: `1px solid ${C.g200}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon size={20} color={C.blue} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.g900, marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 12, color: C.g500, lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.g200}`, background: "white", padding: "14px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: C.g400 }}>© 2026 Expert Decision Replay Platform</span>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Terms of Service", "Contact"].map(link => (
            <span key={link} style={{ fontSize: 12, color: C.g500, cursor: "pointer" }}>{link}</span>
          ))}
        </div>
      </div>

    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 2: LOGIN
// ══════════════════════════════════════════════════════════════════
export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user_id);
        
        // Simple routing based on a mock or response role if available
        if (data.role_name === "Administrator") {
          navigate("/dashboard");
        } else if (data.role_name === "Manager") {
          navigate("/dashboard/manager");
        } else {
          navigate("/dashboard/employee");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={{ width: FW, height: FH, background: "#F8FAFC", display: "flex", flexDirection: "column", fontFamily: "'Inter',sans-serif" }}>
      {/* Top bar */}
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", background: "white", borderBottom: `1px solid ${C.g200}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={18} color="white" /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em" }}>EDRP</div>
            <div style={{ fontSize: 10, color: C.g400, marginTop: -1 }}>Decision Platform</div>
          </div>
        </div>
        <span style={{ fontSize: 13, color: C.g500 }}>
          Don't have an account? <Link to="/register" style={{ color: C.blue, fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>Register</Link>
        </span>
      </div>

      {/* Centered card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 440, background: "white", borderRadius: 20, padding: "44px 48px", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", border: `1px solid ${C.g200}` }}>

          {/* Heading */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: C.g900, margin: "0 0 6px", letterSpacing: "-0.03em" }}>Welcome Back</h2>
            <p style={{ fontSize: 14, color: C.g500, margin: 0 }}>Sign in to your enterprise account</p>
          </div>

          {error && <div style={{ color: C.red, fontSize: 13, marginBottom: 16, textAlign: "center" }}>{error}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Email Address</label>
              <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.g500, display: "flex", alignItems: "center", gap: 10 }}>
                <Mail size={16} color={C.g400} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="john.doe@enterprise.com" 
                  style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }} 
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Password</label>
              <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", display: "flex", alignItems: "center", gap: 10 }}>
                <Lock size={16} color={C.g400} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••••••" 
                  style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14 }} 
                />
                <Eye size={16} color={C.g400} />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.g600, cursor: "pointer" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: C.blue, border: `2px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={10} color="white" />
                </div>
                Remember me
              </label>
              <span style={{ fontSize: 13, color: C.blue, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
            </div>

            {/* Sign In button */}
            <button onClick={handleLogin} style={{ padding: "14px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.30)", letterSpacing: "-0.01em" }}>
              Sign In
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: C.g200 }} />
              <span style={{ fontSize: 12, color: C.g400 }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: C.g200 }} />
            </div>

            {/* SSO */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 16px", border: `1.5px solid ${C.g200}`, borderRadius: 10, background: "white", cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, background: "#0078D4", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>M</span>
              </div>
              <span style={{ fontSize: 14, color: C.g700, fontWeight: 500 }}>Continue with Microsoft SSO</span>
            </div>
          </div>

          <p style={{ fontSize: 12, color: C.g400, textAlign: "center" as const, margin: "24px 0 0" }}>
            Protected by enterprise-grade security · v3.2.1
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 2b: REGISTRATION
// ══════════════════════════════════════════════════════════════════
export function RegistrationScreen() {
  const roles = [
    { id: "employee", label: "Employee",      desc: "Submit and track decisions",   Icon: Users,    role_id: 2 },
    { id: "reviewer", label: "Reviewer",      desc: "Review submitted decisions",   Icon: Eye,      role_id: 3 },
    { id: "manager",  label: "Manager",       desc: "Approve and manage workflows", Icon: UserCheck,role_id: 4 },
    { id: "admin",    label: "Administrator", desc: "Full platform access",         Icon: Shield,   role_id: 1 },
  ];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(2);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch = password && password === confirmPassword;

  const handleRegister = async () => {
    if (!passwordsMatch) return;
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
          role_id: selectedRole,
          team_id: 1,
          designation: "Software",
          phone: "0000000000"
        })
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const text = await response.text();
        setError(`Registration failed: ${text}`);
      }
    } catch (err) {
      setError("Server error.");
    }
  };

  return (
    <div style={{ width: FW, height: FH, background: "#F8FAFC", fontFamily: "'Inter',sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Top bar */}
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 56px", background: "white", borderBottom: `1px solid ${C.g200}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={17} color="white" /></div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em" }}>EDRP</div>
            <div style={{ fontSize: 9, color: C.g400, marginTop: -1 }}>Decision Platform</div>
          </div>
        </div>
        <span style={{ fontSize: 13, color: C.g500 }}>
          Already have an account? <Link to="/login" style={{ color: C.blue, fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>Sign In</Link>
        </span>
      </div>

      {/* Form area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 56px 32px" }}>
        {/* Page heading */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: C.g900, margin: "0 0 5px", letterSpacing: "-0.03em" }}>Create your Account</h2>
          <p style={{ fontSize: 13, color: C.g500, margin: 0 }}>Fill in your details to request access to the platform. Your account will be reviewed by an administrator.</p>
          {error && <p style={{ fontSize: 13, color: C.red, marginTop: 10 }}>{error}</p>}
          {success && <p style={{ fontSize: 13, color: C.green, marginTop: 10 }}>Registration successful! Redirecting...</p>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* Full Name */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.g700, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Full Name <span style={{ color: C.red }}>*</span></label>
            <div style={{ border: `2px solid ${C.blue}`, borderRadius: 10, padding: "10px 14px", background: "white", fontSize: 13, color: C.g800 }}>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John David" style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13 }} />
            </div>
          </div>

          {/* Official Email */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.g700, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Official Email <span style={{ color: C.red }}>*</span></label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px", background: "white", fontSize: 13, color: C.g800 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@company.com" style={{ border: 'none', outline: 'none', width: '100%', fontSize: 13 }} />
            </div>
          </div>

        </div>

        {/* Role selector */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: C.g700, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Select Role <span style={{ color: C.red }}>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {roles.map((role) => {
              const sel = selectedRole === role.role_id;
              const { Icon } = role;
              return (
                <div key={role.id} onClick={() => setSelectedRole(role.role_id)} style={{ border: `2px solid ${sel ? C.blue : C.g200}`, borderRadius: 12, padding: "14px 12px", background: sel ? C.blueL : "white", cursor: "pointer", textAlign: "center", position: "relative" }}>
                  {sel && <div style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={10} color="white" /></div>}
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: sel ? "white" : C.g100, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                    <Icon size={18} color={sel ? C.blue : C.g400} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: sel ? C.blue : C.g800, marginBottom: 3 }}>{role.label}</div>
                  <div style={{ fontSize: 11, color: sel ? C.blue : C.g500, lineHeight: 1.4 }}>{role.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Password row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.g700, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Password <span style={{ color: C.red }}>*</span></label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px", background: "white", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Lock size={14} color={C.g400} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13 }} />
              <Eye size={14} color={C.g400} />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.g700, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Confirm Password <span style={{ color: C.red }}>*</span></label>
            <div style={{ border: `1.5px solid ${passwordsMatch ? C.green : C.g200}`, borderRadius: 10, padding: "10px 14px", background: "white", display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Lock size={14} color={passwordsMatch ? C.green : C.g400} />
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••••••" style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13 }} />
              <Eye size={14} color={C.g400} />
            </div>
          </div>
        </div>

        {/* Terms + Submit */}
        <div style={{ borderTop: `1px solid ${C.g200}`, paddingTop: 16 }}>
          <button onClick={handleRegister} disabled={!passwordsMatch} style={{ width: "100%", padding: "13px", borderRadius: 10, border: "none", background: passwordsMatch ? C.blue : C.g300, color: "white", fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", cursor: passwordsMatch ? "pointer" : "not-allowed", opacity: passwordsMatch ? 1 : 0.8 }}>
            Create Account →
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ADMIN NAV + LAYOUT
// ══════════════════════════════════════════════════════════════════
const ADMIN_NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",          Icon: LayoutDashboard },
  { id: "users",       label: "User Management",     Icon: Users },
  { id: "roles",       label: "Role Management",     Icon: Shield },
  { id: "teams",       label: "Team Management",     Icon: GitBranch },
  { id: "decisions",   label: "Decision Management", Icon: FileText },
  { id: "knowledge",   label: "Knowledge Repository",Icon: BookOpen },
  { id: "reports",     label: "Reports & Analytics", Icon: BarChart2 },
  { id: "audit",       label: "Audit Logs",          Icon: Database },
  { id: "config",      label: "System Configuration",Icon: Settings },
  { id: "notifications",label: "Notifications",      Icon: Bell },
  { id: "profile",     label: "Profile",             Icon: Users },
];

function AdminSidebar({ active }: { active: string }) {
  return (
    <div style={{ width: 240, height: "100%", background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.indigo, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={19} color="white" />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em" }}>EDRP</div>
            <div style={{ color: C.g400, fontSize: 10 }}>Decision Platform</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "10px 8px", overflowY: "auto" }}>
        {ADMIN_NAV_ITEMS.map(({ id, label, Icon }: any) => {
          const on = active === id;
          return (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 7, marginBottom: 1, background: on ? C.indigo : "transparent" }}>
              <Icon size={15} color={on ? "white" : C.g400} />
              <span style={{ fontSize: 12, fontWeight: on ? 600 : 400, color: on ? "white" : C.g400 }}>{label}</span>
            </div>
          );
        })}
      </nav>
      <div style={{ padding: "14px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>SA</span>
          </div>
          <div>
            <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>S. Administrator</div>
            <div style={{ color: C.g400, fontSize: 10 }}>System Admin</div>
          </div>
          <LogOut size={13} color={C.g400} style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </div>
  );
}

function AdminAppLayout({ active, title, breadcrumb, children }: any) {
  return (
    <div style={{ width: FW, height: FH, display: "flex", background: C.g50, fontFamily: "'Inter',-apple-system,sans-serif", overflow: "hidden" }}>
      <AdminSidebar active={active} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopNav title={title} breadcrumb={breadcrumb} />
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 3: ADMINISTRATOR DASHBOARD
// ══════════════════════════════════════════════════════════════════
export function DashboardScreen() {
  // ── Data ──────────────────────────────────────────────────────
  const decisionTrendData = [
    { m: "Aug", submitted: 28, approved: 19, rejected: 4 },
    { m: "Sep", submitted: 34, approved: 24, rejected: 6 },
    { m: "Oct", submitted: 29, approved: 21, rejected: 3 },
    { m: "Nov", submitted: 42, approved: 31, rejected: 7 },
    { m: "Dec", submitted: 38, approved: 27, rejected: 5 },
    { m: "Jan", submitted: 51, approved: 38, rejected: 8 },
  ];

  const deptData = [
    { dept: "Technology", decisions: 58, approved: 42 },
    { dept: "Finance",    decisions: 44, approved: 35 },
    { dept: "HR Policy",  decisions: 37, approved: 29 },
    { dept: "Security",   decisions: 31, approved: 22 },
    { dept: "Procurement",decisions: 24, approved: 18 },
  ];

  const userGrowth = [
    { m: "Aug", users: 84 }, { m: "Sep", users: 91 }, { m: "Oct", users: 98 },
    { m: "Nov", users: 107 }, { m: "Dec", users: 118 }, { m: "Jan", users: 132 },
  ];

  const systemUsage = [
    { name: "Decisions",    value: 38, color: C.blue },
    { name: "Reviews",      value: 26, color: C.purple },
    { name: "Discussions",  value: 20, color: C.teal },
    { name: "Reports",      value: 16, color: C.amber },
  ];

  const approvalFlow = [
    { stage: "Submitted",  count: 213, pct: 100, color: C.g400 },
    { stage: "In Review",  count: 148, pct: 69,  color: C.blue },
    { stage: "Approved",   count: 185, pct: 87,  color: C.green },
    { stage: "Rejected",   count: 28,  pct: 13,  color: C.red },
    { stage: "Archived",   count: 48,  pct: 23,  color: C.g300 },
  ];

  const orgDecisions = [
    { id: "DEC-3150", title: "Cloud Infrastructure Migration Strategy", dept: "Technology", status: "Pending",  approver: "Dr. A. Rivera", created: "Jan 10, 2026" },
    { id: "DEC-3147", title: "Remote Work Policy Revision Q1 2026",     dept: "HR Policy",  status: "Review",   approver: "M. Johnson",    created: "Jan 9, 2026"  },
    { id: "DEC-3143", title: "Q1 Budget Allocation — Engineering",       dept: "Finance",    status: "Approved", approver: "S. Chen",        created: "Jan 7, 2026"  },
    { id: "DEC-3139", title: "New Vendor Onboarding Process",            dept: "Procurement",status: "Draft",    approver: "L. Park",        created: "Jan 6, 2026"  },
    { id: "DEC-3135", title: "Security Compliance Framework Update",     dept: "Security",   status: "Pending",  approver: "Dr. M. Lee",     created: "Jan 5, 2026"  },
  ];

  const auditLogs = [
    { user: "S. Chen",   action: "Approved decision DEC-3143",            module: "Decisions", time: "5 min ago",  severity: "Info"    },
    { user: "A. Patel",  action: "Failed login attempt (3rd try)",         module: "Auth",      time: "18 min ago", severity: "Warning" },
    { user: "J. Doe",    action: "Submitted DEC-3150 for review",          module: "Decisions", time: "32 min ago", severity: "Info"    },
    { user: "Admin",     action: "Role permissions updated — Manager",     module: "Roles",     time: "1 hr ago",   severity: "Warning" },
    { user: "M. Johnson",action: "Exported audit report Q4 2025",          module: "Reports",   time: "2 hrs ago",  severity: "Info"    },
    { user: "T. Wright", action: "User account deactivated",               module: "Users",     time: "3 hrs ago",  severity: "Critical"},
  ];

  const newUsers = [
    { name: "Rachel Kim",    role: "Reviewer",  dept: "Product",    joined: "Today, 9:12 AM",  avatar: "RK" },
    { name: "Omar Hassan",   role: "Employee",  dept: "Engineering",joined: "Today, 8:40 AM",  avatar: "OH" },
    { name: "Priya Sharma",  role: "Manager",   dept: "Operations", joined: "Yesterday",        avatar: "PS" },
    { name: "Carlos Mendez", role: "Employee",  dept: "Finance",    joined: "Jan 9, 2026",      avatar: "CM" },
  ];

  const securityEvents = [
    { msg: "3 failed login attempts detected — A. Patel", time: "18 min ago", level: "Warning", icon: AlertTriangle, color: C.amber },
    { msg: "New admin session started from 192.168.1.44", time: "1 hr ago",   level: "Info",    icon: Lock,          color: C.blue  },
    { msg: "Account suspended — T. Wright (policy breach)",time: "3 hrs ago",  level: "Critical",icon: Shield,        color: C.red   },
    { msg: "Password reset requested — M. Johnson",        time: "5 hrs ago",  level: "Info",    icon: RefreshCw,     color: C.g500  },
  ];

  const adminTasks = [
    { title: "Review pending role-change request for 4 users",  priority: "High",   icon: UserCheck,     color: C.amber  },
    { title: "Approve system configuration changes (v2.4.1)",   priority: "High",   icon: Settings,      color: C.red    },
    { title: "Respond to compliance audit report request",      priority: "Medium", icon: FileCheck,     color: C.purple },
    { title: "Archive 12 resolved decisions from Q4 2025",      priority: "Low",    icon: Archive,       color: C.g500   },
    { title: "Review and publish knowledge base updates",        priority: "Medium", icon: BookOpen,      color: C.teal   },
  ];

  const sysHealth = [
    { label: "API Response",  val: "98.7%", color: C.green  },
    { label: "DB Uptime",     val: "99.9%", color: C.green  },
    { label: "Queue Latency", val: "142ms", color: C.amber  },
    { label: "Error Rate",    val: "0.3%",  color: C.green  },
  ];

  const priorityCol = (p: string) => p === "High" ? C.red : p === "Medium" ? C.amber : C.g500;
  const priorityBg  = (p: string) => p === "High" ? C.redL : p === "Medium" ? C.amberL : C.g100;
  const severityCol = (s: string) => s === "Critical" ? C.red : s === "Warning" ? C.amber : C.g500;
  const severityBg  = (s: string) => s === "Critical" ? C.redL : s === "Warning" ? C.amberL : C.g100;

  return (
    <AdminAppLayout active="dashboard" title="Administrator Dashboard" breadcrumb={["Home", "Administrator Dashboard"]}>

      {/* Role identity accent — Indigo: organization-wide admin view */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: `1px solid ${C.g100}`, borderRadius: 12, padding: "12px 18px", marginBottom: 18, boxShadow: "0 1px 4px rgba(99,102,241,0.07)" }}>
        <div style={{ width: 4, height: 36, background: `linear-gradient(180deg,${C.indigo},#818CF8)`, borderRadius: 2, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.g900 }}>Administrator Dashboard</div>
          <div style={{ fontSize: 11, color: C.g400, marginTop: 1 }}>Organization-wide administration — users, decisions, audit logs and system monitoring.</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: C.indigoL, border: `1px solid ${C.indigo}30`, borderRadius: 8, padding: "5px 12px" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.indigo }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: C.indigo }}>System Administrator</span>
        </div>
      </div>

      {/* ── 6 Summary Cards ──────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 14, marginBottom: 20 }}>
        {([
          [Users,        "Total Users",       "132", "+14 this month", C.blue,   C.blueL  ],
          [FileText,     "Total Decisions",   "213", "Org-wide",       C.indigo, C.indigoL],
          [CheckSquare,  "Pending Approvals", "18",  "Needs action",   C.amber,  C.amberL ],
          [Activity,     "Active Sessions",   "47",  "Right now",      C.green,  C.greenL ],
          [Database,     "Audit Logs",        "1.2k","Last 30 days",   C.purple, C.purpleL],
          [Zap,          "System Health",     "99%", "All systems up", C.teal,   C.tealL  ],
        ] as const).map(([Icon, label, val, desc, col, bg]: any) => (
          <div key={label} style={{ background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={col} /></div>
              <TrendingUp size={13} color={C.g300} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.g900, letterSpacing: "-0.03em", marginBottom: 2 }}>{val}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.g700, marginBottom: 1 }}>{label}</div>
            <div style={{ fontSize: 10, color: C.g400 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* ── Organization Analytics ───────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, padding: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Organization Analytics</div>
            <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Decision trends, approval flow and platform usage — last 6 months</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["6M", "1Y", "All"].map((p, i) => (
              <span key={p} style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? "white" : C.g500, background: i === 0 ? C.blue : "transparent", border: `1px solid ${i === 0 ? C.blue : C.g200}`, padding: "4px 10px", borderRadius: 6, cursor: "pointer" }}>{p}</span>
            ))}
          </div>
        </div>

        {/* Row 1: Decision Trends (large) + Approval Flow */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16, marginBottom: 16 }}>
          {/* Decision Trends */}
          <div style={{ background: C.g50, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>Decision Trends</div>
              <div style={{ display: "flex", gap: 14 }}>
                {[["Submitted", C.indigo], ["Approved", C.green], ["Rejected", C.red]].map(([l, c]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: c }} /><span style={{ fontSize: 10, color: C.g500 }}>{l}</span></div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={decisionTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.indigo} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={C.indigo} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="adminGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.green} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.g100} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: C.g400 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.g400 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${C.g200}` }} />
                <Area type="monotone" dataKey="submitted" stroke={C.indigo} strokeWidth={2} fill="url(#adminGrad1)" name="Submitted" />
                <Area type="monotone" dataKey="approved"  stroke={C.green} strokeWidth={2} fill="url(#adminGrad2)" name="Approved" />
                <Line type="monotone" dataKey="rejected"  stroke={C.red} strokeWidth={1.5} dot={false} name="Rejected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Approval Flow Funnel */}
          <div style={{ background: C.g50, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.g800, marginBottom: 14 }}>Approval Flow</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {approvalFlow.map((s) => (
                <div key={s.stage}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: C.g600 }}>{s.stage}</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.g400 }}>{s.pct}%</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.g800 }}>{s.count}</span>
                    </div>
                  </div>
                  <div style={{ height: 7, background: C.g200, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Dept Comparison + User Growth + System Usage */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr", gap: 16 }}>
          {/* Department Comparison */}
          <div style={{ background: C.g50, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.g800, marginBottom: 14 }}>Department Comparison</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={deptData} margin={{ top: 0, right: 4, left: -24, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.g100} />
                <XAxis dataKey="dept" tick={{ fontSize: 9, fill: C.g400 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: C.g400 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: `1px solid ${C.g200}` }} />
                <Bar dataKey="decisions" fill={C.indigo} name="Total" radius={[3, 3, 0, 0]} />
                <Bar dataKey="approved"  fill={C.green} name="Approved" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Growth */}
          <div style={{ background: C.g50, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.g800, marginBottom: 14 }}>Monthly Activity</div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={userGrowth} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.g100} />
                <XAxis dataKey="m" tick={{ fontSize: 10, fill: C.g400 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: C.g400 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: `1px solid ${C.g200}` }} />
                <Line type="monotone" dataKey="users" stroke={C.purple} strokeWidth={2} dot={{ r: 3, fill: C.purple }} name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* System Usage Donut-style */}
          <div style={{ background: C.g50, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.g800, marginBottom: 12 }}>System Usage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {systemUsage.map((s) => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 10, color: C.g600 }}>{s.name}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: C.g800 }}>{s.value}%</span>
                  </div>
                  <div style={{ height: 5, background: C.g200, borderRadius: 3 }}>
                    <div style={{ width: `${s.value}%`, height: "100%", background: s.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
            {/* System health mini row */}
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.g200}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.g600, marginBottom: 8 }}>System Health</div>
              {sysHealth.map((s) => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: C.g500 }}>{s.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle: Audit Logs | New Users | Security Events | Admin Tasks ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 16, marginBottom: 18 }}>

        {/* Recent Audit Logs */}
        <div style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.g900 }}>Recent Audit Logs</div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {auditLogs.map((log, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 10px", background: C.g50, borderRadius: 8, border: `1px solid ${C.g100}` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: severityCol(log.severity), marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.g800, marginBottom: 1, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{log.action}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 10, color: C.g500 }}>{log.user}</span>
                    <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                    <span style={{ fontSize: 10, color: C.g400 }}>{log.module}</span>
                    <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                    <span style={{ fontSize: 10, color: C.g400 }}>{log.time}</span>
                  </div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, color: severityCol(log.severity), background: severityBg(log.severity), padding: "2px 6px", borderRadius: 8, flexShrink: 0 }}>{log.severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New User Registrations */}
        <div style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.g900 }}>New Registrations</div>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {newUsers.map((u, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white", flexShrink: 0 }}>{u.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.g800 }}>{u.name}</div>
                  <div style={{ fontSize: 10, color: C.g500 }}>{u.role} · {u.dept}</div>
                  <div style={{ fontSize: 10, color: C.g400, marginTop: 1 }}>{u.joined}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Security Events */}
        <div style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.g900 }}>Security Events</div>
            <div style={{ width: 22, height: 22, background: C.redL, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}><Lock size={11} color={C.red} /></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {securityEvents.map((ev, i) => {
              const Icon = ev.icon;
              return (
                <div key={i} style={{ padding: "8px 10px", borderRadius: 8, background: `${ev.color}0d`, border: `1px solid ${ev.color}22` }}>
                  <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                    <Icon size={13} color={ev.color} style={{ marginTop: 1, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.g800, lineHeight: 1.3, marginBottom: 3 }}>{ev.msg}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: ev.color, textTransform: "uppercase" as const }}>{ev.level}</span>
                        <span style={{ fontSize: 9, color: C.g400 }}>{ev.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Admin Tasks */}
        <div style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.g900 }}>Admin Tasks</div>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {adminTasks.map((task, i) => {
              const Icon = task.icon;
              return (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "8px 10px", background: C.g50, borderRadius: 8, border: `1px solid ${C.g100}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${task.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={13} color={task.color} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.g800, lineHeight: 1.35, marginBottom: 4 }}>{task.title}</div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: priorityCol(task.priority), background: priorityBg(task.priority), padding: "1px 6px", borderRadius: 8 }}>{task.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Organization Decision Table ──────────────────────── */}
      <div style={{ background: "white", borderRadius: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 18 }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.g900 }}>Organization Decision Table</div>
            <div style={{ fontSize: 11, color: C.g400, marginTop: 2 }}>All decisions across the organization</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 7, padding: "6px 12px" }}>
              <Filter size={12} color={C.g500} /><span style={{ fontSize: 11, color: C.g600 }}>Filter</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 7, padding: "6px 12px", cursor: "pointer" }}>
              <Download size={12} color={C.g500} /><span style={{ fontSize: 11, color: C.g600 }}>Export</span>
            </div>
            <button style={{ fontSize: 11, color: C.blue, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.g50 }}>
              {["Decision", "Department", "Status", "Approver", "Created Date", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 10, fontWeight: 700, color: C.g500, textAlign: "left" as const, textTransform: "uppercase" as const, letterSpacing: "0.06em", whiteSpace: "nowrap" as const }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orgDecisions.map((dec) => (
              <tr key={dec.id} style={{ borderTop: `1px solid ${C.g100}`, cursor: "pointer" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 2 }}>{dec.title}</div>
                  <div style={{ fontSize: 10, color: C.g400, fontFamily: "monospace" }}>{dec.id}</div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueL, padding: "3px 8px", borderRadius: 12 }}>{dec.dept}</span>
                </td>
                <td style={{ padding: "12px 16px" }}><SBadge s={dec.status} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white" }}>{dec.approver.split(" ").map(n => n[0]).join("")}</div>
                    <span style={{ fontSize: 12, color: C.g600 }}>{dec.approver}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: C.g500, whiteSpace: "nowrap" as const }}>{dec.created}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Eye size={13} color={C.g500} /></button>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Edit3 size={13} color={C.g500} /></button>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><MoreHorizontal size={13} color={C.g500} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Quick Actions (6 buttons) ─────────────────────────── */}
      <div style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 14 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
          {([
            [Users,    "Add User",         C.blue,   C.blueL  ],
            [Shield,   "Manage Roles",     C.purple, C.purpleL],
            [GitBranch,"Manage Teams",     C.teal,   C.tealL  ],
            [Database, "View Audit Logs",  C.red,    C.redL   ],
            [BarChart2,"Open Reports",     C.indigo, C.indigoL],
            [Settings, "System Settings",  C.g600,   C.g100   ],
          ] as const).map(([Icon, label, col, bg]: any) => (
            <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, padding: "16px 10px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", cursor: "pointer" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={col} /></div>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.g700, textAlign: "center" as const, lineHeight: 1.3 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

    </AdminAppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 3b: EMPLOYEE / REVIEWER DASHBOARD
// ══════════════════════════════════════════════════════════════════
export function EmployeeReviewerDashboardScreen() {
  const decisions = [
    { id: "DEC-3142", title: "Cloud Infrastructure Migration Strategy", category: "Technology", updated: "2 hours ago", status: "Pending", reviewer: "Dr. A. Rivera", priority: "High" },
    { id: "DEC-3138", title: "Remote Work Policy Revision Q1 2026", category: "HR Policy", updated: "5 hours ago", status: "Review", reviewer: "M. Johnson", priority: "Medium" },
    { id: "DEC-3135", title: "Q1 Budget Allocation — Engineering Team", category: "Finance", updated: "1 day ago", status: "Approved", reviewer: "S. Chen", priority: "High" },
    { id: "DEC-3129", title: "New Vendor Onboarding Process", category: "Procurement", updated: "2 days ago", status: "Draft", reviewer: "L. Park", priority: "Low" },
    { id: "DEC-3121", title: "Security Compliance Framework Update", category: "Security", updated: "3 days ago", status: "Approved", reviewer: "T. Wright", priority: "Critical" },
  ];

  const tasks = [
    { id: 1, type: "Review Request", title: "Remote Work Policy Revision Q1 2026", deadline: "Today, 5:00 PM", icon: FileCheck, color: C.amber },
    { id: 2, type: "Document Update", title: "Security Compliance Framework — Attachments needed", deadline: "Tomorrow", icon: Upload, color: C.blue },
    { id: 3, type: "Approval Pending", title: "Product Roadmap Q1 2026 — Awaiting reviewer feedback", deadline: "Jan 13, 2026", icon: CheckSquare, color: C.purple },
    { id: 4, type: "Comment Reply", title: "Employee Benefits Package — Respond to discussion", deadline: "Jan 14, 2026", icon: MessageSquare, color: C.indigo },
    { id: 5, type: "Draft Completion", title: "Complete New Vendor Onboarding decision draft", deadline: "Jan 15, 2026", icon: Edit3, color: C.g500 },
  ];

  const notifications = [
    { id: 1, type: "Review Request", msg: "Dr. A. Rivera requested your review on Cloud Infrastructure Migration", time: "5 min ago", icon: Eye, color: C.blue },
    { id: 2, type: "Mention", msg: "Sarah Chen mentioned you in Q1 Budget Allocation discussion", time: "1 hour ago", icon: Star, color: C.purple },
    { id: 3, type: "Status Update", msg: "Your decision 'Security Compliance Framework' has been approved", time: "2 hours ago", icon: CheckSquare, color: C.green },
    { id: 4, type: "Comment", msg: "New comment on Remote Work Policy Revision", time: "3 hours ago", icon: MessageSquare, color: C.indigo },
    { id: 5, type: "Reminder", msg: "Document upload required for Security Compliance Framework", time: "4 hours ago", icon: Clock, color: C.amber },
    { id: 6, type: "Approval", msg: "Your decision DEC-3135 moved to approval stage", time: "5 hours ago", icon: ArrowRight, color: C.blue },
  ];

  const activities = [
    { id: 1, action: "submitted", title: "Cloud Infrastructure Migration Strategy", user: "You", time: "2 hours ago", icon: Send, color: C.blue },
    { id: 2, action: "commented on", title: "Remote Work Policy Revision Q1 2026", user: "You", time: "5 hours ago", icon: MessageSquare, color: C.purple },
    { id: 3, action: "approved", title: "Q1 Budget Allocation — Engineering Team", user: "Sarah Chen", time: "1 day ago", icon: CheckSquare, color: C.green },
    { id: 4, action: "updated", title: "New Vendor Onboarding Process", user: "You", time: "2 days ago", icon: Edit3, color: C.amber },
    { id: 5, action: "reviewed", title: "Security Compliance Framework Update", user: "Dr. M. Lee", time: "3 days ago", icon: Eye, color: C.indigo },
  ];

  return (
    <AppLayout active="dashboard" title="Employee / Reviewer Dashboard" breadcrumb={["Home", "Employee / Reviewer Dashboard"]}>
      {/* Role identity accent — Blue: task-focused employee view */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: `1px solid ${C.g100}`, borderRadius: 12, padding: "12px 18px", marginBottom: 20, boxShadow: "0 1px 4px rgba(37,99,235,0.07)" }}>
        <div style={{ width: 4, height: 36, background: `linear-gradient(180deg,${C.blue},#3B82F6)`, borderRadius: 2, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.g900 }}>Employee / Reviewer Dashboard</div>
          <div style={{ fontSize: 11, color: C.g400, marginTop: 1 }}>Your personal workspace — decisions, tasks and reviews assigned to you.</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: C.blueL, border: `1px solid ${C.blueMid}`, borderRadius: 8, padding: "5px 12px" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.blue }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>Employee · Reviewer</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
        {[[FileText, "My Decisions", "23", "Total active", C.blue, C.blueL], [Edit3, "Draft Decisions", "5", "In progress", C.amber, C.amberL], [Clock, "Pending Reviews", "8", "Awaiting review", C.purple, C.purpleL], [CheckSquare, "Approved Decisions", "12", "This month", C.green, C.greenL]].map(([Icon, label, val, desc, col, bg]: any) => (
          <div key={label} style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}`, cursor: "pointer", transition: "transform 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${col}22` }}><Icon size={24} color={col} /></div>
              <ArrowRight size={18} color={C.g300} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.g900, letterSpacing: "-0.03em", marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.g700, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 12, color: C.g400 }}>{desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><div style={{ fontSize: 17, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>My Pending Tasks</div><div style={{ fontSize: 13, color: C.g400, marginTop: 2 }}>Tasks and actions requiring your attention</div></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View All →</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tasks.map((task) => { const Icon = task.icon; return (
            <div key={task.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 12, padding: "14px 16px", background: C.g50, cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${task.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={18} color={task.color} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: task.color, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: 4 }}>{task.type}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.g800, marginBottom: 6, lineHeight: 1.3 }}>{task.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} color={C.g400} /><span style={{ fontSize: 12, color: C.g500 }}>{task.deadline}</span></div>
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><div style={{ fontSize: 17, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Notifications</div><div style={{ fontSize: 13, color: C.g400, marginTop: 2 }}>Latest updates and alerts</div></div>
          <div style={{ position: "relative" }}><Bell size={20} color={C.g400} /><div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: C.red, borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>6</span></div></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {notifications.map((notif) => { const Icon = notif.icon; return (
            <div key={notif.id} style={{ padding: "12px 14px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g100}`, cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${notif.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={15} color={notif.color} /></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 700, color: notif.color, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 3 }}>{notif.type}</div><div style={{ fontSize: 13, color: C.g700, lineHeight: 1.4, marginBottom: 4 }}>{notif.msg}</div><div style={{ fontSize: 11, color: C.g400 }}>{notif.time}</div></div>
              </div>
            </div>
          );})}
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div><div style={{ fontSize: 17, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Activities</div><div style={{ fontSize: 13, color: C.g400, marginTop: 2 }}>Your activity timeline</div></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View All →</span>
        </div>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {activities.map((activity, index) => { const Icon = activity.icon; const isLast = index === activities.length - 1; return (
            <div key={activity.id} style={{ position: "relative", paddingBottom: isLast ? 0 : 24 }}>
              {!isLast && <div style={{ position: "absolute", left: -24, top: 40, width: 2, height: "calc(100% - 16px)", background: C.g200 }} />}
              <div style={{ position: "absolute", left: -32, top: 0, width: 32, height: 32, borderRadius: "50%", background: `${activity.color}18`, border: `2px solid ${activity.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={14} color={activity.color} /></div>
              <div style={{ background: C.g50, border: `1px solid ${C.g100}`, borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 14, color: C.g800, marginBottom: 4 }}><span style={{ fontWeight: 700, color: activity.user === "You" ? C.blue : C.g800 }}>{activity.user}</span><span style={{ color: C.g600 }}> {activity.action} </span><span style={{ fontWeight: 600, color: C.g800 }}>{activity.title}</span></div>
                <div style={{ fontSize: 12, color: C.g400 }}>{activity.time}</div>
              </div>
            </div>
          );})}
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}`, marginBottom: 24 }}>
        <div style={{ padding: "20px 26px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ fontSize: 17, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Decisions</div><div style={{ fontSize: 13, color: C.g400, marginTop: 2 }}>Your recent decision submissions</div></div>
          <button style={{ fontSize: 13, color: C.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: C.g50 }}>{["Decision", "Category", "Reviewer", "Status", "Priority", "Last Updated", "Actions"].map(h => <th key={h} style={{ padding: "13px 26px", fontSize: 11, fontWeight: 700, color: C.g500, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>)}</tr></thead>
            <tbody>{decisions.map((dec) => (
              <tr key={dec.id} style={{ borderTop: `1px solid ${C.g100}`, transition: "background 0.2s", cursor: "pointer" }}>
                <td style={{ padding: "16px 26px" }}><div style={{ fontSize: 14, fontWeight: 600, color: C.g800, marginBottom: 3 }}>{dec.title}</div><div style={{ fontSize: 12, color: C.g400, fontFamily: "monospace" }}>{dec.id}</div></td>
                <td style={{ padding: "16px 26px" }}><span style={{ fontSize: 12, fontWeight: 600, color: C.blue, background: C.blueL, padding: "4px 10px", borderRadius: 16 }}>{dec.category}</span></td>
                <td style={{ padding: "16px 26px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 700 }}>{dec.reviewer.split(" ").map(n => n[0]).join("")}</div><span style={{ fontSize: 13, color: C.g600 }}>{dec.reviewer}</span></div></td>
                <td style={{ padding: "16px 26px" }}><SBadge s={dec.status} /></td>
                <td style={{ padding: "16px 26px" }}><span style={{ fontSize: 12, fontWeight: 600, color: dec.priority === "Critical" ? C.red : dec.priority === "High" ? C.amber : dec.priority === "Medium" ? C.blue : C.g500, background: dec.priority === "Critical" ? C.redL : dec.priority === "High" ? C.amberL : dec.priority === "Medium" ? C.blueL : C.g100, padding: "4px 11px", borderRadius: 20 }}>{dec.priority}</span></td>
                <td style={{ padding: "16px 26px", fontSize: 13, color: C.g500 }}>{dec.updated}</td>
                <td style={{ padding: "16px 26px" }}><div style={{ display: "flex", gap: 8 }}><button style={{ padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><Eye size={15} color={C.g500} /></button><button style={{ padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><MoreHorizontal size={15} color={C.g500} /></button></div></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}` }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 18 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[[PlusCircle, "Create Decision", C.blue, C.blueL], [Search, "Search Decisions", C.purple, C.purpleL], [Upload, "Upload Document", C.green, C.greenL], [BookOpen, "Knowledge Repository", C.indigo, C.indigoL]].map(([Icon, label, col, bg]: any) => (
            <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "20px 16px", border: `1px solid ${C.g200}`, borderRadius: 12, background: "white", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${col}22` }}><Icon size={22} color={col} /></div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.g800, textAlign: "center" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 3c: MANAGER DASHBOARD
// ══════════════════════════════════════════════════════════════════
const MGR_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "team-decisions", label: "Team Decisions", Icon: FileText },
  { id: "pending-approvals", label: "Pending Approvals", Icon: CheckSquare, badge: 7 },
  { id: "discussions", label: "Discussion Module", Icon: MessageSquare },
  { id: "knowledge", label: "Knowledge Repository", Icon: BookOpen },
  { id: "reports", label: "Reports", Icon: BarChart2 },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "profile", label: "Profile", Icon: Users },
  { id: "settings", label: "Settings", Icon: Settings },
];

function ManagerSidebar({ active }: { active: string }) {
  return (
    <div style={{ width: 240, height: "100%", background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "28px 20px 22px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={21} color="white" />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>EDRP</div>
            <div style={{ color: C.g400, fontSize: 11 }}>Decision Platform</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "14px 10px", overflow: "hidden" }}>
        {MGR_NAV_ITEMS.map(({ id, label, Icon, badge }: any) => {
          const on = active === id;
          return (
            <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, marginBottom: 2, background: on ? C.teal : "transparent" }}>
              <Icon size={16} color={on ? "white" : C.g400} />
              <span style={{ fontSize: 13, fontWeight: on ? 600 : 400, color: on ? "white" : C.g400, flex: 1 }}>{label}</span>
              {badge && <span style={{ background: C.red, color: "white", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10 }}>{badge}</span>}
            </div>
          );
        })}
      </nav>
      <div style={{ padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>MR</span>
          </div>
          <div>
            <div style={{ color: "white", fontSize: 13, fontWeight: 500 }}>M. Rodriguez</div>
            <div style={{ color: C.g400, fontSize: 11 }}>Manager</div>
          </div>
          <LogOut size={15} color={C.g400} style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </div>
  );
}

function ManagerAppLayout({ active, title, breadcrumb, children }: any) {
  return (
    <div style={{ width: FW, height: FH, display: "flex", background: C.g50, fontFamily: "'Inter',-apple-system,sans-serif", overflow: "hidden" }}>
      <ManagerSidebar active={active} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopNav title={title} breadcrumb={breadcrumb} />
        <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>{children}</div>
      </div>
    </div>
  );
}

export function ManagerDashboardScreen() {
  const teamDecisions = [
    { id: "DEC-3150", title: "Cloud Infrastructure Migration Strategy", dept: "Technology", submittedBy: "J. Doe", reviewer: "Dr. A. Rivera", priority: "High", status: "Pending", deadline: "Jan 14, 2026" },
    { id: "DEC-3147", title: "Remote Work Policy Revision Q1 2026", dept: "HR Policy", submittedBy: "S. Chen", reviewer: "M. Johnson", priority: "Medium", status: "Review", deadline: "Jan 16, 2026" },
    { id: "DEC-3143", title: "Q1 Budget Allocation — Engineering", dept: "Finance", submittedBy: "L. Park", reviewer: "Unassigned", priority: "High", status: "Draft", deadline: "Jan 18, 2026" },
    { id: "DEC-3139", title: "New Vendor Onboarding Process", dept: "Procurement", submittedBy: "T. Wright", reviewer: "S. Chen", priority: "Low", status: "Approved", deadline: "Jan 20, 2026" },
    { id: "DEC-3135", title: "Security Compliance Framework Update", dept: "Security", submittedBy: "A. Patel", reviewer: "Dr. M. Lee", priority: "Critical", status: "Pending", deadline: "Jan 22, 2026" },
  ];

  const approvalQueue = [
    { id: 1, title: "Cloud Infrastructure Migration Strategy", submittedBy: "J. Doe", dept: "Technology", priority: "High", waiting: "2 days", icon: FileText, color: C.blue },
    { id: 2, title: "Security Compliance Framework Update", submittedBy: "A. Patel", dept: "Security", priority: "Critical", waiting: "1 day", icon: Shield, color: C.red },
    { id: 3, title: "Remote Work Policy Revision Q1 2026", submittedBy: "S. Chen", dept: "HR Policy", priority: "Medium", waiting: "3 hours", icon: FileCheck, color: C.amber },
    { id: 4, title: "Q2 Marketing Budget Proposal", submittedBy: "R. Kim", dept: "Marketing", priority: "Medium", waiting: "5 hours", icon: BarChart2, color: C.purple },
  ];

  const escalations = [
    { id: "DEC-3135", title: "Security Compliance Framework Update", reason: "Awaiting senior sign-off — deadline in 2 days", priority: "Critical", color: C.red, bg: C.redL },
    { id: "DEC-3150", title: "Cloud Infrastructure Migration Strategy", reason: "Reviewer unresponsive for 48 hours", priority: "High", color: C.amber, bg: C.amberL },
    { id: "DEC-3143", title: "Q1 Budget Allocation — Engineering", reason: "No reviewer assigned — submission blocked", priority: "High", color: C.amber, bg: C.amberL },
  ];

  const awaitingReview = teamDecisions.filter(d => d.status === "Draft" || d.reviewer === "Unassigned" || d.status === "Review");

  const teamActivities = [
    { id: 1, action: "submitted", title: "Cloud Infrastructure Migration Strategy", user: "J. Doe", time: "2 hours ago", icon: Send, color: C.blue },
    { id: 2, action: "commented on", title: "Remote Work Policy Revision Q1 2026", user: "S. Chen", time: "4 hours ago", icon: MessageSquare, color: C.purple },
    { id: 3, action: "requested review for", title: "Q2 Marketing Budget Proposal", user: "R. Kim", time: "6 hours ago", icon: Eye, color: C.amber },
    { id: 4, action: "updated", title: "New Vendor Onboarding Process", user: "T. Wright", time: "1 day ago", icon: Edit3, color: C.green },
    { id: 5, action: "escalated", title: "Security Compliance Framework Update", user: "A. Patel", time: "1 day ago", icon: AlertTriangle, color: C.red },
  ];

  // Approval progress data — teal accent for in-review
  const approvalStages = [
    { label: "Submitted", count: 31, pct: 100, color: C.g300 },
    { label: "In Review", count: 18, pct: 58, color: C.teal },
    { label: "Approved", count: 11, pct: 35, color: C.green },
    { label: "Pending You", count: 7, pct: 23, color: C.amber },
  ];

  // Team workload data — teal scale
  const workload = [
    { name: "J. Doe",    decisions: 6, color: C.teal   },
    { name: "S. Chen",   decisions: 5, color: "#0D9488" },
    { name: "A. Patel",  decisions: 4, color: "#0F766E" },
    { name: "R. Kim",    decisions: 3, color: "#14B8A6" },
    { name: "T. Wright", decisions: 2, color: "#5EEAD4" },
  ];

  const priorityCol = (p: string) => p === "Critical" ? C.red : p === "High" ? C.amber : p === "Medium" ? C.blue : C.g500;
  const priorityBg  = (p: string) => p === "Critical" ? C.redL : p === "High" ? C.amberL : p === "Medium" ? C.blueL : C.g100;

  const discussions = [
    { id: 1, title: "Cloud Infrastructure Migration — Technical Concerns", replies: 12, participants: 4, lastActive: "30 min ago", unread: 3, color: C.teal },
    { id: 2, title: "Remote Work Policy — HR Guidelines Discussion", replies: 8, participants: 6, lastActive: "2 hours ago", unread: 1, color: C.blue },
    { id: 3, title: "Q1 Budget Allocation — Finance Review Thread", replies: 5, participants: 3, lastActive: "5 hours ago", unread: 0, color: C.purple },
    { id: 4, title: "Security Compliance — Stakeholder Alignment", replies: 9, participants: 5, lastActive: "1 day ago", unread: 2, color: C.amber },
  ];

  return (
    <ManagerAppLayout active="dashboard" title="Manager Dashboard" breadcrumb={["Home", "Manager Dashboard"]}>

      {/* Role identity accent — Teal: team supervision view */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "white", border: `1px solid ${C.g100}`, borderRadius: 12, padding: "12px 18px", marginBottom: 20, boxShadow: "0 1px 4px rgba(20,184,166,0.07)" }}>
        <div style={{ width: 4, height: 36, background: `linear-gradient(180deg,${C.teal},#2DD4BF)`, borderRadius: 2, flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.g900 }}>Manager Dashboard</div>
          <div style={{ fontSize: 11, color: C.g400, marginTop: 1 }}>Team supervision — approvals, decisions and discussions assigned to your team.</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: C.tealL, border: `1px solid ${C.teal}30`, borderRadius: 8, padding: "5px 12px" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.teal }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: C.teal }}>Manager</span>
        </div>
      </div>

      {/* ── Summary Cards ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 24 }}>
        {([
          [GitBranch, "Team Decisions",    "31", "+3 this week",      C.blue,   C.blueL],
          [CheckSquare,"Pending Approvals","7",  "Requires action",   C.amber,  C.amberL],
          [MessageSquare,"Active Discussions","14","Ongoing threads",  C.purple, C.purpleL],
          [Users,      "Team Members",     "12", "In your team",      C.green,  C.greenL],
        ] as const).map(([Icon, label, val, desc, col, bg]: any) => (
          <div key={label} style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={22} color={col} /></div>
              <ArrowRight size={16} color={C.g300} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.g900, letterSpacing: "-0.03em", marginBottom: 3 }}>{val}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.g700, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: C.g400 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* ── Left + Right: Approval Queue | Escalated Decisions ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, marginBottom: 20 }}>

        {/* LEFT: Pending Approval Queue */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Pending Approval Queue</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Decisions awaiting your action</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer", letterSpacing: "0.01em" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {approvalQueue.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "12px 14px", background: C.g50, display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={16} color={item.color} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 3, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: C.g500 }}>{item.submittedBy}</span>
                      <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                      <span style={{ fontSize: 11, color: C.g500 }}>{item.dept}</span>
                      <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                      <span style={{ fontSize: 11, color: C.amber, fontWeight: 600 }}>Waiting {item.waiting}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: priorityCol(item.priority), background: priorityBg(item.priority), padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>{item.priority}</span>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button style={{ padding: "6px 14px", background: C.teal, color: "white", border: "none", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Approve</button>
                    <button style={{ padding: "6px 12px", border: `1px solid ${C.g200}`, background: "white", borderRadius: 7, fontSize: 11, fontWeight: 600, color: C.g600, cursor: "pointer" }}>Review</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Escalated Decisions */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Escalated Decisions</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Needs immediate attention</div>
            </div>
            <div style={{ width: 26, height: 26, background: C.redL, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><AlertTriangle size={13} color={C.red} /></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {escalations.map((e) => (
              <div key={e.id} style={{ padding: "12px 14px", borderRadius: 10, background: e.bg, border: `1px solid ${e.color}28` }}>
                <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <AlertTriangle size={14} color={e.color} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.g800, marginBottom: 3, lineHeight: 1.3 }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: C.g600, lineHeight: 1.4, marginBottom: 8 }}>{e.reason}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button style={{ padding: "4px 12px", background: e.color, color: "white", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Act Now</button>
                      <span style={{ fontSize: 10, color: C.g400, fontFamily: "monospace" }}>{e.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Middle: Team Decisions Awaiting Review ──────────────── */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Team Decisions Awaiting Review</div>
            <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Decisions that need a reviewer assigned or are in active review</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.teal, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {awaitingReview.map((dec) => (
            <div key={dec.id} style={{ padding: "14px 16px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g200}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontFamily: "monospace", color: C.g400 }}>{dec.id}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: priorityCol(dec.priority), background: priorityBg(dec.priority), padding: "2px 7px", borderRadius: 12 }}>{dec.priority}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 6, lineHeight: 1.35 }}>{dec.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: C.blue, background: C.blueL, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{dec.dept}</span>
                <span style={{ fontSize: 11, color: C.g500 }}>· {dec.submittedBy}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: dec.reviewer === "Unassigned" ? C.red : C.g500, fontWeight: dec.reviewer === "Unassigned" ? 700 : 400 }}>
                  {dec.reviewer === "Unassigned" ? "⚠ No reviewer" : dec.reviewer}
                </span>
                <SBadge s={dec.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Visualizations: Approval Progress + Team Workload ───── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

        {/* Approval Progress */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 4 }}>Approval Progress</div>
          <div style={{ fontSize: 12, color: C.g400, marginBottom: 20 }}>Current pipeline status across all team decisions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {approvalStages.map((s) => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: C.g600, fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>{s.count}</span>
                </div>
                <div style={{ height: 8, background: C.g100, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: s.color, borderRadius: 4, transition: "width 0.4s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Workload */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 4 }}>Team Workload</div>
          <div style={{ fontSize: 12, color: C.g400, marginBottom: 20 }}>Active decisions assigned per team member</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {workload.map((w) => (
              <div key={w.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${w.color}20`, border: `2px solid ${w.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: w.color, flexShrink: 0 }}>{w.name.split(" ").map(n => n[0]).join("")}</div>
                <span style={{ fontSize: 13, color: C.g700, width: 72, flexShrink: 0 }}>{w.name}</span>
                <div style={{ flex: 1, height: 8, background: C.g100, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(w.decisions / 6) * 100}%`, height: "100%", background: w.color, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.g800, width: 24, textAlign: "right" as const }}>{w.decisions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Team Activities + Discussion Updates ──────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, marginBottom: 20 }}>

        {/* Recent Team Activities Timeline */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Team Activities</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Live activity timeline from your team</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.teal, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            {teamActivities.map((activity, index) => {
              const Icon = activity.icon;
              const isLast = index === teamActivities.length - 1;
              return (
                <div key={activity.id} style={{ position: "relative", paddingBottom: isLast ? 0 : 20 }}>
                  {!isLast && <div style={{ position: "absolute", left: -24, top: 36, width: 2, height: "calc(100% - 12px)", background: C.g100 }} />}
                  <div style={{ position: "absolute", left: -32, top: 0, width: 30, height: 30, borderRadius: "50%", background: `${activity.color}15`, border: `2px solid ${activity.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={13} color={activity.color} /></div>
                  <div style={{ background: C.g50, border: `1px solid ${C.g100}`, borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 13, color: C.g800, marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, color: C.teal }}>{activity.user}</span>
                      <span style={{ color: C.g500 }}> {activity.action} </span>
                      <span style={{ fontWeight: 600, color: C.g700 }}>{activity.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.g400 }}>{activity.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discussion Updates */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Discussion Updates</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Active threads in your team</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.teal, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {discussions.map((d) => (
              <div key={d.id} style={{ padding: "12px 14px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g100}`, cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: `${d.color}15`, border: `1.5px solid ${d.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageSquare size={14} color={d.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.g800, lineHeight: 1.35, marginBottom: 6 }}>{d.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageSquare size={10} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{d.replies}</span></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={10} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{d.participants}</span></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}><Clock size={10} color={C.g400} /><span style={{ fontSize: 10, color: C.g400 }}>{d.lastActive}</span></div>
                    </div>
                  </div>
                  {d.unread > 0 && <span style={{ width: 18, height: 18, background: C.teal, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white", flexShrink: 0 }}>{d.unread}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team Decision Table ──────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Team Decision Table</div>
            <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>All decisions submitted by your team</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 8, padding: "7px 12px" }}>
              <Filter size={13} color={C.g500} /><span style={{ fontSize: 12, color: C.g600 }}>Filter</span>
            </div>
            <button style={{ fontSize: 12, color: C.blue, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.g50 }}>
              {["Decision Title", "Department", "Submitted By", "Assigned Reviewer", "Priority", "Status", "Deadline", "Actions"].map(h => (
                <th key={h} style={{ padding: "11px 16px", fontSize: 10, fontWeight: 700, color: C.g500, textAlign: "left" as const, textTransform: "uppercase" as const, letterSpacing: "0.06em", whiteSpace: "nowrap" as const }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teamDecisions.map((dec) => (
              <tr key={dec.id} style={{ borderTop: `1px solid ${C.g100}`, cursor: "pointer" }}>
                <td style={{ padding: "13px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 2 }}>{dec.title}</div>
                  <div style={{ fontSize: 10, color: C.g400, fontFamily: "monospace" }}>{dec.id}</div>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueL, padding: "3px 9px", borderRadius: 14 }}>{dec.dept}</span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700 }}>{dec.submittedBy.split(" ").map((n: string) => n[0]).join("")}</div>
                    <span style={{ fontSize: 12, color: C.g600 }}>{dec.submittedBy}</span>
                  </div>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 12, color: dec.reviewer === "Unassigned" ? C.red : C.g600, fontWeight: dec.reviewer === "Unassigned" ? 700 : 400 }}>{dec.reviewer}</span>
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: priorityCol(dec.priority), background: priorityBg(dec.priority), padding: "3px 9px", borderRadius: 18 }}>{dec.priority}</span>
                </td>
                <td style={{ padding: "13px 16px" }}><SBadge s={dec.status} /></td>
                <td style={{ padding: "13px 16px", fontSize: 12, color: C.g500, whiteSpace: "nowrap" as const }}>{dec.deadline}</td>
                <td style={{ padding: "13px 16px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Eye size={13} color={C.g500} /></button>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><UserCheck size={13} color={C.g500} /></button>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><MoreHorizontal size={13} color={C.g500} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Quick Actions ────────────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 16 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {([
            [CheckSquare, "Approve Decision",    C.blue,   C.blueL],
            [UserCheck,   "Assign Reviewer",     C.green,  C.greenL],
            [MessageSquare,"Create Discussion",  C.purple, C.purpleL],
            [BarChart2,   "Generate Team Report",C.indigo, C.indigoL],
          ] as const).map(([Icon, label, col, bg]: any) => (
            <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "18px 14px", border: `1px solid ${C.g200}`, borderRadius: 12, background: "white", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} color={col} /></div>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.g800, textAlign: "center" as const, lineHeight: 1.3 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

    </ManagerAppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// DECISION MANAGEMENT DASHBOARD
// ══════════════════════════════════════════════════════════════════
function DecisionManagementDashboardScreen() {
  const recentDecisions = [
    { id: "DEC-3150", title: "Cloud Infrastructure Migration Strategy", category: "Technology", updated: "2 hours ago", status: "Pending",  reviewer: "Dr. A. Rivera", priority: "High"     },
    { id: "DEC-3147", title: "Remote Work Policy Revision Q1 2026",     category: "HR Policy",  updated: "5 hours ago", status: "Review",   reviewer: "M. Johnson",    priority: "Medium"   },
    { id: "DEC-3143", title: "Q1 Budget Allocation — Engineering",       category: "Finance",    updated: "1 day ago",   status: "Approved", reviewer: "S. Chen",        priority: "High"     },
    { id: "DEC-3139", title: "New Vendor Onboarding Process",            category: "Procurement",updated: "2 days ago",  status: "Draft",    reviewer: "L. Park",        priority: "Low"      },
    { id: "DEC-3135", title: "Security Compliance Framework Update",     category: "Security",   updated: "3 days ago",  status: "Approved", reviewer: "T. Wright",      priority: "Critical" },
  ];

  const decisionQueue = [
    { id: 1, title: "Cloud Infrastructure Migration Strategy",     type: "Pending Review",   deadline: "Today, 5:00 PM",  icon: FileCheck,   color: C.amber,  priority: "High"     },
    { id: 2, title: "Security Compliance Framework Update",         type: "Approval Required",deadline: "Tomorrow",        icon: CheckSquare,  color: C.blue,   priority: "Critical" },
    { id: 3, title: "Product Roadmap Q1 2026",                     type: "Draft Completion", deadline: "Jan 13, 2026",   icon: Edit3,        color: C.purple, priority: "Medium"   },
    { id: 4, title: "Employee Benefits Package Revision",           type: "Comment Response", deadline: "Jan 14, 2026",   icon: MessageSquare,color: C.indigo, priority: "Medium"   },
  ];

  const pendingDecisions = [
    { id: "DEC-3150", title: "Cloud Infrastructure Migration Strategy", submittedBy: "J. Doe",   dept: "Technology",  daysWaiting: 3, priority: "High"     },
    { id: "DEC-3147", title: "Remote Work Policy Revision Q1 2026",     submittedBy: "S. Chen",  dept: "HR Policy",   daysWaiting: 1, priority: "Medium"   },
    { id: "DEC-3135", title: "Security Compliance Framework Update",     submittedBy: "A. Patel", dept: "Security",    daysWaiting: 5, priority: "Critical" },
    { id: "DEC-3128", title: "Q2 Marketing Budget Proposal",             submittedBy: "R. Kim",   dept: "Marketing",   daysWaiting: 2, priority: "Medium"   },
  ];

  const recentlyUpdated = [
    { id: "DEC-3143", title: "Q1 Budget Allocation — Engineering",  change: "Status changed to Approved",         by: "S. Chen",   time: "1 hour ago",   color: C.green  },
    { id: "DEC-3147", title: "Remote Work Policy Revision Q1 2026", change: "Reviewer comment added",             by: "M. Johnson",time: "3 hours ago",  color: C.blue   },
    { id: "DEC-3139", title: "New Vendor Onboarding Process",        change: "Document attachment uploaded",       by: "L. Park",   time: "6 hours ago",  color: C.purple },
    { id: "DEC-3150", title: "Cloud Infrastructure Migration",       change: "Submitted for review",               by: "J. Doe",    time: "Yesterday",    color: C.amber  },
  ];

  const categories = [
    { name: "Technology",   count: 42, active: 12, color: C.blue   },
    { name: "Finance",      count: 38, active: 9,  color: C.green  },
    { name: "HR Policy",    count: 31, active: 7,  color: C.purple },
    { name: "Security",     count: 24, active: 6,  color: C.red    },
    { name: "Procurement",  count: 19, active: 4,  color: C.amber  },
    { name: "Product",      count: 16, active: 3,  color: C.indigo },
  ];

  const notifications = [
    { id: 1, type: "Review Request",  msg: "Dr. A. Rivera requested review on Cloud Infrastructure Migration", time: "5 min ago",  icon: Eye,          color: C.blue   },
    { id: 2, type: "Status Update",   msg: "DEC-3143 approved by Sarah Chen — Q1 Budget Allocation",          time: "1 hour ago", icon: CheckSquare,  color: C.green  },
    { id: 3, type: "Comment",         msg: "New comment added on Remote Work Policy Revision",                 time: "2 hours ago",icon: MessageSquare,color: C.indigo },
    { id: 4, type: "Reminder",        msg: "Document upload required — Security Compliance Framework",         time: "4 hours ago",icon: Clock,        color: C.amber  },
    { id: 5, type: "Mention",         msg: "You were mentioned in Q1 Budget Allocation discussion",            time: "5 hours ago",icon: Star,         color: C.purple },
  ];

  const activities = [
    { id: 1, action: "submitted",    title: "Cloud Infrastructure Migration Strategy", user: "J. Doe",      time: "2 hours ago",  icon: Send,         color: C.blue   },
    { id: 2, action: "approved",     title: "Q1 Budget Allocation — Engineering",      user: "Sarah Chen",  time: "5 hours ago",  icon: CheckSquare,  color: C.green  },
    { id: 3, action: "commented on", title: "Remote Work Policy Revision Q1 2026",     user: "M. Johnson",  time: "1 day ago",    icon: MessageSquare,color: C.purple },
    { id: 4, action: "updated",      title: "New Vendor Onboarding Process",            user: "L. Park",     time: "2 days ago",   icon: Edit3,        color: C.amber  },
    { id: 5, action: "reviewed",     title: "Security Compliance Framework Update",     user: "T. Wright",   time: "3 days ago",   icon: Eye,          color: C.indigo },
  ];

  const priorityCol = (p: string) => p === "Critical" ? C.red : p === "High" ? C.amber : p === "Medium" ? C.blue : C.g500;
  const priorityBg  = (p: string) => p === "Critical" ? C.redL : p === "High" ? C.amberL : p === "Medium" ? C.blueL : C.g100;

  return (
    <AppLayout active="decisions" title="Decision Management" breadcrumb={["Home", "Decision Management"]}>

      {/* ── Decision Queue ────────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Decision Queue</div>
            <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Actions and decisions requiring your immediate attention</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {decisionQueue.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "12px 16px", background: C.g50, display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={17} color={item.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: item.color, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginBottom: 3 }}>{item.type}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 4, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{item.deadline}</span></div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: priorityCol(item.priority), background: priorityBg(item.priority), padding: "3px 9px", borderRadius: 18, flexShrink: 0 }}>{item.priority}</span>
                <button style={{ padding: "6px 14px", background: C.blue, color: "white", border: "none", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Open</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Two-column: Pending Decisions | Recent Notifications ── */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, marginBottom: 20 }}>

        {/* Pending Decisions */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Pending Decisions</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Awaiting review or approval</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pendingDecisions.map((dec) => (
              <div key={dec.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "12px 14px", background: C.g50, display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 4, lineHeight: 1.3 }}>{dec.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, color: C.g500 }}>By {dec.submittedBy}</span>
                    <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                    <span style={{ fontSize: 11, color: C.blue, background: C.blueL, padding: "1px 7px", borderRadius: 8, fontWeight: 600 }}>{dec.dept}</span>
                    <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                    <span style={{ fontSize: 11, color: dec.daysWaiting >= 3 ? C.red : C.amber, fontWeight: 600 }}>{dec.daysWaiting}d waiting</span>
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: priorityCol(dec.priority), background: priorityBg(dec.priority), padding: "3px 9px", borderRadius: 18, flexShrink: 0 }}>{dec.priority}</span>
                <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                  <button style={{ padding: "5px 9px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><Eye size={13} color={C.g500} /></button>
                  <button style={{ padding: "5px 9px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><MoreHorizontal size={13} color={C.g500} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Notifications</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Latest decision updates</div>
            </div>
            <div style={{ position: "relative" }}>
              <Bell size={18} color={C.g400} />
              <div style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, background: C.red, borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>5</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} style={{ padding: "10px 12px", borderRadius: 9, background: C.g50, border: `1px solid ${C.g100}`, cursor: "pointer" }}>
                  <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${notif.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={13} color={notif.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: notif.color, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginBottom: 2 }}>{notif.type}</div>
                      <div style={{ fontSize: 12, color: C.g700, lineHeight: 1.4, marginBottom: 3 }}>{notif.msg}</div>
                      <div style={{ fontSize: 10, color: C.g400 }}>{notif.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Two-column: Recently Updated | Decision Categories ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>

        {/* Recently Updated Decisions */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recently Updated</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Decisions with recent changes</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentlyUpdated.map((dec) => (
              <div key={dec.id} style={{ padding: "12px 14px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g100}`, cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${dec.color}18`, border: `2px solid ${dec.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <RefreshCw size={13} color={dec.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.g800, marginBottom: 3, lineHeight: 1.3 }}>{dec.title}</div>
                    <div style={{ fontSize: 11, color: C.g600, marginBottom: 3 }}>{dec.change}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 10, color: C.g500 }}>by {dec.by}</span>
                      <span style={{ fontSize: 10, color: C.g400 }}>·</span>
                      <span style={{ fontSize: 10, color: C.g400 }}>{dec.time}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 9, color: C.g400, fontFamily: "monospace", flexShrink: 0 }}>{dec.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Categories */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Decision Categories</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Decisions organized by department</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>Browse →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {categories.map((cat) => (
              <div key={cat.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9, background: C.g50, border: `1px solid ${C.g100}`, cursor: "pointer" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: C.g800, flex: 1 }}>{cat.name}</span>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 14, fontWeight: 900, color: C.g900, letterSpacing: "-0.02em" }}>{cat.count}</div>
                    <div style={{ fontSize: 10, color: C.g400 }}>total</div>
                  </div>
                  <div style={{ width: 1, height: 28, background: C.g200 }} />
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cat.color }}>{cat.active}</div>
                    <div style={{ fontSize: 10, color: C.g400 }}>active</div>
                  </div>
                </div>
                <ChevronRight size={14} color={C.g300} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Activities Timeline ────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Activities</div>
            <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Latest actions across all decisions</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const isLast = index === activities.length - 1;
            return (
              <div key={activity.id} style={{ position: "relative", paddingBottom: isLast ? 0 : 20 }}>
                {!isLast && <div style={{ position: "absolute", left: -24, top: 36, width: 2, height: "calc(100% - 12px)", background: C.g100 }} />}
                <div style={{ position: "absolute", left: -32, top: 0, width: 30, height: 30, borderRadius: "50%", background: `${activity.color}18`, border: `2px solid ${activity.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={13} color={activity.color} />
                </div>
                <div style={{ background: C.g50, border: `1px solid ${C.g100}`, borderRadius: 10, padding: "10px 14px" }}>
                  <div style={{ fontSize: 13, color: C.g800, marginBottom: 3 }}>
                    <span style={{ fontWeight: 700, color: C.blue }}>{activity.user}</span>
                    <span style={{ color: C.g500 }}> {activity.action} </span>
                    <span style={{ fontWeight: 600, color: C.g700 }}>{activity.title}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.g400 }}>{activity.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Recent Decisions Table ────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Decisions</div>
            <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>All recent decision submissions and updates</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 8, padding: "7px 12px" }}>
              <Filter size={13} color={C.g500} /><span style={{ fontSize: 12, color: C.g600 }}>Filter</span>
            </div>
            <button style={{ fontSize: 12, color: C.blue, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.g50 }}>
              {["Decision", "Category", "Reviewer", "Status", "Priority", "Last Updated", "Actions"].map(h => (
                <th key={h} style={{ padding: "11px 18px", fontSize: 10, fontWeight: 700, color: C.g500, textAlign: "left" as const, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentDecisions.map((dec) => (
              <tr key={dec.id} style={{ borderTop: `1px solid ${C.g100}`, cursor: "pointer" }}>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 2 }}>{dec.title}</div>
                  <div style={{ fontSize: 10, color: C.g400, fontFamily: "monospace" }}>{dec.id}</div>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueL, padding: "3px 9px", borderRadius: 14 }}>{dec.category}</span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700 }}>
                      {dec.reviewer.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span style={{ fontSize: 12, color: C.g600 }}>{dec.reviewer}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}><SBadge s={dec.status} /></td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: priorityCol(dec.priority), background: priorityBg(dec.priority), padding: "3px 9px", borderRadius: 18 }}>{dec.priority}</span>
                </td>
                <td style={{ padding: "14px 18px", fontSize: 12, color: C.g500 }}>{dec.updated}</td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Eye size={13} color={C.g500} /></button>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Edit3 size={13} color={C.g500} /></button>
                    <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><MoreHorizontal size={13} color={C.g500} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Quick Actions ─────────────────────────────────────── */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 16 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {([
            [PlusCircle, "Create Decision",      C.blue,   C.blueL  ],
            [Search,     "Search Decisions",     C.purple, C.purpleL],
            [Upload,     "Upload Documents",     C.green,  C.greenL ],
            [BookOpen,   "Knowledge Repository", C.indigo, C.indigoL],
          ] as const).map(([Icon, label, col, bg]: any) => (
            <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "20px 16px", border: `1px solid ${C.g200}`, borderRadius: 12, background: "white", cursor: "pointer" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${col}22` }}>
                <Icon size={22} color={col} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.g800, textAlign: "center" as const }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 4: MY DECISIONS
// ══════════════════════════════════════════════════════════════════
function MyDecisionsScreen() {
  const rows = [
    { t: "Q4 Technology Budget Allocation", cat: "Finance", p: "High", s: "Pending", d: "Dec 15", id: "DEC-2847" },
    { t: "Remote Work Policy Update 2025", cat: "HR Policy", p: "Medium", s: "Approved", d: "Dec 12", id: "DEC-2831" },
    { t: "Cloud Infrastructure Migration", cat: "Technology", p: "Critical", s: "Review", d: "Dec 10", id: "DEC-2820" },
    { t: "New Vendor Onboarding — Acme Corp", cat: "Procurement", p: "Low", s: "Draft", d: "Dec 8", id: "DEC-2811" },
    { t: "Product Roadmap Q1 2025", cat: "Product", p: "High", s: "Approved", d: "Dec 5", id: "DEC-2798" },
    { t: "Security Policy Enhancement v2", cat: "Security", p: "Critical", s: "Rejected", d: "Dec 2", id: "DEC-2780" },
  ];
  return (
    <AppLayout active="decisions" title="My Decisions" breadcrumb={["Home", "My Decisions"]}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px", width: 280 }}><Search size={15} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Search my decisions...</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }}><Filter size={14} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>Filter</span><ChevronDown size={13} color={C.g400} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px" }}><Calendar size={14} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>Date Range</span></div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: C.blue, color: "white", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}><Plus size={16} color="white" /> New Decision</button>
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        {["All (24)", "Draft (4)", "Pending (8)", "Review (3)", "Approved (7)", "Rejected (2)"].map((f, i) => (
          <span key={f} style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "white" : C.g600, background: i === 0 ? C.blue : "white", border: `1px solid ${i === 0 ? C.blue : C.g200}`, padding: "7px 16px", borderRadius: 20, cursor: "pointer" }}>{f}</span>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: C.g50 }}>{["ID", "Decision Title", "Category", "Priority", "Status", "Date", ""].map(h => <th key={h} style={{ padding: "12px 20px", fontSize: 11, fontWeight: 700, color: C.g500, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${C.g100}` }}>
              <td style={{ padding: "15px 20px", fontSize: 12, color: C.g400, fontFamily: "monospace" }}>{r.id}</td>
              <td style={{ padding: "15px 20px", fontSize: 14, color: C.g800, fontWeight: 500 }}>{r.t}</td>
              <td style={{ padding: "15px 20px", fontSize: 13, color: C.g500 }}>{r.cat}</td>
              <td style={{ padding: "15px 20px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: r.p === "Critical" ? C.red : r.p === "High" ? C.amber : r.p === "Medium" ? C.blue : C.g500, background: r.p === "Critical" ? C.redL : r.p === "High" ? C.amberL : r.p === "Medium" ? C.blueL : C.g100, padding: "3px 10px", borderRadius: 20 }}>{r.p}</span>
              </td>
              <td style={{ padding: "15px 20px" }}><SBadge s={r.s} /></td>
              <td style={{ padding: "15px 20px", fontSize: 13, color: C.g400 }}>{r.d}</td>
              <td style={{ padding: "15px 20px" }}><MoreHorizontal size={17} color={C.g400} /></td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{ padding: "14px 24px", borderTop: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.g400 }}>Showing 6 of 24 decisions</span>
          <div style={{ display: "flex", gap: 6 }}>
            {["←", "1", "2", "3", "→"].map(p => <button key={p} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${p === "1" ? C.blue : C.g200}`, background: p === "1" ? C.blue : "white", color: p === "1" ? "white" : C.g600, fontSize: 13, cursor: "pointer" }}>{p}</button>)}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN 5: DECISION DETAIL
// ══════════════════════════════════════════════════════════════════
function DecisionDetailScreen() {
  return (
    <AppLayout active="decisions" title="Decision Details" breadcrumb={["Home", "My Decisions", "DEC-2847"]}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <SBadge s="Pending" /><span style={{ fontSize: 13, color: C.g500 }}>DEC-2847 · Submitted Dec 15, 2024</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1px solid ${C.g200}`, borderRadius: 9, background: "white", fontSize: 13, color: C.g700, cursor: "pointer" }}><Edit3 size={14} /> Edit</button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "none", borderRadius: 9, background: C.blue, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Send size={14} /> Send Reminder</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Q4 Technology Budget Allocation</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              {[["Finance", C.blueL, C.blue], ["High Priority", C.amberL, C.amber], ["Q4 2024", C.g100, C.g600]].map(([l, bg, col]) => (
                <span key={l} style={{ fontSize: 12, fontWeight: 600, color: col as string, background: bg as string, padding: "4px 12px", borderRadius: 20 }}>{l}</span>
              ))}
            </div>
            <p style={{ fontSize: 14, color: C.g600, lineHeight: 1.75, margin: 0 }}>This decision covers the allocation of $2.4M for Q4 technology investments including cloud infrastructure upgrades, security tooling enhancements, and developer productivity tooling. The budget must be finalized before December 31, 2024 to comply with fiscal year accounting requirements.</p>
          </div>
          <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.g900, marginBottom: 16 }}>Alternatives Considered</div>
            {[["Option A: Full Cloud Migration", "Allocate 100% to cloud infrastructure. Highest ROI long-term.", 85], ["Option B: Hybrid Approach", "Split 60/40 between cloud and on-premise. Lower risk.", 70], ["Option C: Status Quo", "Maintain existing infrastructure with minor upgrades.", 40]].map(([title, desc, score]) => (
              <div key={title as string} style={{ border: `1px solid ${C.g200}`, borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: C.g800 }}>{title}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.blue }}>{score}/100</span>
                </div>
                <p style={{ fontSize: 13, color: C.g500, margin: 0 }}>{desc}</p>
                <div style={{ height: 4, background: C.g100, borderRadius: 2, marginTop: 10 }}>
                  <div style={{ width: `${score}%`, height: "100%", background: score > 75 ? C.green : score > 55 ? C.amber : C.red, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar metadata */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.g800, marginBottom: 16 }}>Decision Info</div>
            {[["Submitter", "Sarah Chen"], ["Department", "Finance"], ["Category", "Budget"], ["Priority", "High"], ["Deadline", "Dec 31, 2024"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: C.g500 }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: C.g800 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.g800, marginBottom: 16 }}>Approval Chain</div>
            {[["Sarah Chen", "Submitted", C.green, "Dec 15"], ["Dr. Mark Lee", "Review", C.amber, "Pending"], ["VP Operations", "Approval", C.g300, "—"], ["CTO Office", "Final", C.g300, "—"]].map(([name, role, col, date]) => (
              <div key={name} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: col as string, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {col === C.green ? <Check size={14} color="white" /> : col === C.amber ? <Clock size={14} color="white" /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800 }}>{name}</div>
                  <div style={{ fontSize: 12, color: C.g500 }}>{role} · {date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// WIZARD STEP WRAPPER
// ══════════════════════════════════════════════════════════════════
function WizardShell({ step, children }: { step: number; children: React.ReactNode }) {
  const steps = ["Basic Info", "Alternatives", "Documents", "Reviewers"];
  return (
    <AppLayout active="create" title="Create Decision" breadcrumb={["Home", "Create Decision", `Step ${step}`]}>
      <div style={{ background: "white", borderRadius: 16, padding: "24px 32px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: i + 1 < step ? C.green : i + 1 === step ? C.blue : C.g200, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                  {i + 1 < step ? <Check size={17} color="white" /> : <span style={{ color: i + 1 === step ? "white" : C.g400, fontSize: 14, fontWeight: 700 }}>{i + 1}</span>}
                </div>
                <div style={{ fontSize: 12, fontWeight: i + 1 === step ? 700 : 400, color: i + 1 === step ? C.blue : i + 1 < step ? C.green : C.g400, marginTop: 6 }}>{s}</div>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i + 1 < step ? C.green : C.g200, margin: "0 8px", marginBottom: 20 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {children}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button style={{ padding: "12px 24px", borderRadius: 10, border: `1px solid ${C.g200}`, background: "white", fontSize: 14, color: C.g600, cursor: "pointer" }}>← Previous</button>
        <button style={{ padding: "12px 28px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
          {step === 4 ? "Review Summary →" : "Next Step →"}
        </button>
      </div>
    </AppLayout>
  );
}

// SCREEN 6: CREATE STEP 1
function CreateStep1Screen() {
  return (
    <WizardShell step={1}>
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: C.g900, margin: "0 0 22px" }}>Basic Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Decision Title *</label>
            <div style={{ border: `2px solid ${C.blue}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.g800 }}>Q4 Technology Budget Allocation</div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Category *</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.g800, display: "flex", justifyContent: "space-between" }}>Finance <ChevronDown size={15} color={C.g400} /></div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Priority Level *</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.amber, display: "flex", justifyContent: "space-between" }}>High <ChevronDown size={15} color={C.g400} /></div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Department</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.g800, display: "flex", justifyContent: "space-between" }}>Finance & Operations <ChevronDown size={15} color={C.g400} /></div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Decision Date</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.g800, display: "flex", justifyContent: "space-between" }}>Dec 31, 2024 <Calendar size={15} color={C.g400} /></div>
          </div>
          <div style={{ gridColumn: "1/-1" }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Decision Description *</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "13px 16px", background: "white", fontSize: 14, color: C.g600, lineHeight: 1.7, height: 120 }}>
              This decision covers the allocation of $2.4M for Q4 technology investments including cloud infrastructure upgrades, security tooling enhancements, and developer productivity tooling...
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Tags</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px", background: "white", display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Budget", "Q4", "Technology"].map(t => <span key={t} style={{ fontSize: 12, fontWeight: 600, color: C.blue, background: C.blueL, padding: "4px 10px", borderRadius: 20 }}>{t}</span>)}
              <span style={{ fontSize: 12, color: C.g400 }}>+ Add tag</span>
            </div>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}

// SCREEN 7: CREATE STEP 2
function CreateStep2Screen() {
  const alts = [
    { name: "Full Cloud Migration", pros: "Scalable, cost efficient long-term", cons: "High upfront cost, migration risk", score: 85 },
    { name: "Hybrid Approach", pros: "Lower risk, flexible timeline", cons: "Complex management", score: 70 },
    { name: "Status Quo", pros: "No disruption, known costs", cons: "Technical debt accumulates", score: 40 },
  ];
  return (
    <WizardShell step={2}>
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.g900, margin: 0 }}>Alternative Analysis</h3>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: C.blue, color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Add Alternative</button>
        </div>
        <div style={{ border: `1px solid ${C.g200}`, borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ background: C.g50 }}>{["Alternative", "Pros", "Cons", "Score", ""].map(h => <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: C.g500, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
            <tbody>{alts.map((a, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.g100}`, background: i === 0 ? C.blueL : "white" }}>
                <td style={{ padding: "16px", fontSize: 14, fontWeight: 600, color: C.g800 }}>
                  {a.name}
                  {i === 0 && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: C.blue, background: "white", padding: "2px 8px", borderRadius: 20 }}>Selected</span>}
                </td>
                <td style={{ padding: "16px", fontSize: 13, color: C.green }}>{a.pros}</td>
                <td style={{ padding: "16px", fontSize: 13, color: C.red }}>{a.cons}</td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: C.g100, borderRadius: 3 }}>
                      <div style={{ width: `${a.score}%`, height: "100%", background: a.score > 75 ? C.green : a.score > 55 ? C.amber : C.red, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.g800, width: 36 }}>{a.score}</span>
                  </div>
                </td>
                <td style={{ padding: "16px" }}><Edit3 size={15} color={C.g400} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* Cost Comparison */}
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginTop: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: C.g900, margin: "0 0 22px" }}>Cost Comparison</h3>
        <div style={{ border: `1px solid ${C.g200}`, borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.g50 }}>
                {["Alternative", "Estimated Cost", "Budget Impact", "Cost Efficiency", "Notes"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: C.g500, textAlign: "left" as const, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { alt: "Cloud Migration",  cost: "₹18,50,000", impact: "Within Budget",        efficiency: "High",   note: "Recommended",       selected: true  },
                { alt: "Hybrid Approach",  cost: "₹22,00,000", impact: "Slightly Above Budget", efficiency: "Medium", note: "Requires Approval", selected: false },
                { alt: "Status Quo",       cost: "₹8,00,000",  impact: "Within Budget",        efficiency: "Low",    note: "Short-term Solution",selected: false },
              ].map((row, i) => {
                const effCol = row.efficiency === "High" ? C.green : row.efficiency === "Medium" ? C.amber : C.red;
                const effBg  = row.efficiency === "High" ? C.greenL : row.efficiency === "Medium" ? C.amberL : C.redL;
                const impCol = row.impact === "Within Budget" ? C.green : C.amber;
                const impBg  = row.impact === "Within Budget" ? C.greenL : C.amberL;
                return (
                  <tr key={i} style={{ borderTop: `1px solid ${C.g100}`, background: row.selected ? C.blueL : "white" }}>
                    <td style={{ padding: "16px", fontSize: 14, fontWeight: 600, color: C.g800 }}>
                      {row.alt}
                      {row.selected && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: C.blue, background: "white", padding: "2px 8px", borderRadius: 20 }}>Selected</span>}
                    </td>
                    <td style={{ padding: "16px", fontSize: 14, fontWeight: 700, color: C.g900, fontVariantNumeric: "tabular-nums" }}>{row.cost}</td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: impCol, background: impBg, padding: "4px 10px", borderRadius: 18, whiteSpace: "nowrap" as const }}>{row.impact}</span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: effCol, background: effBg, padding: "4px 10px", borderRadius: 18 }}>{row.efficiency}</span>
                    </td>
                    <td style={{ padding: "16px", fontSize: 13, color: C.g600 }}>{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </WizardShell>
  );
}

// SCREEN 8: CREATE STEP 3
function CreateStep3Screen() {
  const files = [
    { name: "Budget_Proposal_Q4_2024.pdf", size: "2.4 MB", type: "PDF", uploaded: "Dec 15" },
    { name: "Cloud_ROI_Analysis.xlsx", size: "890 KB", type: "Excel", uploaded: "Dec 15" },
    { name: "Vendor_Comparison.pptx", size: "5.1 MB", type: "PPT", uploaded: "Dec 15" },
  ];
  const typeColors: Record<string, [string, string]> = { PDF: [C.redL, C.red], Excel: [C.greenL, C.green], PPT: [C.amberL, C.amber] };
  return (
    <WizardShell step={3}>
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: C.g900, margin: "0 0 20px" }}>Upload Supporting Documents</h3>
        <div style={{ border: `2px dashed ${C.g300}`, borderRadius: 14, padding: "40px 24px", textAlign: "center", background: C.g50, marginBottom: 24, cursor: "pointer" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Upload size={24} color={C.blue} /></div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.g800, marginBottom: 6 }}>Drop files here or click to upload</div>
          <div style={{ fontSize: 13, color: C.g500, marginBottom: 16 }}>Supports PDF, DOCX, XLSX, PPTX up to 50 MB</div>
          <button style={{ padding: "10px 22px", borderRadius: 9, border: `1.5px solid ${C.blue}`, background: "white", color: C.blue, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Choose Files</button>
        </div>
        {files.map((f, i) => {
          const [bg, col] = typeColors[f.type] || [C.g100, C.g600];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", border: `1px solid ${C.g200}`, borderRadius: 12, marginBottom: 10, background: "white" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: col }}>{f.type}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.g800 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: C.g400 }}>{f.size} · Uploaded {f.uploaded}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ padding: "6px", border: `1px solid ${C.g200}`, borderRadius: 7, cursor: "pointer" }}><Eye size={15} color={C.g500} /></div>
                <div style={{ padding: "6px", border: `1px solid ${C.g200}`, borderRadius: 7, cursor: "pointer" }}><X size={15} color={C.red} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </WizardShell>
  );
}

// SCREEN 9: CREATE STEP 4
function CreateStep4Screen() {
  const reviewers = [
    { name: "Dr. Mark Lee", role: "Reviewer", dept: "Finance", avatar: "ML" },
    { name: "Jennifer Walsh", role: "Manager", dept: "Operations", avatar: "JW" },
    { name: "Alex Thompson", role: "Admin", dept: "Executive", avatar: "AT" },
  ];
  return (
    <WizardShell step={4}>
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: C.g900, margin: "0 0 20px" }}>Assign Reviewers & Approvers</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.g100, border: `1px solid ${C.g200}`, borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
          <Search size={16} color={C.g400} /><span style={{ fontSize: 14, color: C.g400 }}>Search users by name or department...</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.g700, marginBottom: 14 }}>Assigned Reviewers ({reviewers.length})</div>
        {reviewers.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", border: `1px solid ${C.g200}`, borderRadius: 12, marginBottom: 10, background: "white" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>{r.avatar}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.g800 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: C.g500 }}>{r.dept}</div>
            </div>
            <SBadge s={r.role} />
            <X size={16} color={C.g400} style={{ cursor: "pointer" }} />
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Review Deadline</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "12px 16px", background: "white", fontSize: 14, color: C.g800, display: "flex", justifyContent: "space-between" }}>Dec 25, 2024 <Calendar size={15} color={C.g400} /></div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 7 }}>Approval Type</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "12px 16px", background: "white", fontSize: 14, color: C.g800, display: "flex", justifyContent: "space-between" }}>Sequential <ChevronDown size={15} color={C.g400} /></div>
          </div>
        </div>
      </div>
    </WizardShell>
  );
}

// SCREEN 10: REVIEW SUMMARY
function ReviewSummaryScreen() {
  return (
    <AppLayout active="create" title="Review Summary" breadcrumb={["Home", "Create Decision", "Review"]}>
      <div style={{ marginBottom: 16, padding: "14px 20px", background: C.blueL, border: `1px solid ${C.blueMid}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <AlertTriangle size={18} color={C.blue} />
        <span style={{ fontSize: 14, color: C.blue, fontWeight: 500 }}>Please review all information carefully before submitting. Changes cannot be made after submission without creating a new version.</span>
      </div>
      {[["Basic Information", [["Title", "Q4 Technology Budget Allocation"], ["Category", "Finance"], ["Priority", "High"], ["Department", "Finance & Operations"], ["Deadline", "Dec 31, 2024"]]], ["Selected Alternative", [["Name", "Full Cloud Migration"], ["Score", "85/100"], ["Pros", "Scalable, cost efficient"], ["Cons", "High upfront cost"]]], ["Documents Uploaded", [["Budget_Proposal_Q4_2024.pdf", "2.4 MB"], ["Cloud_ROI_Analysis.xlsx", "890 KB"], ["Vendor_Comparison.pptx", "5.1 MB"]]], ["Assigned Reviewers", [["Reviewer", "Dr. Mark Lee (Finance)"], ["Manager", "Jennifer Walsh (Ops)"], ["Admin", "Alex Thompson (Exec)"], ["Deadline", "Dec 25, 2024"]]]].map(([section, items]) => (
        <div key={section as string} style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.g800 }}>{section as string}</div>
            <button style={{ fontSize: 13, color: C.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Edit</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(items as [string, string][]).map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.g400, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 14, color: C.g800 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button style={{ padding: "13px 24px", borderRadius: 10, border: `1px solid ${C.g200}`, background: "white", fontSize: 14, color: C.g600 }}>← Back to Edit</button>
        <button style={{ padding: "13px 28px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 16px rgba(37,99,235,0.35)" }}>Submit Decision →</button>
      </div>
    </AppLayout>
  );
}

// SCREEN 11: SUBMIT SUCCESS
function SubmitSuccessScreen() {
  return (
    <AppLayout active="create" title="Decision Submitted" breadcrumb={["Home", "Create Decision", "Submitted"]}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.greenL, border: `4px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <Check size={40} color={C.green} />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.g900, letterSpacing: "-0.03em", margin: "0 0 8px" }}>Decision Submitted!</h2>
        <p style={{ fontSize: 16, color: C.g500, margin: "0 0 6px" }}>Your decision has been successfully submitted for review</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.g100, padding: "8px 20px", borderRadius: 20, marginBottom: 32 }}>
          <span style={{ fontSize: 13, color: C.g500 }}>Decision ID:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.blue, fontFamily: "monospace" }}>DEC-2848</span>
        </div>
        {/* Approval chain progress */}
        <div style={{ width: "100%", maxWidth: 640, background: "white", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `1px solid ${C.g100}`, marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.g800, marginBottom: 20 }}>Approval Progress</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {[["Submitted", C.green, true], ["Reviewer", C.amber, false], ["Manager", C.g300, false], ["Admin", C.g300, false], ["Approved", C.g300, false]].map(([label, col, done]: any, i, arr) => (
              <React.Fragment key={label}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: col, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                    {done ? <Check size={18} color="white" /> : col === C.amber ? <Clock size={18} color="white" /> : <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: done ? C.green : col === C.amber ? C.amber : C.g400 }}>{label}</span>
                </div>
                {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: i < 1 ? C.green : C.g200, margin: "0 8px", marginBottom: 24 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ padding: "13px 24px", borderRadius: 10, border: `1.5px solid ${C.g200}`, background: "white", fontSize: 14, color: C.g700, fontWeight: 500 }}>View Decision</button>
          <button style={{ padding: "13px 24px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>Create Another</button>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// APPROVAL SCREENS (generic component)
// ══════════════════════════���═══════════════════════════════════════
function ApprovalScreen({ role, status, prevApprovals }: { role: string; status: string; prevApprovals: { name: string; result: string }[] }) {
  return (
    <AppLayout active="approvals" title={`${role} Review`} breadcrumb={["Home", "Approvals", "DEC-2848"]}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        <div>
          <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
              <SBadge s={status} />
              <span style={{ fontSize: 13, color: C.g500 }}>DEC-2848 · Submitted by Sarah Chen</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em", margin: "0 0 12px" }}>Q4 Technology Budget Allocation</h3>
            <p style={{ fontSize: 14, color: C.g600, lineHeight: 1.75, margin: "0 0 16px" }}>Allocation of $2.4M for Q4 technology investments including cloud infrastructure upgrades, security tooling, and developer productivity tooling.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["Finance", C.blueL, C.blue], ["High Priority", C.amberL, C.amber], ["Dec 31, 2024", C.g100, C.g600]].map(([l, bg, col]) => (
                <span key={l} style={{ fontSize: 12, fontWeight: 600, color: col as string, background: bg as string, padding: "4px 12px", borderRadius: 20 }}>{l}</span>
              ))}
            </div>
          </div>
          {prevApprovals.length > 0 && (
            <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.g800, marginBottom: 16 }}>Previous Approvals</div>
              {prevApprovals.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < prevApprovals.length - 1 ? `1px solid ${C.g100}` : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: a.result === "Approved" ? C.green : C.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {a.result === "Approved" ? <Check size={15} color="white" /> : <X size={15} color="white" />}
                  </div>
                  <div style={{ flex: 1 }}><span style={{ fontSize: 14, fontWeight: 500, color: C.g800 }}>{a.name}</span></div>
                  <SBadge s={a.result} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.g800, marginBottom: 16 }}>Your Decision</div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.g700, display: "block", marginBottom: 8 }}>Comments</label>
            <div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "12px 14px", background: C.g50, fontSize: 14, color: C.g500, height: 100, lineHeight: 1.6 }}>Add your review comments here...</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <button style={{ padding: "13px", borderRadius: 10, border: "none", background: C.green, color: "white", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 12px rgba(16,185,129,0.35)" }}>
                <Check size={17} /> Approve Decision
              </button>
              <button style={{ padding: "13px", borderRadius: 10, border: `1.5px solid ${C.red}`, background: C.redL, color: C.red, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <X size={17} /> Reject Decision
              </button>
              <button style={{ padding: "13px", borderRadius: 10, border: `1.5px solid ${C.g200}`, background: "white", color: C.g600, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <RefreshCw size={15} /> Request Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// SCREEN 15: APPROVED
function ApprovedScreen() {
  return (
    <AppLayout active="approvals" title="Decision Approved" breadcrumb={["Home", "Approvals", "DEC-2848", "Approved"]}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
        <div style={{ width: "100%", maxWidth: 720, background: "linear-gradient(135deg,#10B981,#059669)", borderRadius: 24, padding: 36, textAlign: "center", marginBottom: 24, boxShadow: "0 8px 32px rgba(16,185,129,0.3)" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Award size={36} color="white" />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", letterSpacing: "-0.03em", margin: "0 0 8px" }}>Decision Approved!</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 16px" }}>Q4 Technology Budget Allocation</p>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>DEC-2848 · Approved Dec 22, 2024</div>
        </div>
        <div style={{ width: "100%", maxWidth: 720, background: "white", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.g800, marginBottom: 20 }}>Complete Approval Chain</div>
          {[["Sarah Chen", "Submitted", "Dec 15", C.blue], ["Dr. Mark Lee", "Reviewer Approved", "Dec 18", C.green], ["Jennifer Walsh", "Manager Approved", "Dec 20", C.green], ["Alex Thompson", "Admin Approved", "Dec 22", C.green]].map(([name, action, date, col], i, arr) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < arr.length - 1 ? 0 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: col as string, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {col === C.blue ? <Send size={16} color="white" /> : <Check size={16} color="white" />}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: C.g200, minHeight: 28, margin: "4px 0" }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.g800 }}>{name}</div>
                <div style={{ fontSize: 13, color: col as string, fontWeight: 500 }}>{action} · {date}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button style={{ padding: "13px 24px", borderRadius: 10, border: `1.5px solid ${C.g200}`, background: "white", fontSize: 14, color: C.g700, fontWeight: 500 }}>Download Certificate</button>
          <button style={{ padding: "13px 24px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>View in Knowledge Repo →</button>
        </div>
      </div>
    </AppLayout>
  );
}

// SCREEN 16: KNOWLEDGE REPOSITORY
function KnowledgeRepoScreen() {
  const docs = [
    { title: "Remote Work Policy 2025",          cat: "HR Policy",   status: "Approved", updated: "Dec 12, 2024", views: 128, desc: "Guidelines for hybrid and remote work arrangements including eligibility, equipment, and communication standards." },
    { title: "Cloud Migration Strategy",          cat: "Technology",  status: "Approved", updated: "Nov 28, 2024", views: 89,  desc: "Phased roadmap for migrating on-premise infrastructure to cloud, including risk assessment and vendor selection." },
    { title: "Q3 Marketing Budget Allocation",    cat: "Finance",     status: "Approved", updated: "Nov 15, 2024", views: 65,  desc: "Approved marketing spend across digital, events, and content channels for Q3 fiscal period." },
    { title: "Data Retention Policy v3",          cat: "Compliance",  status: "Archived", updated: "Oct 30, 2024", views: 241, desc: "Organization-wide rules for data storage, archival, and deletion in compliance with GDPR and ISO 27001." },
    { title: "New Office Expansion Plan",         cat: "Operations",  status: "Approved", updated: "Oct 12, 2024", views: 55,  desc: "Strategic plan for opening a secondary office location, covering budget, timeline, and resource allocation." },
    { title: "Vendor SLA Standards",              cat: "Procurement", status: "Archived", updated: "Sep 20, 2024", views: 78,  desc: "Standard service level agreements for third-party vendors covering uptime, support response, and penalties." },
  ];
  const catColors: Record<string, [string, string]> = {
    "HR Policy":   [C.purpleL, C.purple],
    "Technology":  [C.blueL,   C.blue  ],
    "Finance":     [C.greenL,  C.green ],
    "Compliance":  [C.amberL,  C.amber ],
    "Operations":  [C.tealL,   C.teal  ],
    "Procurement": [C.indigoL, C.indigo],
  };
  return (
    <AppLayout active="knowledge" title="Knowledge Repository" breadcrumb={["Home", "Knowledge Repository"]}>

      {/* Search section */}
      <div style={{ background: "white", borderRadius: 14, padding: "22px 24px", border: `1px solid ${C.g200}`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, border: `1.5px solid ${C.g200}`, borderRadius: 10, padding: "11px 16px", background: C.g50 }}>
            <Search size={16} color={C.g400} />
            <span style={{ fontSize: 14, color: C.g300 }}>Search decisions, policies, documents…</span>
          </div>
          <button style={{ padding: "11px 24px", borderRadius: 10, border: "none", background: C.blue, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.25)", flexShrink: 0 }}>Search</button>
        </div>
        {/* Filter chips */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" as const }}>
          {["All", "Finance", "HR Policy", "Technology", "Compliance", "Operations", "Procurement"].map((chip, i) => (
            <span key={chip} style={{ fontSize: 12, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "white" : C.g600, background: i === 0 ? C.blue : "white", border: `1px solid ${i === 0 ? C.blue : C.g200}`, padding: "6px 16px", borderRadius: 20, cursor: "pointer" }}>{chip}</span>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: C.g500 }}><span style={{ fontWeight: 700, color: C.g800 }}>{docs.length}</span> documents found</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: C.g500 }}>Sort by:</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.g200}`, borderRadius: 8, padding: "6px 12px", background: "white", cursor: "pointer" }}>
            <span style={{ fontSize: 12, color: C.g700, fontWeight: 500 }}>Last Updated</span>
            <ChevronDown size={13} color={C.g400} />
          </div>
        </div>
      </div>

      {/* Document cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
        {docs.map((doc, i) => {
          const [catBg, catCol] = catColors[doc.cat] || [C.g100, C.g500];
          return (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "20px 22px", border: `1px solid ${C.g200}`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Top row: category + status */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: catCol, background: catBg, padding: "3px 10px", borderRadius: 18 }}>{doc.cat}</span>
                <SBadge s={doc.status} />
              </div>
              {/* Title */}
              <div style={{ fontSize: 14, fontWeight: 700, color: C.g900, lineHeight: 1.4 }}>{doc.title}</div>
              {/* Description */}
              <div style={{ fontSize: 12, color: C.g500, lineHeight: 1.65, flex: 1 }}>{doc.desc}</div>
              {/* Meta row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `1px solid ${C.g100}` }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={11} color={C.g400} />
                    <span style={{ fontSize: 11, color: C.g400 }}>{doc.updated}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Eye size={11} color={C.g400} />
                    <span style={{ fontSize: 11, color: C.g400 }}>{doc.views} views</span>
                  </div>
                </div>
                <button style={{ fontSize: 11, fontWeight: 700, color: C.blue, background: C.blueL, border: `1px solid ${C.blueMid}`, borderRadius: 7, padding: "5px 12px", cursor: "pointer" }}>
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}

// SCREEN 17: REPORTS DASHBOARD
function ReportsDashboardScreen() {
  const catData = [
    { name: "Finance", count: 42 }, { name: "HR Policy", count: 35 }, { name: "Technology", count: 58 },
    { name: "Compliance", count: 28 }, { name: "Operations", count: 31 }, { name: "Security", count: 19 },
  ];
  const trendData = [
    { m: "Jul", sub: 28, app: 18 }, { m: "Aug", sub: 35, app: 24 }, { m: "Sep", sub: 29, app: 21 },
    { m: "Oct", sub: 42, app: 31 }, { m: "Nov", sub: 38, app: 28 }, { m: "Dec", sub: 52, app: 38 },
  ];
  return (
    <AppLayout active="reports" title="Reports & Analytics" breadcrumb={["Home", "Reports"]}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px" }}><Calendar size={15} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>Jul – Dec 2024</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px" }}><Filter size={14} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>All Teams</span></div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", border: `1.5px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g700, fontWeight: 500, cursor: "pointer" }}>
          <Download size={15} /> Export Report
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 }}>
        {[["Total Decisions", "213", "+22%", C.blue], ["Approval Rate", "87%", "+5%", C.green], ["Avg Days", "4.2d", "−0.8d", C.amber], ["Archived", "48", "+12", C.purple]].map(([l, v, c, col]) => (
          <div key={l} style={{ background: "white", borderRadius: 14, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.g500, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>{l}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: C.g900, letterSpacing: "-0.04em" }}>{v}</div>
            <div style={{ fontSize: 12, color: col as string, fontWeight: 600, marginTop: 4 }}>{c} vs last period</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 18 }}>
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div><div style={{ fontSize: 15, fontWeight: 700, color: C.g900 }}>Submission vs Approval Trend</div><div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Monthly comparison</div></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.g100} />
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: C.g400 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: C.g400 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="sub" fill={C.blue} name="Submitted" radius={[4, 4, 0, 0]} />
              <Bar dataKey="app" fill={C.green} name="Approved" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 4 }}>By Category</div>
          <div style={{ fontSize: 12, color: C.g400, marginBottom: 16 }}>Decision count</div>
          {catData.map(({ name, count }) => (
            <div key={name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: C.g600 }}>{name}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>{count}</span>
              </div>
              <div style={{ height: 5, background: C.g100, borderRadius: 3 }}>
                <div style={{ width: `${(count / 58) * 100}%`, height: "100%", background: C.blue, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

// SCREEN 18: USER MANAGEMENT
function UserManagementScreen() {
  const users = [
    { name: "Sarah Chen", email: "s.chen@corp.com", role: "Admin", dept: "Finance", s: "Active", last: "2h ago" },
    { name: "Dr. Mark Lee", email: "m.lee@corp.com", role: "Manager", dept: "Research", s: "Active", last: "1d ago" },
    { name: "Jennifer Walsh", email: "j.walsh@corp.com", role: "Manager", dept: "Operations", s: "Active", last: "30m ago" },
    { name: "Alex Thompson", email: "a.thompson@corp.com", role: "Admin", dept: "Executive", s: "Active", last: "3h ago" },
    { name: "Lisa Park", email: "l.park@corp.com", role: "Reviewer", dept: "Procurement", s: "Active", last: "2d ago" },
    { name: "Tom Wright", email: "t.wright@corp.com", role: "Viewer", dept: "Product", s: "Inactive", last: "5d ago" },
  ];
  return (
    <AppLayout active="users" title="User Management" breadcrumb={["Home", "User Management"]}>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        {["Users (24)", "Roles (4)", "Teams (8)", "Permissions"].map((t, i) => (
          <span key={t} style={{ fontSize: 14, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? C.blue : C.g600, padding: "10px 18px", borderBottom: i === 0 ? `2px solid ${C.blue}` : "2px solid transparent", cursor: "pointer" }}>{t}</span>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{ display: "flex", alignItems: "center", gap: 8, background: C.blue, color: "white", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600 }}><Plus size={15} /> Add User</button>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px", flex: 1 }}><Search size={15} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Search users...</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px" }}><Filter size={14} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>Role</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px" }}><span style={{ fontSize: 13, color: C.g600 }}>Department</span></div>
      </div>
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: C.g50 }}>{["User", "Email", "Role", "Department", "Status", "Last Active", ""].map(h => <th key={h} style={{ padding: "12px 20px", fontSize: 11, fontWeight: 700, color: C.g500, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{users.map((u, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${C.g100}` }}>
              <td style={{ padding: "14px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: C.g800 }}>{u.name}</span>
                </div>
              </td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: C.g500 }}>{u.email}</td>
              <td style={{ padding: "14px 20px" }}><SBadge s={u.role} /></td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: C.g600 }}>{u.dept}</td>
              <td style={{ padding: "14px 20px" }}><SBadge s={u.s} /></td>
              <td style={{ padding: "14px 20px", fontSize: 13, color: C.g400 }}>{u.last}</td>
              <td style={{ padding: "14px 20px" }}><MoreHorizontal size={16} color={C.g400} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </AppLayout>
  );
}

// SCREEN 19: AUDIT DASHBOARD
function AuditDashboardScreen() {
  const logs = [
    { time: "Dec 22, 2024 14:32:15", user: "John Doe", action: "Decision Approved", resource: "DEC-2847", ip: "10.0.1.45", s: "Success" },
    { time: "Dec 22, 2024 13:18:42", user: "Sarah Chen", action: "Document Uploaded", resource: "DEC-2848", ip: "10.0.2.12", s: "Success" },
    { time: "Dec 22, 2024 12:05:30", user: "Mark Lee", action: "Review Submitted", resource: "DEC-2848", ip: "10.0.3.78", s: "Success" },
    { time: "Dec 22, 2024 11:22:08", user: "Unknown", action: "Login Attempt Failed", resource: "Auth System", ip: "203.0.113.25", s: "Rejected" },
    { time: "Dec 22, 2024 10:45:19", user: "Lisa Park", action: "Decision Viewed", resource: "DEC-2801", ip: "10.0.1.88", s: "Success" },
    { time: "Dec 22, 2024 09:30:55", user: "Admin System", action: "User Role Changed", resource: "user:t.wright", ip: "10.0.0.1", s: "Success" },
  ];
  return (
    <AppLayout active="audit" title="Audit & Compliance" breadcrumb={["Home", "Audit Logs"]}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["Activity Logs", "Version History", "Access Logs", "Security Logs"].map((t, i) => (
            <span key={t} style={{ fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? C.blue : C.g600, padding: "9px 16px", borderRadius: 9, background: i === 0 ? C.blueL : "white", border: `1px solid ${i === 0 ? C.blueMid : C.g200}`, cursor: "pointer" }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 9, padding: "9px 14px" }}><Calendar size={14} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>Today</span></div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1px solid ${C.g200}`, borderRadius: 9, background: "white", fontSize: 13, color: C.g600 }}><Download size={14} /> Export</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        {[["Total Events", "1,847", Activity, C.blue], ["Security Alerts", "3", AlertTriangle, C.red], ["Failed Logins", "12", Lock, C.amber], ["Data Exports", "8", Download, C.purple]].map(([l, v, Icon, col]: any) => (
          <div key={l} style={{ background: "white", borderRadius: 14, padding: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${col}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={col} /></div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.g900, letterSpacing: "-0.03em" }}>{v}</div>
            <div style={{ fontSize: 12, color: C.g500, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.g800 }}>Recent Activity</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.g100, border: `1px solid ${C.g200}`, borderRadius: 8, padding: "8px 14px" }}><Search size={14} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Filter logs...</span></div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ background: C.g50 }}>{["Timestamp", "User", "Action", "Resource", "IP Address", "Status"].map(h => <th key={h} style={{ padding: "11px 20px", fontSize: 11, fontWeight: 700, color: C.g500, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>)}</tr></thead>
          <tbody>{logs.map((l, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${C.g100}`, background: l.s === "Rejected" ? "#FFF5F5" : "white" }}>
              <td style={{ padding: "13px 20px", fontSize: 12, color: C.g400, fontFamily: "monospace", whiteSpace: "nowrap" }}>{l.time}</td>
              <td style={{ padding: "13px 20px", fontSize: 13, color: C.g700, fontWeight: 500 }}>{l.user}</td>
              <td style={{ padding: "13px 20px", fontSize: 13, color: C.g800 }}>{l.action}</td>
              <td style={{ padding: "13px 20px", fontSize: 12, color: C.blue, fontFamily: "monospace" }}>{l.resource}</td>
              <td style={{ padding: "13px 20px", fontSize: 12, color: C.g500, fontFamily: "monospace" }}>{l.ip}</td>
              <td style={{ padding: "13px 20px" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: l.s === "Success" ? C.green : C.red, background: l.s === "Success" ? C.greenL : C.redL, padding: "3px 10px", borderRadius: 20 }}>{l.s}</span>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// TITLE SECTION
// ══════════════════════════════════════════════════════════════════
function TitleSection() {
  return (
    <div style={{ background: "white", borderBottom: `1px solid ${C.g200}`, padding: "56px 64px 48px", textAlign: "center", position: "relative", overflow: "hidden", fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)" }} />
      <div style={{ position: "absolute", top: -40, right: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.04) 0%,transparent 70%)" }} />
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.blueL, border: `1px solid ${C.blueMid}`, borderRadius: 20, padding: "7px 18px", marginBottom: 22, position: "relative" }}>
        <Zap size={14} color={C.blue} /><span style={{ fontSize: 12, fontWeight: 700, color: C.blue, letterSpacing: "0.06em", textTransform: "uppercase" }}>UX/UI Flow Diagram — Enterprise Platform</span>
      </div>
      <h1 style={{ fontSize: 56, fontWeight: 900, color: C.g900, letterSpacing: "-0.04em", margin: "0 0 12px", lineHeight: 1.05, position: "relative" }}>
        Expert Decision<br />
        <span style={{ background: `linear-gradient(135deg,${C.blue},${C.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Replay Platform</span>
      </h1>
      <div style={{ fontSize: 20, fontWeight: 500, color: C.g500, margin: "0 0 18px" }}>Enterprise Decision Management System</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 32 }}>
        {["Capture", "Evaluate", "Approve", "Preserve Organizational Knowledge"].map((item, i, arr) => (
          <React.Fragment key={item}>
            <span style={{ fontSize: 15, fontWeight: 600, color: i < 3 ? C.blue : C.g600 }}>{item}</span>
            {i < arr.length - 1 && <span style={{ color: C.g300, fontSize: 18 }}>•</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {[["8", "User Flows"], ["20", "Screens"], ["4", "User Roles"], ["100%", "Audit Trail"]].map(([n, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 14, padding: "12px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: C.blue }}>{n}</span>
            <span style={{ fontSize: 13, color: C.g500 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: DECISION RATIONALE
// ══════════════════════════════════════════════════════════════════
function DecisionRationaleScreen() {
  const risks = [
    { risk: "Budget overrun if cloud migration scope expands", level: "Medium", mitigation: "Cap scope at agreed deliverables; weekly budget review" },
    { risk: "Vendor lock-in with primary cloud provider",      level: "Low",    mitigation: "Multi-cloud architecture with abstraction layer" },
    { risk: "Team upskilling delays implementation timeline",  level: "High",   mitigation: "Parallel training program starting Q3" },
  ];
  const riskCol = (l: string) => l === "High" ? C.red : l === "Medium" ? C.amber : C.green;
  const riskBg  = (l: string) => l === "High" ? C.redL : l === "Medium" ? C.amberL : C.greenL;
  return (
    <AppLayout active="decisions" title="Decision Rationale" breadcrumb={["Home", "My Decisions", "DEC-2847", "Rationale"]}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <SBadge s="Pending" /><span style={{ fontSize: 13, color: C.g500 }}>DEC-2847 · Q4 Technology Budget Allocation</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1px solid ${C.g200}`, borderRadius: 9, background: "white", fontSize: 13, color: C.g700 }}><Edit3 size={14} /> Edit Rationale</button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "none", borderRadius: 9, background: C.blue, color: "white", fontSize: 13, fontWeight: 600 }}><Download size={14} /> Export PDF</button>
        </div>
      </div>

      {/* Reason for Decision */}
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center" }}><FileCheck size={18} color={C.blue} /></div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Reason for Decision</div>
            <div style={{ fontSize: 12, color: C.g400 }}>Core justification for this decision</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: C.g700, lineHeight: 1.8, margin: 0 }}>
          The Q4 budget allocation is driven by the strategic imperative to modernize our technology stack ahead of projected 40% user growth in 2025. The current on-premise infrastructure cannot scale to meet demand without significant capital expenditure. Cloud migration offers a more cost-effective, elastic solution with a projected 3-year ROI of 180%. Additionally, compliance requirements under the new data governance framework mandate encrypted-at-rest storage that our legacy systems cannot provide without costly hardware upgrades.
        </p>
      </div>

      {/* Two columns: Alternatives + Pros/Cons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Alternatives Considered */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.purpleL, display: "flex", alignItems: "center", justifyContent: "center" }}><Bookmark size={18} color={C.purple} /></div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Alternatives Considered</div>
          </div>
          {[
            { label: "Option A — Full Cloud Migration", chosen: true,  note: "Selected: highest ROI, meets compliance, scalable" },
            { label: "Option B — Hybrid Cloud/On-Prem",  chosen: false, note: "Rejected: complex ops, mixed compliance posture" },
            { label: "Option C — On-Prem Upgrade",       chosen: false, note: "Rejected: high capex, does not scale past 2026" },
            { label: "Option D — SaaS Vendor Platform",  chosen: false, note: "Rejected: limited customization, vendor lock-in" },
          ].map(({ label, chosen, note }) => (
            <div key={label} style={{ border: `1px solid ${chosen ? C.blue : C.g200}`, borderRadius: 10, padding: "12px 16px", marginBottom: 10, background: chosen ? C.blueL : "white" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: chosen ? C.blue : C.g200, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {chosen ? <Check size={11} color="white" /> : <X size={11} color={C.g400} />}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: chosen ? C.blue : C.g700 }}>{label}</span>
              </div>
              <div style={{ fontSize: 12, color: C.g500, marginLeft: 28 }}>{note}</div>
            </div>
          ))}
        </div>

        {/* Pros and Cons */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.tealL, display: "flex", alignItems: "center", justifyContent: "center" }}><Tag size={18} color={C.teal} /></div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Pros & Cons</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.green, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 10 }}>Pros</div>
              {["180% 3-year ROI", "Elastic scalability", "Built-in compliance", "Reduced ops overhead", "Faster deployment cycles"].map(p => (
                <div key={p} style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.greenL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={10} color={C.green} /></div>
                  <span style={{ fontSize: 12, color: C.g700 }}>{p}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.red, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 10 }}>Cons</div>
              {["Upfront migration cost", "Team upskilling needed", "Temporary disruption", "Ongoing SaaS spend"].map(c => (
                <div key={c} style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.redL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><X size={10} color={C.red} /></div>
                  <span style={{ fontSize: 12, color: C.g700 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Justification */}
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.amberL, display: "flex", alignItems: "center", justifyContent: "center" }}><TrendingUp size={18} color={C.amber} /></div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Business Justification</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 18 }}>
          {[["$2.4M", "Total Investment", C.blue], ["$4.3M", "3-Year Savings", C.green], ["180%", "Expected ROI", C.purple], ["Q2 2025", "Break-even Point", C.amber]].map(([val, label, col]) => (
            <div key={label} style={{ border: `1px solid ${C.g200}`, borderRadius: 12, padding: "16px 18px", textAlign: "center" as const }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: col as string, letterSpacing: "-0.03em", marginBottom: 4 }}>{val}</div>
              <div style={{ fontSize: 12, color: C.g500 }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: C.g700, lineHeight: 1.8, margin: 0 }}>Cloud infrastructure reduces hardware refresh cycles from 3 years to continuous rolling updates. Licensing consolidation under enterprise agreements eliminates 14 separate vendor contracts, saving $420K annually in management overhead. The migration aligns with the 5-year digital transformation roadmap approved by the Board in Q1 2024.</p>
      </div>

      {/* Risk Assessment + Expected Outcome */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        {/* Risk Assessment */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.redL, display: "flex", alignItems: "center", justifyContent: "center" }}><AlertCircle size={18} color={C.red} /></div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Risk Assessment</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {risks.map((r) => (
              <div key={r.risk} style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.g800, flex: 1, marginRight: 10 }}>{r.risk}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: riskCol(r.level), background: riskBg(r.level), padding: "3px 10px", borderRadius: 18, flexShrink: 0 }}>{r.level}</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <Shield size={13} color={C.g400} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 12, color: C.g500 }}>{r.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Outcome */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: C.greenL, display: "flex", alignItems: "center", justifyContent: "center" }}><Star size={18} color={C.green} /></div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Expected Outcome</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { timeline: "Q1 2025", milestone: "Infrastructure baseline deployed", status: "Planned" },
              { timeline: "Q2 2025", milestone: "Primary workloads migrated",      status: "Planned" },
              { timeline: "Q2 2025", milestone: "Break-even achieved",             status: "Projected" },
              { timeline: "Q3 2025", milestone: "Full legacy decommission",        status: "Planned" },
              { timeline: "Q4 2025", milestone: "ROI tracking report published",   status: "Projected" },
            ].map(({ timeline, milestone, status }) => (
              <div key={milestone} style={{ padding: "10px 14px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g100}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>{timeline}</span>
                  <span style={{ fontSize: 10, color: C.g400, fontStyle: "italic" }}>{status}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.g700 }}>{milestone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: SUPPORTING DOCUMENTS
// ══════════════════════════════════════════════════════════════════
function SupportingDocumentsScreen() {
  const docs = [
    { id: 1, name: "Q4_Budget_Proposal_v3.pdf",          size: "2.4 MB", type: "PDF",  version: "v3", uploadedBy: "Sarah Chen",    date: "Dec 15, 2024", status: "Current" },
    { id: 2, name: "Cloud_Migration_Feasibility.docx",   size: "1.1 MB", type: "DOCX", version: "v2", uploadedBy: "Dr. Mark Lee",  date: "Dec 12, 2024", status: "Current" },
    { id: 3, name: "ROI_Analysis_Spreadsheet.xlsx",      size: "840 KB", type: "XLSX", version: "v1", uploadedBy: "Sarah Chen",    date: "Dec 10, 2024", status: "Current" },
    { id: 4, name: "Vendor_Comparison_Matrix.pdf",       size: "3.2 MB", type: "PDF",  version: "v1", uploadedBy: "L. Park",       date: "Dec 8, 2024",  status: "Current" },
    { id: 5, name: "Board_Approval_Q1_2024.pdf",         size: "560 KB", type: "PDF",  version: "v1", uploadedBy: "T. Wright",     date: "Jan 15, 2024", status: "Archived" },
  ];
  const typeColors: Record<string, [string, string]> = {
    PDF:  [C.redL,    C.red    ],
    DOCX: [C.blueL,   C.blue   ],
    XLSX: [C.greenL,  C.green  ],
    PPTX: [C.amberL,  C.amber  ],
  };
  const versions = [
    { ver: "v3", date: "Dec 15, 2024", by: "Sarah Chen",   note: "Updated budget figures after finance review" },
    { ver: "v2", date: "Dec 10, 2024", by: "Dr. Mark Lee", note: "Added risk mitigation section" },
    { ver: "v1", date: "Dec 5, 2024",  by: "Sarah Chen",   note: "Initial submission" },
  ];
  return (
    <AppLayout active="decisions" title="Supporting Documents" breadcrumb={["Home", "My Decisions", "DEC-2847", "Documents"]}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <SBadge s="Pending" /><span style={{ fontSize: 13, color: C.g500 }}>DEC-2847 · 5 documents · Last updated Dec 15, 2024</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1px solid ${C.g200}`, borderRadius: 9, background: "white", fontSize: 13, color: C.g700 }}><Download size={14} /> Download All</button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "none", borderRadius: 9, background: C.blue, color: "white", fontSize: 13, fontWeight: 600 }}><FileUp size={14} /> Upload Document</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        {/* Document List */}
        <div>
          {/* Upload zone */}
          <div style={{ border: `2px dashed ${C.g300}`, borderRadius: 16, padding: "28px 24px", textAlign: "center" as const, marginBottom: 20, background: C.g50, cursor: "pointer" }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><Upload size={22} color={C.blue} /></div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.g800, marginBottom: 4 }}>Drop files here or click to upload</div>
            <div style={{ fontSize: 12, color: C.g400 }}>Supports PDF, DOCX, XLSX, PPTX, PNG — Max 50MB per file</div>
          </div>

          {/* Document list */}
          <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900 }}>Document List</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 8, padding: "7px 12px" }}>
                <Search size={13} color={C.g400} /><span style={{ fontSize: 12, color: C.g400 }}>Search documents…</span>
              </div>
            </div>
            {docs.map((doc) => {
              const [tbg, tcol] = typeColors[doc.type] || [C.g100, C.g500];
              return (
                <div key={doc.id} style={{ padding: "16px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: tbg, border: `1px solid ${tcol}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: tcol, letterSpacing: "0.04em" }}>{doc.type}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 4 }}>{doc.name}</div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: C.g400 }}>{doc.size}</span>
                      <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                      <span style={{ fontSize: 11, color: C.g500 }}>{doc.uploadedBy}</span>
                      <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                      <span style={{ fontSize: 11, color: C.g400 }}>{doc.date}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: tcol, background: tbg, padding: "2px 8px", borderRadius: 10 }}>{doc.version}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button style={{ padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><Eye size={13} color={C.g500} /></button>
                    <button style={{ padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><Download size={13} color={C.g500} /></button>
                    <button style={{ padding: "6px 10px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", cursor: "pointer" }}><Trash2 size={13} color={C.red} /></button>
                  </div>
                  {doc.status === "Current" ? null : <span style={{ fontSize: 10, fontWeight: 600, color: C.g400, background: C.g100, padding: "2px 8px", borderRadius: 8 }}>Archived</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel: Preview + Version History */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* File preview */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, marginBottom: 16 }}>File Preview</div>
            <div style={{ background: C.g50, borderRadius: 12, border: `1px solid ${C.g200}`, height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: C.redL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FolderOpen size={26} color={C.red} />
              </div>
              <div style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.g700 }}>Q4_Budget_Proposal_v3.pdf</div>
                <div style={{ fontSize: 11, color: C.g400, marginTop: 3 }}>Click to open full preview</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
              <button style={{ padding: "9px", borderRadius: 9, border: `1px solid ${C.g200}`, background: "white", fontSize: 12, color: C.g700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}><Eye size={13} /> Preview</button>
              <button style={{ padding: "9px", borderRadius: 9, border: "none", background: C.blue, color: "white", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}><Download size={13} /> Download</button>
            </div>
          </div>

          {/* Version History */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <RefreshCw size={16} color={C.g500} />
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900 }}>Version History</div>
            </div>
            <div style={{ fontSize: 12, color: C.g500, marginBottom: 12 }}>Q4_Budget_Proposal_v3.pdf</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {versions.map((v, i) => (
                <div key={v.ver} style={{ display: "flex", gap: 12, paddingBottom: i < versions.length - 1 ? 16 : 0, position: "relative" }}>
                  {i < versions.length - 1 && <div style={{ position: "absolute", left: 12, top: 24, width: 2, height: "100%", background: C.g200 }} />}
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 0 ? C.blueL : C.g100, border: `2px solid ${i === 0 ? C.blue : C.g300}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: i === 0 ? C.blue : C.g500 }}>{v.ver}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.g800 }}>{v.ver}</span>
                      {i === 0 && <span style={{ fontSize: 10, fontWeight: 700, color: C.green, background: C.greenL, padding: "2px 7px", borderRadius: 10 }}>Latest</span>}
                    </div>
                    <div style={{ fontSize: 11, color: C.g500, marginBottom: 2 }}>{v.by} · {v.date}</div>
                    <div style={{ fontSize: 11, color: C.g600, fontStyle: "italic" }}>{v.note}</div>
                  </div>
                  <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer", flexShrink: 0, alignSelf: "flex-start" }}><Download size={12} color={C.g500} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: DISCUSSION DASHBOARD
// ══════════════════════════════════════════════════════════════════
function DiscussionDashboardScreen() {
  const threads = [
    { id: 1, title: "Cloud Infrastructure Migration — Technical Concerns",    replies: 12, participants: 5, updated: "30 min ago",  status: "Open",     tag: "Technology" },
    { id: 2, title: "Remote Work Policy — HR Guidelines Review",               replies: 8,  participants: 4, updated: "2 hours ago", status: "Open",     tag: "HR Policy"  },
    { id: 3, title: "Q1 Budget Allocation — Finance Stakeholder Alignment",    replies: 5,  participants: 6, updated: "5 hours ago", status: "Resolved", tag: "Finance"    },
    { id: 4, title: "Security Compliance — Framework Approval Discussion",     replies: 9,  participants: 3, updated: "1 day ago",   status: "Open",     tag: "Security"   },
  ];
  const comments = [
    { id: 1, author: "Dr. Mark Lee",   avatar: "ML", text: "The ROI analysis looks solid. We need the vendor comparison updated before approval.", time: "15 min ago",  thread: "Q4 Budget" },
    { id: 2, author: "Sarah Chen",     avatar: "SC", text: "I've attached the revised feasibility study. Please review sections 3 and 4.",        time: "1 hour ago",  thread: "Cloud Migration" },
    { id: 3, author: "M. Johnson",     avatar: "MJ", text: "@Dr. Lee — can you confirm the timeline in the risk assessment is realistic?",        time: "2 hours ago", thread: "Remote Work Policy" },
    { id: 4, author: "T. Wright",      avatar: "TW", text: "Escalating this thread — security compliance deadline is end of Q1.",                 time: "3 hours ago", thread: "Security Compliance" },
  ];
  const meetings = [
    { id: 1, title: "Q4 Budget Review — Finance Team",           date: "Jan 10, 2026", time: "10:00 AM", participants: 6, status: "Completed" },
    { id: 2, title: "Cloud Migration Kickoff",                   date: "Jan 13, 2026", time: "2:00 PM",  participants: 8, status: "Upcoming"  },
    { id: 3, title: "Remote Work Policy Stakeholder Session",    date: "Jan 15, 2026", time: "11:00 AM", participants: 5, status: "Upcoming"  },
  ];
  const activities = [
    { id: 1, icon: MessageSquare, color: C.blue,   text: "Dr. Mark Lee commented on Cloud Infrastructure Migration",  time: "15 min ago"  },
    { id: 2, icon: Hash,          color: C.purple, text: "New thread started: Security Compliance — Framework Review", time: "2 hours ago" },
    { id: 3, icon: Clipboard,     color: C.green,  text: "Meeting notes published: Q4 Budget Review",                 time: "5 hours ago" },
    { id: 4, icon: Reply,         color: C.indigo, text: "Sarah Chen replied to Remote Work Policy thread",            time: "6 hours ago" },
    { id: 5, icon: Paperclip,     color: C.amber,  text: "Vendor_Comparison.pdf attached to Budget thread",           time: "1 day ago"   },
  ];

  return (
    <AppLayout active="discussions" title="Discussion Module" breadcrumb={["Home", "Discussions", "Dashboard"]}>
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
        {[
          [MessageSquare, "Active Threads",   "14", "+3 this week",  C.blue,   C.blueL  ],
          [MessageSquare, "Total Comments",   "89", "+12 today",     C.purple, C.purpleL],
          [Clipboard,     "Meeting Notes",    "6",  "2 this month",  C.green,  C.greenL ],
          [Users,         "Participants",     "23", "across all",    C.indigo, C.indigoL],
        ].map(([Icon, label, val, sub, col, bg]: any) => (
          <div key={label} style={{ background: "white", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.g600 }}>{label}</div>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} color={col} /></div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.g900, letterSpacing: "-0.03em", marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 11, color: C.g400 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20, marginBottom: 20 }}>
        {/* Active Threads */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Active Discussion Threads</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Ongoing decision-linked conversations</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {threads.map((t) => (
              <div key={t.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "14px 16px", background: C.g50, cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Hash size={17} color={C.blue} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 5, lineHeight: 1.3 }}>{t.title}</div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}><MessageSquare size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{t.replies}</span></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}><Users size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{t.participants}</span></div>
                      <span style={{ fontSize: 10, color: C.g400 }}>· {t.updated}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueL, padding: "2px 8px", borderRadius: 10 }}>{t.tag}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.status === "Open" ? C.green : C.g500, background: t.status === "Open" ? C.greenL : C.g100, padding: "3px 9px", borderRadius: 18, flexShrink: 0 }}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Comments</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Latest activity across threads</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {comments.map((c) => (
              <div key={c.id} style={{ padding: "12px 14px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g100}` }}>
                <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", fontSize: 10, fontWeight: 700 }}>{c.avatar}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.g800 }}>{c.author}</span>
                      <span style={{ fontSize: 10, color: C.g400 }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.g600, lineHeight: 1.5, marginBottom: 4 }}>{c.text}</div>
                    <div style={{ fontSize: 10, color: C.blue, fontWeight: 600 }}>in {c.thread}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Meeting Notes + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Recent Meeting Notes */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Meeting Notes</div>
              <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Documented session records</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {meetings.map((m) => (
              <div key={m.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "14px 16px", background: C.g50, cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: m.status === "Completed" ? C.greenL : C.blueL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Clipboard size={18} color={m.status === "Completed" ? C.green : C.blue} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 4, lineHeight: 1.3 }}>{m.title}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}><Calendar size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{m.date}</span></div>
                    <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                    <span style={{ fontSize: 11, color: C.g500 }}>{m.time}</span>
                    <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}><Users size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{m.participants}</span></div>
                  </div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: m.status === "Completed" ? C.green : C.blue, background: m.status === "Completed" ? C.greenL : C.blueL, padding: "3px 9px", borderRadius: 18, flexShrink: 0 }}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discussion Activity */}
        <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 18 }}>Discussion Activity</div>
          <div style={{ position: "relative", paddingLeft: 38 }}>
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={a.id} style={{ position: "relative", paddingBottom: i < activities.length - 1 ? 16 : 0 }}>
                  {i < activities.length - 1 && <div style={{ position: "absolute", left: -22, top: 30, width: 2, height: "calc(100% - 12px)", background: C.g100 }} />}
                  <div style={{ position: "absolute", left: -30, top: 0, width: 24, height: 24, borderRadius: "50%", background: `${a.color}18`, border: `2px solid ${a.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={11} color={a.color} />
                  </div>
                  <div style={{ background: C.g50, borderRadius: 9, padding: "9px 12px", border: `1px solid ${C.g100}` }}>
                    <div style={{ fontSize: 12, color: C.g700, lineHeight: 1.4, marginBottom: 3 }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: C.g400 }}>{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `1px solid ${C.g100}` }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 16 }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {([
            [MessageSquare, "Add Comment",          C.blue,   C.blueL  ],
            [Hash,          "Start Discussion",     C.purple, C.purpleL],
            [Clipboard,     "Add Meeting Notes",    C.green,  C.greenL ],
            [Paperclip,     "Upload Supporting File",C.indigo,C.indigoL],
          ] as const).map(([Icon, label, col, bg]: any) => (
            <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "20px 16px", border: `1px solid ${C.g200}`, borderRadius: 12, background: "white", cursor: "pointer" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${col}22` }}>
                <Icon size={22} color={col} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.g800, textAlign: "center" as const }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: COMMENTS
// ══════════════════════════════════════════════════════════════════
function CommentsScreen() {
  const comments = [
    { id: 1, author: "Dr. Mark Lee",   avatar: "ML", role: "Reviewer", time: "Jan 10, 2026 · 10:32 AM", text: "The ROI analysis in section 3 is compelling. However, I need the vendor comparison updated with the latest pricing before I can move forward with my recommendation. @Sarah Chen — can you provide the updated figures by EOD?", likes: 3, replies: 2, hasFile: false, mine: false },
    { id: 2, author: "Sarah Chen",     avatar: "SC", role: "Submitter", time: "Jan 10, 2026 · 11:15 AM", text: "I have attached the revised feasibility study. Please review sections 3 and 4 specifically — the cost projections have been updated to reflect the latest enterprise licensing rates.", likes: 5, replies: 1, hasFile: true, mine: true },
    { id: 3, author: "M. Johnson",     avatar: "MJ", role: "Manager",   time: "Jan 9, 2026 · 3:45 PM",  text: "@Dr. Lee — can you confirm whether the timeline outlined in the risk assessment (Q2 2025 break-even) is realistic given current team capacity? We need alignment before the board presentation.", likes: 1, replies: 3, hasFile: false, mine: false },
    { id: 4, author: "T. Wright",      avatar: "TW", role: "Admin",     time: "Jan 8, 2026 · 9:00 AM",  text: "Flagging this for priority escalation. The security compliance deadline is end of Q1 and this decision directly impacts our certification timeline. Routing to department heads.", likes: 7, replies: 0, hasFile: false, mine: false },
  ];
  const roleColors: Record<string, [string, string]> = {
    Reviewer: [C.indigoL, C.indigo],
    Submitter:[C.blueL,   C.blue  ],
    Manager:  [C.tealL,   C.teal  ],
    Admin:    [C.purpleL, C.purple],
  };

  return (
    <AppLayout active="discussions" title="Comments" breadcrumb={["Home", "Discussions", "Comments"]}>
      {/* Top bar */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 22 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px" }}>
          <Search size={15} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Search comments…</span>
        </div>
        <select style={{ padding: "10px 14px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g600, cursor: "pointer" }}>
          <option>All Threads</option><option>Cloud Migration</option><option>Q4 Budget</option>
        </select>
        <select style={{ padding: "10px 14px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g600, cursor: "pointer" }}>
          <option>Latest First</option><option>Oldest First</option><option>Most Liked</option>
        </select>
        <button style={{ padding: "10px 18px", border: "none", borderRadius: 10, background: C.blue, color: "white", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <MessageSquare size={15} /> Add Comment
        </button>
      </div>

      {/* Comment list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
        {comments.map((c) => {
          const [rbg, rcol] = roleColors[c.role] || [C.g100, C.g500];
          return (
            <div key={c.id} style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: c.mine ? `2px solid ${C.blue}30` : `1px solid ${C.g100}` }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>{c.avatar}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: C.g900 }}>{c.author}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: rcol, background: rbg, padding: "2px 8px", borderRadius: 10 }}>{c.role}</span>
                      {c.mine && <span style={{ fontSize: 10, fontWeight: 700, color: C.blue, background: C.blueL, padding: "2px 8px", borderRadius: 10 }}>You</span>}
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: C.g400 }}>{c.time}</span>
                      {c.mine && (
                        <div style={{ display: "flex", gap: 4 }}>
                          <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Edit3 size={12} color={C.g500} /></button>
                          <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><Trash2 size={12} color={C.red} /></button>
                        </div>
                      )}
                      <button style={{ padding: "4px 8px", border: `1px solid ${C.g200}`, borderRadius: 6, background: "white", cursor: "pointer" }}><MoreHorizontal size={12} color={C.g500} /></button>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: C.g700, lineHeight: 1.7, margin: "0 0 12px" }}>{c.text}</p>
                  {c.hasFile && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 8, marginBottom: 12, width: "fit-content" }}>
                      <Paperclip size={13} color={C.blue} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.blue }}>Cloud_Migration_Feasibility_v2.pdf</span>
                      <span style={{ fontSize: 11, color: C.g400 }}>· 1.1 MB</span>
                      <Download size={13} color={C.g400} />
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                      <ThumbsUp size={14} color={C.g400} />
                      <span style={{ fontSize: 12, color: C.g500 }}>{c.likes}</span>
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                      <Reply size={14} color={C.g400} />
                      <span style={{ fontSize: 12, color: C.g500 }}>Reply {c.replies > 0 ? `(${c.replies})` : ""}</span>
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                      <AtSign size={14} color={C.g400} />
                      <span style={{ fontSize: 12, color: C.g500 }}>Mention</span>
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer" }}>
                      <Paperclip size={14} color={C.g400} />
                      <span style={{ fontSize: 12, color: C.g500 }}>Attach</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New comment composer */}
      <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: `2px solid ${C.blue}30` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.g800, marginBottom: 14 }}>Add a Comment</div>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>JD</span>
          </div>
          <div style={{ flex: 1, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 10, padding: "12px 16px", minHeight: 80 }}>
            <span style={{ fontSize: 13, color: C.g300 }}>Write your comment… use @ to mention teammates</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[AtSign, Paperclip, Link2].map((Icon, i) => (
              <button key={i} style={{ padding: "7px 10px", border: `1px solid ${C.g200}`, borderRadius: 8, background: "white", cursor: "pointer" }}><Icon size={14} color={C.g500} /></button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "9px 18px", border: `1px solid ${C.g200}`, borderRadius: 9, background: "white", fontSize: 13, color: C.g600, cursor: "pointer" }}>Cancel</button>
            <button style={{ padding: "9px 18px", border: "none", borderRadius: 9, background: C.blue, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Post Comment</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: DISCUSSION THREADS
// ══════════════════════════════════════════════════════════════════
function DiscussionThreadsScreen() {
  const threads = [
    { id: 1, title: "Cloud Infrastructure Migration — Technical Concerns",    creator: "Dr. Mark Lee", creatorAvatar: "ML", participants: ["SC","MJ","TW","LP"], replies: 12, status: "Open",     tag: "Technology", updated: "30 min ago",  summary: "Debate on phased vs. big-bang approach for cloud migration. Key concern: team readiness for Q1 2025 launch." },
    { id: 2, title: "Remote Work Policy Revision — HR & Legal Alignment",       creator: "Sarah Chen",   creatorAvatar: "SC", participants: ["MJ","TW"],          replies: 8,  status: "Open",     tag: "HR Policy",  updated: "2 hours ago", summary: "Hybrid model agreement pending sign-off from legal. Draft policy shared for review." },
    { id: 3, title: "Q1 Budget Allocation — Finance Review",                    creator: "M. Johnson",   creatorAvatar: "MJ", participants: ["SC","TW","LP","AR"], replies: 5,  status: "Resolved", tag: "Finance",    updated: "5 hours ago", summary: "Budget breakdown approved. Action item: VP sign-off before Dec 31." },
    { id: 4, title: "Security Compliance Framework — Stakeholder Alignment",    creator: "T. Wright",    creatorAvatar: "TW", participants: ["LP","AR"],           replies: 9,  status: "Open",     tag: "Security",   updated: "1 day ago",   summary: "Compliance gaps identified in legacy data handling. Escalated for immediate resolution." },
    { id: 5, title: "New Vendor Onboarding — Procurement Process Design",       creator: "L. Park",      creatorAvatar: "LP", participants: ["SC","MJ"],          replies: 3,  status: "Open",     tag: "Procurement",updated: "2 days ago",  summary: "New onboarding SOP drafted. Awaiting procurement head approval." },
  ];
  const statusCol = (s: string) => s === "Open" ? C.green : C.g500;
  const statusBg  = (s: string) => s === "Open" ? C.greenL : C.g100;

  return (
    <AppLayout active="discussions" title="Discussion Threads" breadcrumb={["Home", "Discussions", "Threads"]}>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 22 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px" }}>
          <Search size={15} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Search threads…</span>
        </div>
        <select style={{ padding: "10px 14px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g600 }}>
          <option>All Status</option><option>Open</option><option>Resolved</option>
        </select>
        <select style={{ padding: "10px 14px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g600 }}>
          <option>All Categories</option><option>Technology</option><option>Finance</option>
        </select>
        <button style={{ padding: "10px 18px", border: "none", borderRadius: 10, background: C.blue, color: "white", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
          <Plus size={15} /> New Thread
        </button>
      </div>

      {/* Thread list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {threads.map((t) => (
          <div key={t.id} style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: `1px solid ${C.g100}`, cursor: "pointer" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Hash size={20} color={C.blue} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Title row */}
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, flex: 1, lineHeight: 1.3 }}>{t.title}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: statusCol(t.status), background: statusBg(t.status), padding: "3px 10px", borderRadius: 18, flexShrink: 0 }}>{t.status}</span>
                </div>
                {/* Meta */}
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>{t.creatorAvatar}</span>
                    </div>
                    <span style={{ fontSize: 12, color: C.g600 }}>{t.creator}</span>
                  </div>
                  <span style={{ fontSize: 11, color: C.blue, background: C.blueL, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>{t.tag}</span>
                  <div style={{ display: "flex", gap: 3, alignItems: "center" }}><MessageSquare size={12} color={C.g400} /><span style={{ fontSize: 12, color: C.g500 }}>{t.replies} replies</span></div>
                  <span style={{ fontSize: 11, color: C.g400 }}>Updated {t.updated}</span>
                </div>
                {/* Discussion summary */}
                <div style={{ fontSize: 13, color: C.g600, lineHeight: 1.6, marginBottom: 12, padding: "10px 14px", background: C.g50, borderRadius: 8, borderLeft: `3px solid ${C.blue}` }}>
                  <span style={{ fontWeight: 600, color: C.g500, fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Summary — </span>{t.summary}
                </div>
                {/* Participants + actions */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: C.g500 }}>Participants:</span>
                    <div style={{ display: "flex" }}>
                      {t.participants.map((p, i) => (
                        <div key={p} style={{ width: 26, height: 26, borderRadius: "50%", background: `hsl(${i * 60},60%,50%)`, border: "2px solid white", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ padding: "7px 14px", border: `1px solid ${C.g200}`, borderRadius: 8, background: "white", fontSize: 12, color: C.g600, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}><Reply size={13} /> Reply</button>
                    {t.status === "Open" && <button style={{ padding: "7px 14px", border: `1px solid ${C.green}40`, borderRadius: 8, background: C.greenL, fontSize: 12, color: C.green, fontWeight: 600, cursor: "pointer" }}>Resolve</button>}
                    <button style={{ padding: "7px 14px", border: `1px solid ${C.g200}`, borderRadius: 8, background: "white", fontSize: 12, color: C.blue, display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}><Eye size={13} /> View</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: MEETING NOTES
// ══════════════════════════════════════════════════════════════════
function MeetingNotesScreen() {
  const actionItems = [
    { id: 1, task: "Update vendor comparison with latest enterprise pricing",  owner: "Sarah Chen",  due: "Jan 13, 2026", done: true  },
    { id: 2, task: "Provide risk assessment timeline confirmation",            owner: "Dr. Mark Lee", due: "Jan 14, 2026", done: false },
    { id: 3, task: "Share revised cloud architecture diagram with DevOps team",owner: "T. Wright",    due: "Jan 15, 2026", done: false },
    { id: 4, task: "Obtain VP sign-off on Q4 budget proposal",                owner: "M. Johnson",   due: "Jan 17, 2026", done: false },
  ];
  const decisions = [
    { id: 1, decision: "Full cloud migration approved in principle pending final cost review" },
    { id: 2, decision: "Timeline set: Q2 2025 for primary workload migration" },
    { id: 3, decision: "Engineering team lead to own vendor coordination" },
  ];
  const agenda = [
    "Review Q4 budget allocation proposal",
    "Discuss cloud migration feasibility study findings",
    "Risk assessment review — timeline and mitigation strategies",
    "Vendor shortlist finalization",
    "Next steps and action item assignment",
  ];

  return (
    <AppLayout active="discussions" title="Meeting Notes" breadcrumb={["Home", "Discussions", "Meeting Notes"]}>
      {/* Header card */}
      <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, background: C.greenL, padding: "3px 10px", borderRadius: 18 }}>Completed</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueL, padding: "3px 10px", borderRadius: 18 }}>Q4 Budget Review</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: C.g900, letterSpacing: "-0.02em", margin: "0 0 8px" }}>Q4 Technology Budget Review — Finance & Engineering</h2>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Calendar size={14} color={C.g400} /><span style={{ fontSize: 13, color: C.g600 }}>January 10, 2026 · 10:00 AM – 11:30 AM</span></div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Users size={14} color={C.g400} /><span style={{ fontSize: 13, color: C.g600 }}>6 participants</span></div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}><MapPin size={14} color={C.g400} /><span style={{ fontSize: 13, color: C.g600 }}>Conference Room B / Zoom</span></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ padding: "9px 16px", border: `1px solid ${C.g200}`, borderRadius: 9, background: "white", fontSize: 13, color: C.g700, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}><Paperclip size={14} /> Attach Minutes</button>
            <button style={{ padding: "9px 16px", border: "none", borderRadius: 9, background: C.blue, color: "white", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}><Download size={14} /> Export Notes</button>
          </div>
        </div>
        {/* Participants */}
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.g600, marginBottom: 12 }}>Participants</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[["Sarah Chen", "SC", "Submitter"], ["Dr. Mark Lee", "ML", "Reviewer"], ["M. Johnson", "MJ", "Manager"], ["T. Wright", "TW", "Admin"], ["L. Park", "LP", "Viewer"], ["A. Rivera", "AR", "Viewer"]].map(([name, av, role]) => (
              <div key={name} style={{ display: "flex", gap: 7, alignItems: "center", padding: "6px 12px", background: C.g50, borderRadius: 20, border: `1px solid ${C.g200}` }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 8, fontWeight: 700 }}>{av}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.g700 }}>{name}</span>
                <span style={{ fontSize: 10, color: C.g400 }}>({role})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Agenda */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center" }}><Clipboard size={17} color={C.blue} /></div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900 }}>Agenda</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {agenda.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px", background: C.g50, borderRadius: 9, border: `1px solid ${C.g100}` }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.blueL, border: `1px solid ${C.blueMid}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.blue }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 13, color: C.g700 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discussion Summary */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.purpleL, display: "flex", alignItems: "center", justifyContent: "center" }}><MessageSquare size={17} color={C.purple} /></div>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900 }}>Discussion Summary</div>
          </div>
          <p style={{ fontSize: 13, color: C.g700, lineHeight: 1.8, margin: "0 0 14px" }}>
            The team reviewed the Q4 budget proposal for cloud infrastructure investment. Dr. Lee highlighted the ROI projections as strong but raised concerns about team capacity for the Q1 2025 migration timeline. Sarah Chen presented the updated vendor comparison with revised enterprise pricing.
          </p>
          <p style={{ fontSize: 13, color: C.g700, lineHeight: 1.8, margin: 0 }}>
            Key debate centered on full cloud migration vs. hybrid approach. Consensus reached on phased cloud migration with Q2 2025 as the primary workload target, providing buffer for team upskilling and compliance verification.
          </p>
        </div>
      </div>

      {/* Decisions Taken */}
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: C.greenL, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={17} color={C.green} /></div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.g900 }}>Decisions Taken</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {decisions.map((d) => (
            <div key={d.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 16px", background: C.greenL, border: `1px solid ${C.green}30`, borderRadius: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={13} color="white" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.g800 }}>{d.decision}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: C.amberL, display: "flex", alignItems: "center", justifyContent: "center" }}><CheckSquare size={17} color={C.amber} /></div>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.g900 }}>Action Items</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {actionItems.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px 16px", background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: item.done ? C.greenL : C.g100, border: `2px solid ${item.done ? C.green : C.g300}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.done && <Check size={12} color={C.green} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.done ? C.g400 : C.g800, textDecoration: item.done ? "line-through" : "none", marginBottom: 3 }}>{item.task}</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}><Users size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>{item.owner}</span></div>
                  <span style={{ fontSize: 10, color: C.g300 }}>·</span>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}><Calendar size={11} color={C.g400} /><span style={{ fontSize: 11, color: C.g500 }}>Due {item.due}</span></div>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: item.done ? C.green : C.amber, background: item.done ? C.greenL : C.amberL, padding: "3px 10px", borderRadius: 18 }}>{item.done ? "Done" : "Pending"}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: EMAIL SERVICE
// ══════════════════════════════════════════════════════════════════
function EmailServiceScreen() {
  const conversations = [
    { id: 1, from: "Dr. Mark Lee",   avatar: "ML", subject: "Re: Cloud Infrastructure — Review Request",   time: "10 min ago",  unread: true,  snippet: "The updated feasibility study looks good. I'll circulate to the team..." },
    { id: 2, from: "Sarah Chen",     avatar: "SC", subject: "Q4 Budget — Final Numbers Attached",           time: "1 hour ago",  unread: true,  snippet: "Please find the revised budget breakdown attached. Note the changes in..." },
    { id: 3, from: "M. Johnson",     avatar: "MJ", subject: "Manager Approval — DEC-3150",                 time: "3 hours ago", unread: false, snippet: "DEC-3150 has been escalated and requires your sign-off before end of..." },
    { id: 4, from: "Support Team",   avatar: "ST", subject: "Re: Ticket #TKT-0048 Resolved",               time: "Yesterday",   unread: false, snippet: "Your support ticket has been resolved. Please confirm the resolution..." },
    { id: 5, from: "T. Wright",      avatar: "TW", subject: "Security Compliance — Action Required",       time: "2 days ago",  unread: false, snippet: "Three items in the compliance checklist remain open and must be addressed..." },
  ];
  const sentEmails = [
    { id: 1, to: "Dr. Mark Lee",  subject: "Feasibility Study — Version 2 Attached",    time: "2 hours ago",  status: "Read"      },
    { id: 2, to: "Manager Team",  subject: "Q4 Budget Proposal — Review Requested",     time: "5 hours ago",  status: "Delivered" },
    { id: 3, to: "All Reviewers", subject: "Cloud Migration — Stakeholder Alignment",   time: "Yesterday",    status: "Sent"      },
    { id: 4, to: "L. Park",       subject: "Vendor Comparison Matrix — Please Review",  time: "2 days ago",   status: "Read"      },
  ];
  const statusCol = (s: string) => s === "Read" ? C.green : s === "Delivered" ? C.blue : C.amber;
  const statusBg  = (s: string) => s === "Read" ? C.greenL : s === "Delivered" ? C.blueL : C.amberL;

  return (
    <AppLayout active="email" title="Email Service" breadcrumb={["Home", "Email Service"]}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

        {/* ── Left: Compose + Inbox ──────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Compose Email */}
          <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center" }}><Mail size={18} color={C.blue} /></div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Compose Email</div>
                <div style={{ fontSize: 12, color: C.g400, marginTop: 1 }}>Send to members within your organization</div>
              </div>
            </div>

            {/* Recipient Selector */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.g600, textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>Recipient Type</label>
              <div style={{ display: "flex", gap: 8 }}>
                {(["Employee","Reviewer","Manager","Administrator"] as const).map((role, i) => (
                  <button key={role} style={{ flex: 1, padding: "9px 12px", border: `1.5px solid ${i === 0 ? C.blue : C.g200}`, borderRadius: 9, background: i === 0 ? C.blueL : "white", fontSize: 12, fontWeight: 600, color: i === 0 ? C.blue : C.g600, cursor: "pointer" }}>{role}</button>
                ))}
              </div>
            </div>

            {/* To / Search User */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.g600, textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>To</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px", background: C.g50 }}>
                <Search size={14} color={C.g400} />
                <span style={{ fontSize: 13, color: C.g300, flex: 1 }}>Search user by name or role…</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {["ML", "SC", "MJ"].map(av => (
                    <div key={av} style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>{av}</span>
                    </div>
                  ))}
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.g100, border: `1px dashed ${C.g300}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={12} color={C.g400} />
                  </div>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.g600, textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>Subject</label>
              <div style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px", background: C.g50 }}>
                <span style={{ fontSize: 13, color: C.g300 }}>Enter email subject…</span>
              </div>
            </div>

            {/* Priority */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.g600, textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>Priority</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[["Low", C.green, C.greenL], ["Medium", C.amber, C.amberL], ["High", C.red, C.redL]].map(([label, col, bg], i) => (
                  <button key={label} style={{ padding: "8px 20px", border: `1.5px solid ${i === 0 ? col : C.g200}`, borderRadius: 9, background: i === 0 ? bg : "white", fontSize: 12, fontWeight: 700, color: i === 0 ? col as string : C.g500, cursor: "pointer" }}>{label as string}</button>
                ))}
              </div>
            </div>

            {/* Message Body */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.g600, textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>Message</label>
              <div style={{ border: `1px solid ${C.g200}`, borderRadius: 10, background: C.g50, overflow: "hidden" }}>
                {/* Toolbar */}
                <div style={{ padding: "8px 12px", borderBottom: `1px solid ${C.g200}`, display: "flex", gap: 10 }}>
                  {["B", "I", "U"].map(f => <button key={f} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${C.g200}`, background: "white", fontSize: 12, fontWeight: 800, color: C.g600, cursor: "pointer" }}>{f}</button>)}
                  <div style={{ width: 1, background: C.g200, margin: "2px 4px" }} />
                  {[Link2, Paperclip].map((Icon, i) => <button key={i} style={{ padding: "4px 6px", border: `1px solid ${C.g200}`, borderRadius: 5, background: "white", cursor: "pointer" }}><Icon size={13} color={C.g500} /></button>)}
                </div>
                <div style={{ padding: "14px 16px", minHeight: 120 }}>
                  <span style={{ fontSize: 13, color: C.g300 }}>Write your message here…</span>
                </div>
              </div>
            </div>

            {/* Attachment */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.g600, textTransform: "uppercase" as const, letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>Attachments</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `1px dashed ${C.g300}`, borderRadius: 10, background: C.g50, cursor: "pointer" }}>
                <Paperclip size={15} color={C.g400} />
                <span style={{ fontSize: 13, color: C.g400 }}>Attach files (PDF, DOCX, XLSX — Max 25MB)</span>
                <button style={{ marginLeft: "auto", padding: "5px 12px", border: `1px solid ${C.g200}`, borderRadius: 7, background: "white", fontSize: 12, color: C.g600, cursor: "pointer" }}>Browse</button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g600, cursor: "pointer" }}>
                <Archive size={15} /> Save Draft
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ padding: "10px 18px", border: `1px solid ${C.g200}`, borderRadius: 10, background: "white", fontSize: 13, color: C.g600, cursor: "pointer" }}>Discard</button>
                <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", border: "none", borderRadius: 10, background: C.blue, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
                  <Send size={15} /> Send Email
                </button>
              </div>
            </div>
          </div>

          {/* Recent Conversations */}
          <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Recent Conversations</div>
                <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>Your inbox — latest messages</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 8, padding: "7px 12px" }}>
                  <Search size={13} color={C.g400} /><span style={{ fontSize: 12, color: C.g400 }}>Search…</span>
                </div>
                <button style={{ padding: "7px 12px", border: `1px solid ${C.g200}`, borderRadius: 8, background: "white", fontSize: 12, color: C.g600, cursor: "pointer" }}>Filter</button>
              </div>
            </div>
            {conversations.map((conv) => (
              <div key={conv.id} style={{ padding: "16px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", background: conv.unread ? "#FAFBFF" : "white" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2563EB,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>{conv.avatar}</span>
                  </div>
                  {conv.unread && <div style={{ position: "absolute", top: 0, right: 0, width: 12, height: 12, background: C.blue, borderRadius: "50%", border: "2px solid white" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: conv.unread ? 700 : 500, color: C.g900 }}>{conv.from}</span>
                    <span style={{ fontSize: 11, color: C.g400, flexShrink: 0, marginLeft: 8 }}>{conv.time}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: conv.unread ? 600 : 400, color: conv.unread ? C.g800 : C.g600, marginBottom: 3 }}>{conv.subject}</div>
                  <div style={{ fontSize: 12, color: C.g400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{conv.snippet}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel ────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Recent Sent Emails */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 18 }}>Recent Sent Emails</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sentEmails.map((e) => (
                <div key={e.id} style={{ padding: "12px 14px", borderRadius: 10, background: C.g50, border: `1px solid ${C.g100}`, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.g800 }}>To: {e.to}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: statusCol(e.status), background: statusBg(e.status), padding: "2px 8px", borderRadius: 10 }}>{e.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.g600, marginBottom: 4, lineHeight: 1.4 }}>{e.subject}</div>
                  <div style={{ fontSize: 11, color: C.g400 }}>{e.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Status Summary */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 18 }}>Email Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Sent", "24", C.blue, C.blueL, Send], ["Delivered", "22", C.green, C.greenL, Check], ["Read", "18", C.purple, C.purpleL, Eye]].map(([label, count, col, bg, Icon]: any) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: bg, borderRadius: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color={col} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: col, flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: col, letterSpacing: "-0.03em" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick compose info */}
          <div style={{ background: `linear-gradient(135deg,${C.blue},#7C3AED)`, borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "white", marginBottom: 8 }}>Secure Internal Email</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 16 }}>All emails are end-to-end encrypted and stored securely within the organization's EDRP platform.</div>
            <div style={{ display: "flex", gap: 8, flexDirection: "column" as const }}>
              {["End-to-end encrypted", "Audit trail logged", "Role-based access"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={9} color="white" /></div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: SUPPORT CENTER
// ══════════════════════════════════════════════════════════════════
function SupportCenterScreen() {
  const tickets = [
    { id: "TKT-0051", category: "Technical Issue", subject: "Cannot upload documents to DEC-3150",     priority: "High",   status: "Open",        agent: "Alex R.",  created: "Jan 10, 2026", updated: "2 hours ago"  },
    { id: "TKT-0048", category: "Account Access",  subject: "Password reset not receiving email",      priority: "Medium", status: "Resolved",    agent: "Maya S.",  created: "Jan 8, 2026",  updated: "Yesterday"    },
    { id: "TKT-0043", category: "Data Export",     subject: "Report export failing for date range Q4", priority: "Low",    status: "In Progress", agent: "Chris T.", created: "Jan 6, 2026",  updated: "3 days ago"   },
  ];
  const faqs = [
    { q: "How do I create a new decision?",                ans: "Navigate to 'Create Decision' in the sidebar. Follow the 4-step guided wizard to submit." },
    { q: "How do I track approval status?",                ans: "Open any decision from 'My Decisions' to view the full Approval Chain in real time." },
    { q: "Can I edit a submitted decision?",               ans: "Yes — decisions in Draft or Review status can be edited. Approved decisions are locked." },
    { q: "How do I add a reviewer to my decision?",        ans: "In Step 4 of the Create Decision Wizard, search and assign reviewers by name or role." },
    { q: "What file formats can I upload as documents?",   ans: "PDF, DOCX, XLSX, and PPTX are supported. Maximum file size is 50 MB per file." },
  ];
  const chatMessages = [
    { from: "user",    text: "I can't upload a PDF to DEC-3150. It gives a 413 error.",                     time: "10:32 AM" },
    { from: "support", text: "I can see the issue — your organization's upload limit is set to 10MB. The PDF you are trying to upload is 14MB. Try compressing it or contact your admin to raise the limit.", time: "10:33 AM" },
    { from: "user",    text: "How do I compress a PDF on Windows?",                                          time: "10:34 AM" },
    { from: "support", text: "You can use Adobe Acrobat (File → Compress PDF) or a free tool like ilovepdf.com. Once compressed, try uploading again.", time: "10:35 AM" },
  ];
  const suggestions = ["How do I reset my password?", "Explain the approval workflow", "How do I export a report?", "What is a decision rationale?"];

  const priCol = (p: string) => p === "High" ? C.red : p === "Medium" ? C.amber : C.green;
  const priBg  = (p: string) => p === "High" ? C.redL : p === "Medium" ? C.amberL : C.greenL;
  const stCol  = (s: string) => s === "Open" ? C.blue : s === "Resolved" ? C.green : C.amber;
  const stBg   = (s: string) => s === "Open" ? C.blueL : s === "Resolved" ? C.greenL : C.amberL;

  return (
    <AppLayout active="support" title="Support Center" breadcrumb={["Home", "Support Center"]}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

        {/* ── Left Column ────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Search Help Articles */}
          <div style={{ background: `linear-gradient(135deg,${C.navy} 0%,#1E2D4F 100%)`, borderRadius: 16, padding: "28px 32px", position: "relative" as const, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(37,99,235,0.15)" }} />
            <div style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.02em", marginBottom: 6 }}>How can we help you?</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Search our knowledge base or start an AI-powered support chat</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, padding: "12px 16px" }}>
                <Search size={16} color="rgba(255,255,255,0.6)" />
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Search help articles, FAQs, guides…</span>
              </div>
              <button style={{ padding: "12px 20px", border: "none", borderRadius: 10, background: C.blue, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>Search</button>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {([
              [Bot,       "AI Support Chat",     C.purple, C.purpleL],
              [Edit3,     "Ask a Question",      C.blue,   C.blueL  ],
              [AlertCircle,"Report an Issue",    C.red,    C.redL   ],
              [Ticket,    "Create Ticket",       C.amber,  C.amberL ],
            ] as const).map(([Icon, label, col, bg]: any) => (
              <button key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "18px 12px", border: `1px solid ${C.g200}`, borderRadius: 12, background: "white", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} color={col} /></div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.g700, textAlign: "center" as const }}>{label}</span>
              </button>
            ))}
          </div>

          {/* AI Support Chat */}
          <div style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}`, overflow: "hidden" }}>
            <div style={{ padding: "16px 22px", borderBottom: `1px solid ${C.g100}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.purpleL, display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={18} color={C.purple} /></div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.g900 }}>AI Support Chat</div>
                <div style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>● Online — Typical response &lt;1 min</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 12, color: C.g400 }}>Ticket #TKT-0051</div>
            </div>

            {/* Chat messages */}
            <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 14, minHeight: 200 }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", flexDirection: msg.from === "user" ? "row-reverse" : "row" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: msg.from === "user" ? "linear-gradient(135deg,#2563EB,#7C3AED)" : C.purpleL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {msg.from === "user" ? <span style={{ color: "white", fontSize: 10, fontWeight: 700 }}>JD</span> : <Bot size={15} color={C.purple} />}
                  </div>
                  <div style={{ maxWidth: "75%" }}>
                    <div style={{ padding: "10px 14px", borderRadius: msg.from === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px", background: msg.from === "user" ? C.blue : C.g50, border: msg.from === "user" ? "none" : `1px solid ${C.g200}` }}>
                      <div style={{ fontSize: 13, color: msg.from === "user" ? "white" : C.g700, lineHeight: 1.6 }}>{msg.text}</div>
                    </div>
                    <div style={{ fontSize: 10, color: C.g400, marginTop: 4, textAlign: msg.from === "user" ? "right" as const : "left" as const }}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Questions */}
            <div style={{ padding: "0 22px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.g500, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: 8 }}>Suggested Questions</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                {suggestions.map(s => (
                  <button key={s} style={{ fontSize: 11, fontWeight: 600, color: C.blue, background: C.blueL, border: `1px solid ${C.blueMid}`, borderRadius: 18, padding: "5px 12px", cursor: "pointer" }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div style={{ padding: "14px 22px", borderTop: `1px solid ${C.g100}`, display: "flex", gap: 10, alignItems: "center" }}>
              <button style={{ padding: "8px", border: `1px solid ${C.g200}`, borderRadius: 8, background: "white", cursor: "pointer" }}><Paperclip size={16} color={C.g400} /></button>
              <div style={{ flex: 1, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px" }}>
                <span style={{ fontSize: 13, color: C.g300 }}>Type your message…</span>
              </div>
              <button style={{ padding: "10px 16px", border: "none", borderRadius: 10, background: C.blue, color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}><Send size={14} /> Send</button>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 18 }}>Frequently Asked Questions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${C.g100}` : "none", padding: "14px 0" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: C.blue }}>Q</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.g800, marginBottom: 6 }}>{faq.q}</div>
                      <div style={{ fontSize: 13, color: C.g600, lineHeight: 1.6 }}>{faq.ans}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Ticket Status Summary */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 18 }}>Ticket Status</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Open", "1", C.blue, C.blueL], ["In Progress", "1", C.amber, C.amberL], ["Resolved", "5", C.green, C.greenL]].map(([label, count, col, bg]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: bg as string, borderRadius: 10 }}>
                  <Circle size={10} color={col as string} fill={col as string} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: col as string, flex: 1 }}>{label}</span>
                  <span style={{ fontSize: 20, fontWeight: 900, color: col as string }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Support Requests */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>Previous Requests</div>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.blue, cursor: "pointer" }}>View all →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tickets.map((t) => (
                <div key={t.id} style={{ border: `1px solid ${C.g200}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.g500, fontFamily: "monospace" }}>{t.id}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: stCol(t.status), background: stBg(t.status), padding: "2px 8px", borderRadius: 10 }}>{t.status}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g800, marginBottom: 8, lineHeight: 1.3 }}>{t.subject}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: priCol(t.priority), background: priBg(t.priority), padding: "2px 8px", borderRadius: 10 }}>{t.priority}</span>
                    <span style={{ fontSize: 11, color: C.g400 }}>{t.category}</span>
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.g100}`, display: "flex", flexDirection: "column" as const, gap: 4 }}>
                    {[["Agent", t.agent], ["Created", t.created], ["Updated", t.updated]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 11, color: C.g400 }}>{k}</span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: C.g600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div style={{ background: "white", borderRadius: 16, padding: 22, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em", marginBottom: 14 }}>Contact Support</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {([
                [Mail,       "Email Support",  "support@edrp.enterprise.com", C.blue,   C.blueL  ],
                [LifeBuoy,   "Live Chat",      "Available 9 AM – 6 PM IST",   C.green,  C.greenL ],
                [HelpCircle, "Help Docs",      "docs.edrp.enterprise.com",    C.purple, C.purpleL],
              ] as const).map(([Icon, label, detail, col, bg]: any) => (
                <div key={label} style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", background: bg, borderRadius: 10, cursor: "pointer" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon size={17} color={col} /></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: col }}>{label}</div>
                    <div style={{ fontSize: 11, color: C.g500 }}>{detail}</div>
                  </div>
                  <ChevronRight size={14} color={col} style={{ marginLeft: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// SCREEN: SETTINGS
// ══════════════════════════════════════════════════════════════════
function SettingsScreen() {
  const activeSection = "general";

  const navSections = [
    { id: "general",    label: "General",              Icon: Settings  },
    { id: "security",   label: "Security",             Icon: Lock      },
    { id: "notif",      label: "Notifications",        Icon: Bell      },
    { id: "privacy",    label: "Privacy",              Icon: Shield    },
    { id: "decisions",  label: "Decision Preferences", Icon: FileText  },
    { id: "system",     label: "System Preferences",   Icon: Database  },
    { id: "danger",     label: "Danger Zone",          Icon: AlertTriangle },
  ];

  function Toggle({ on }: { on: boolean }) {
    return (
      <div style={{ width: 44, height: 24, borderRadius: 12, background: on ? C.blue : C.g300, position: "relative" as const, flexShrink: 0, cursor: "pointer" }}>
        <div style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.18)", transition: "left 0.15s" }} />
      </div>
    );
  }

  function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: `1px solid ${C.g100}` }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.g800 }}>{label}</div>
          {hint && <div style={{ fontSize: 12, color: C.g400, marginTop: 3 }}>{hint}</div>}
        </div>
        <div style={{ flexShrink: 0, marginLeft: 24 }}>{children}</div>
      </div>
    );
  }

  function Select({ value }: { value: string }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.g200}`, borderRadius: 9, padding: "8px 14px", background: "white", cursor: "pointer", minWidth: 180 }}>
        <span style={{ fontSize: 13, color: C.g700, flex: 1 }}>{value}</span>
        <ChevronDown size={14} color={C.g400} />
      </div>
    );
  }

  function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g200}`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", marginBottom: 20 }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.g900, letterSpacing: "-0.01em" }}>{title}</div>
        </div>
        <div style={{ padding: "0 24px" }}>{children}</div>
      </div>
    );
  }

  return (
    <AppLayout active="settings" title="Settings" breadcrumb={["Home", "Settings"]}>
      {/* Subtitle */}
      <div style={{ fontSize: 14, color: C.g500, marginBottom: 24 }}>
        Manage your account preferences, security and application settings.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 22, alignItems: "start" }}>

        {/* ── Left settings nav ─────────────────────────── */}
        <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g200}`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", overflow: "hidden", position: "sticky" as const, top: 0 }}>
          {navSections.map(({ id, label, Icon }, i) => {
            const active = id === activeSection;
            const isDanger = id === "danger";
            return (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", cursor: "pointer", background: active ? C.blueL : "transparent", borderLeft: `3px solid ${active ? C.blue : "transparent"}`, borderBottom: i < navSections.length - 1 ? `1px solid ${C.g100}` : "none" }}>
                <Icon size={16} color={active ? C.blue : isDanger ? C.red : C.g400} />
                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? C.blue : isDanger ? C.red : C.g600 }}>{label}</span>
              </div>
            );
          })}
        </div>

        {/* ── Right content area ────────────────────────── */}
        <div>

          {/* GENERAL */}
          <SectionCard title="General">
            <Field label="Language" hint="Select your preferred interface language">
              <Select value="English (US)" />
            </Field>
            <Field label="Time Zone" hint="All dates and times will display in this zone">
              <Select value="Asia/Kolkata (IST)" />
            </Field>
            <Field label="Date Format" hint="Choose how dates are displayed throughout the app">
              <Select value="DD / MM / YYYY" />
            </Field>
            <Field label="Theme" hint="Choose your preferred color theme">
              <div style={{ display: "flex", gap: 16 }}>
                {["Light", "Dark", "System Default"].map((opt, i) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${i === 0 ? C.blue : C.g300}`, background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {i === 0 && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue }} />}
                    </div>
                    <span style={{ fontSize: 13, color: C.g700 }}>{opt}</span>
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Default Dashboard" hint="The view you see when you first sign in">
              <Select value="Decision Management" />
            </Field>
          </SectionCard>

          {/* SECURITY */}
          <SectionCard title="Security">
            {/* Change Password */}
            <div style={{ padding: "18px 0", borderBottom: `1px solid ${C.g100}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.g800, marginBottom: 14 }}>Change Password</div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                {["Current Password", "New Password", "Confirm Password"].map((lbl) => (
                  <div key={lbl}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: C.g600, display: "block", marginBottom: 5 }}>{lbl}</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.g200}`, borderRadius: 9, padding: "9px 14px", background: "white" }}>
                      <Lock size={14} color={C.g400} />
                      <span style={{ fontSize: 13, color: C.g300, flex: 1, letterSpacing: "0.12em" }}>••••••••••••</span>
                      <Eye size={14} color={C.g400} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 4 }}>
                  <button style={{ padding: "9px 20px", borderRadius: 9, border: "none", background: C.blue, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Update Password</button>
                </div>
              </div>
            </div>

            <Field label="Two-Factor Authentication" hint="Add an extra layer of security to your account">
              <Toggle on={true} />
            </Field>

            {/* Active Sessions */}
            <div style={{ padding: "18px 0" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.g800, marginBottom: 14 }}>Active Sessions</div>
              <div style={{ border: `1px solid ${C.g200}`, borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.blueL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Activity size={20} color={C.blue} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>Windows 11 · Chrome 120</div>
                  <div style={{ fontSize: 12, color: C.g500, marginTop: 2 }}>Last login: Jan 12, 2026 · 09:45 AM IST</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.green, marginTop: 3 }}>● Current session</div>
                </div>
                <button style={{ padding: "7px 16px", border: `1px solid ${C.g200}`, borderRadius: 8, background: "white", fontSize: 12, color: C.g600, cursor: "pointer" }}>This device</button>
              </div>
              <button style={{ padding: "9px 20px", border: `1px solid ${C.red}40`, borderRadius: 9, background: C.redL, color: C.red, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Logout All Other Devices
              </button>
            </div>
          </SectionCard>

          {/* NOTIFICATIONS */}
          <SectionCard title="Notifications">
            {[
              ["Email Notifications",           true,  "Receive updates via your registered email"],
              ["In-App Notifications",          true,  "Show alerts inside the platform"],
              ["Decision Updates",              true,  "Notify when a decision you own is updated"],
              ["Approval Requests",             true,  "Alert when a decision requires your approval"],
              ["Discussion Replies",            false, "Notify when someone replies in a thread you follow"],
              ["Knowledge Repository Updates",  false, "Alert when new documents are added"],
              ["Weekly Summary Emails",         true,  "Receive a weekly digest every Monday morning"],
            ].map(([label, on, hint]) => (
              <Field key={label as string} label={label as string} hint={hint as string}>
                <Toggle on={on as boolean} />
              </Field>
            ))}
          </SectionCard>

          {/* PRIVACY */}
          <SectionCard title="Privacy">
            {[
              ["Show Online Status",  true,  "Let others see when you are active"],
              ["Profile Visibility",  true,  "Allow other users to view your profile"],
              ["Activity Visibility", false, "Show your recent decisions and actions to your team"],
            ].map(([label, on, hint]) => (
              <Field key={label as string} label={label as string} hint={hint as string}>
                <Toggle on={on as boolean} />
              </Field>
            ))}
          </SectionCard>

          {/* DECISION PREFERENCES */}
          <SectionCard title="Decision Preferences">
            <Field label="Default Decision Category" hint="Pre-select this category when creating a new decision">
              <Select value="Technology" />
            </Field>
            <Field label="Default Reviewer" hint="Automatically assign this reviewer to new decisions">
              <Select value="Dr. Mark Lee" />
            </Field>
            <Field label="Auto Save Draft" hint="Automatically save your decision as a draft while editing">
              <Toggle on={true} />
            </Field>
            <Field label="Default Document Format" hint="Default format for exported decision documents">
              <Select value="PDF" />
            </Field>
          </SectionCard>

          {/* SYSTEM PREFERENCES */}
          <SectionCard title="System Preferences">
            <Field label="Accessibility" hint="Enable high-contrast mode and screen reader support">
              <Toggle on={false} />
            </Field>
            <Field label="Keyboard Shortcuts" hint="Enable keyboard shortcuts across the platform">
              <Toggle on={true} />
            </Field>
            <Field label="Auto Logout Time" hint="Automatically sign out after a period of inactivity">
              <Select value="30 minutes" />
            </Field>
            <Field label="Browser Session Timeout" hint="Maximum length of a single browser session">
              <Select value="8 hours" />
            </Field>
          </SectionCard>

          {/* DANGER ZONE */}
          <div style={{ background: "white", borderRadius: 14, border: `2px solid ${C.red}40`, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", marginBottom: 20 }}>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.red}20`, display: "flex", alignItems: "center", gap: 10 }}>
              <AlertTriangle size={17} color={C.red} />
              <div style={{ fontSize: 15, fontWeight: 800, color: C.red, letterSpacing: "-0.01em" }}>Danger Zone</div>
            </div>
            <div style={{ padding: "0 24px" }}>
              {[
                { label: "Export My Data",  hint: "Download a copy of all your decisions, comments and profile data.", btn: "Export Data",    btnStyle: { border: `1px solid ${C.g200}`, background: "white", color: C.g700 } },
                { label: "Reset Settings",  hint: "Restore all settings to their factory defaults. This cannot be undone.", btn: "Reset Settings", btnStyle: { border: `1px solid ${C.amber}60`, background: C.amberL, color: C.amber } },
                { label: "Delete Account", hint: "Permanently delete your account and all associated data. This action is irreversible.", btn: "Delete Account", btnStyle: { border: "none", background: C.red, color: "white" } },
              ].map(({ label, hint, btn, btnStyle }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", borderBottom: `1px solid ${C.g100}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.g800 }}>{label}</div>
                    <div style={{ fontSize: 12, color: C.g400, marginTop: 3, maxWidth: 480 }}>{hint}</div>
                  </div>
                  <button style={{ ...btnStyle, padding: "9px 18px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0, marginLeft: 24 } as any}>{btn}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky action bar */}
          <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g200}`, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -2px 12px rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize: 13, color: C.g400 }}>Unsaved changes will be lost if you navigate away.</span>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "10px 22px", borderRadius: 9, border: `1px solid ${C.g200}`, background: "white", fontSize: 13, fontWeight: 600, color: C.g600, cursor: "pointer" }}>Cancel</button>
              <button style={{ padding: "10px 24px", borderRadius: 9, border: "none", background: C.blue, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,0.25)" }}>Save Changes</button>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <div style={{ minWidth: 2400, background: C.bg, fontFamily: "'Inter',sans-serif" }}>
      <TitleSection />

      <div style={{ padding: "48px 0 80px" }}>

        {/* ── FLOW 1: Entry & Authentication ─────────────────── */}
        <FlowSection num={1} title="Entry & Authentication" desc="User onboarding from landing page to main dashboard" color={C.blue}>
          <ScreenRow>
            <Thumb label="Landing Page"><LandingScreen /></Thumb>
            <Arr />
            <Thumb label="Login"><LoginScreen /></Thumb>
            <Arr />
            <Thumb label="Registration"><RegistrationScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 2: Role-Based Dashboards ───────────────────── */}
        <FlowSection num={2} title="Role-Based Dashboards" desc="Role-specific landing dashboards after successful authentication." color={C.indigo}>
          <ScreenRow>
            <Thumb label="EMPLOYEE / REVIEWER DASHBOARD"><EmployeeReviewerDashboardScreen /></Thumb>
            <Arr />
            <Thumb label="MANAGER DASHBOARD"><ManagerDashboardScreen /></Thumb>
            <Arr />
            <Thumb label="ADMINISTRATOR DASHBOARD"><DashboardScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 3: Decision Management ────────────────────── */}
        <FlowSection num={3} title="Decision Management" desc="Browse, filter and view detailed decision records" color="#6366F1">
          <ScreenRow>
            <Thumb label="Dashboard"><DecisionManagementDashboardScreen /></Thumb>
            <Arr />
            <Thumb label="My Decisions"><MyDecisionsScreen /></Thumb>
            <Arr />
            <Thumb label="Decision Details"><DecisionDetailScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 3b: Discussion Module ──────────────────────── */}
        <FlowSection num={"3b" as any} title="Discussion Module" desc="Comments, threads, and meeting notes linked to decisions" color={C.purple}>
          <ScreenRow>
            <Thumb label="Discussion Dashboard"><DiscussionDashboardScreen /></Thumb>
            <Arr />
            <Thumb label="Comments"><CommentsScreen /></Thumb>
            <Arr />
            <Thumb label="Discussion Threads"><DiscussionThreadsScreen /></Thumb>
            <Arr />
            <Thumb label="Meeting Notes"><MeetingNotesScreen /></Thumb>
            <Arr />
            <Thumb label="Decision Rationale"><DecisionRationaleScreen /></Thumb>
            <Arr />
            <Thumb label="Supporting Documents"><SupportingDocumentsScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 4: Create Decision Wizard ─────────────────── */}
        <FlowSection num={4} title="Create Decision Wizard" desc="Multi-step guided workflow for capturing a new decision" color={C.teal}>
          <ScreenRow>
            <Thumb label="Step 1 · Basic Info"><CreateStep1Screen /></Thumb>
            <Arr />
            <Thumb label="Step 2 · Alternatives"><CreateStep2Screen /></Thumb>
            <Arr />
            <Thumb label="Step 3 · Documents"><CreateStep3Screen /></Thumb>
            <Arr />
            <Thumb label="Step 4 · Reviewers"><CreateStep4Screen /></Thumb>
            <Arr />
            <Thumb label="Review Summary"><ReviewSummaryScreen /></Thumb>
            <Arr />
            <Thumb label="Submitted ✓"><SubmitSuccessScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 4: Approval Workflow ───────────────────────── */}
        <FlowSection num={5} title="Approval Workflow" desc="Sequential review chain from reviewer to administrator" color={C.amber}>
          <div>
            {/* Main approval path */}
            <ScreenRow>
              <Thumb label="Reviewer Review">
                <ApprovalScreen role="Reviewer" status="Review" prevApprovals={[]} />
              </Thumb>
              <Arr />
              <Thumb label="Manager Approval">
                <ApprovalScreen role="Manager" status="Pending" prevApprovals={[{ name: "Dr. Mark Lee", result: "Approved" }]} />
              </Thumb>
              <Arr />
              <Thumb label="Admin Approval">
                <ApprovalScreen role="Administrator" status="Pending" prevApprovals={[{ name: "Dr. Mark Lee", result: "Approved" }, { name: "Jennifer Walsh", result: "Approved" }]} />
              </Thumb>
              <Arr />
              <Thumb label="Decision Approved ✓"><ApprovedScreen /></Thumb>
            </ScreenRow>
            {/* Reject branch */}
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px dashed ${C.g300}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.redL, border: `1px solid ${C.red}40`, borderRadius: 20, padding: "5px 14px" }}>
                  <X size={12} color={C.red} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.red, textTransform: "uppercase", letterSpacing: "0.06em" }}>If Rejected — Alternative Path</span>
                </div>
                <div style={{ flex: 1, height: 1, background: C.g200 }} />
              </div>
              <ScreenRow>
                <Thumb label="Manager Rejects">
                  <AppLayout active="approvals" title="Decision Rejected" breadcrumb={["Home", "Approvals", "DEC-2848"]}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 48 }}>
                      <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.redL, border: `4px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><X size={36} color={C.red} /></div>
                      <h2 style={{ fontSize: 24, fontWeight: 900, color: C.g900, margin: "0 0 8px" }}>Decision Rejected</h2>
                      <p style={{ fontSize: 14, color: C.g500, margin: "0 0 24px", textAlign: "center", maxWidth: 460 }}>Jennifer Walsh (Manager) has rejected this decision and requires revisions before it can proceed.</p>
                      <div style={{ background: "white", borderRadius: 16, padding: 24, width: "100%", maxWidth: 560, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: C.g800, marginBottom: 12 }}>Rejection Reason</div>
                        <div style={{ background: C.redL, border: `1px solid ${C.red}30`, borderRadius: 10, padding: 16, fontSize: 14, color: C.g700, lineHeight: 1.7 }}>"The budget figures need to be revised. The cloud migration cost projection seems underestimated by approximately 15-20%."</div>
                      </div>
                    </div>
                  </AppLayout>
                </Thumb>
                <Arr dim />
                <Thumb label="Edit Decision"><CreateStep1Screen /></Thumb>
                <Arr dim />
                <Thumb label="Resubmit"><SubmitSuccessScreen /></Thumb>
              </ScreenRow>
            </div>
          </div>
        </FlowSection>

        {/* ── FLOW 5: Knowledge Repository ───────────────────── */}
        <FlowSection num={6} title="Knowledge Repository" desc="Search, filter and explore the organizational decision archive" color={C.green}>
          <ScreenRow>
            <Thumb label="Knowledge Repository"><KnowledgeRepoScreen /></Thumb>
            <Arr />
            <Thumb label="Search Results">
              <AppLayout active="knowledge" title="Search Results" breadcrumb={["Home", "Knowledge", "Search"]}>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "white", border: `2px solid ${C.blue}`, borderRadius: 12, padding: "12px 18px" }}>
                    <Search size={16} color={C.blue} /><span style={{ fontSize: 14, color: C.g800, fontWeight: 500 }}>cloud migration</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 12, padding: "12px 16px" }}><Filter size={14} color={C.g500} /><span style={{ fontSize: 13 }}>Filters</span></div>
                </div>
                <div style={{ fontSize: 13, color: C.g500, marginBottom: 16 }}>Found <strong style={{ color: C.g800 }}>14</strong> decisions matching "cloud migration"</div>
                {[["Cloud Infrastructure Migration Plan", "Technology", "Dec 10, 2024", "Approved"], ["Cloud Storage Vendor Selection", "Procurement", "Sep 15, 2024", "Archived"], ["Multi-cloud Strategy 2024", "Technology", "Jul 8, 2024", "Approved"], ["Cloud Security Framework", "Security", "May 22, 2024", "Approved"]].map(([t, cat, d, s]) => (
                  <div key={t} style={{ background: "white", borderRadius: 14, padding: "16px 20px", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: C.g800, marginBottom: 4 }}>{t}</div>
                        <div style={{ fontSize: 13, color: C.g500 }}>{cat} · {d}</div>
                      </div>
                      <SBadge s={s} />
                    </div>
                  </div>
                ))}
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Decision Details"><DecisionDetailScreen /></Thumb>
            <Arr />
            <Thumb label="Timeline View">
              <AppLayout active="knowledge" title="Decision Timeline" breadcrumb={["Home", "Knowledge", "DEC-2820", "Timeline"]}>
                <div style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `1px solid ${C.g100}` }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: C.g900, margin: "0 0 24px" }}>Cloud Infrastructure Migration — Timeline</h3>
                  {[["Dec 10", "Decision Submitted", "Sarah Chen submitted for review", C.blue, false], ["Dec 13", "Reviewer Approved", "Dr. Mark Lee: Approved with minor notes", C.green, false], ["Dec 15", "Manager Review", "Jennifer Walsh reviewing budget impact", C.amber, true], ["Dec 20", "Admin Approval", "Awaiting executive sign-off", C.g300, true], ["Dec 31", "Target Approval", "Expected final approval date", C.g300, true]].map(([date, title, desc, col, future], i, arr) => (
                    <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < arr.length - 1 ? 0 : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 16 }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: col as string, border: `2px solid ${future ? "white" : col as string}`, outline: `2px solid ${col as string}50`, flexShrink: 0 }} />
                        {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: C.g200, minHeight: 32 }} />}
                      </div>
                      <div style={{ paddingBottom: i < arr.length - 1 ? 24 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: future ? C.g400 : C.g800 }}>{title as string}</span>
                          <span style={{ fontSize: 11, color: C.g400 }}>{date}</span>
                        </div>
                        <p style={{ fontSize: 13, color: future ? C.g400 : C.g500, margin: 0 }}>{desc as string}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 6: Reports & Analytics ────────────────────── */}
        <FlowSection num={7} title="Reports & Analytics" desc="Comprehensive reporting with exportable insights" color={C.purple}>
          <ScreenRow>
            <Thumb label="Reports Dashboard"><ReportsDashboardScreen /></Thumb>
            <Arr />
            <Thumb label="Decision Reports">
              <AppLayout active="reports" title="Decision Reports" breadcrumb={["Home", "Reports", "Decisions"]}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
                  {[["Total Submitted", "213", C.blue], ["Approved", "185", C.green], ["Rejected", "28", C.red]].map(([l, v, col]) => (
                    <div key={l} style={{ background: "white", borderRadius: 14, padding: 20, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                      <div style={{ fontSize: 12, color: C.g500, marginBottom: 8, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>{l}</div>
                      <div style={{ fontSize: 30, fontWeight: 900, color: col as string }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "white", borderRadius: 16, padding: 24, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 18 }}>Decisions by Month</div>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={[{ m: "Jul", v: 28 }, { m: "Aug", v: 35 }, { m: "Sep", v: 29 }, { m: "Oct", v: 42 }, { m: "Nov", v: 38 }, { m: "Dec", v: 41 }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.g100} />
                      <XAxis dataKey="m" tick={{ fontSize: 12, fill: C.g400 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: C.g400 }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="v" fill={C.blue} radius={[6, 6, 0, 0]} name="Decisions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Approval Reports">
              <AppLayout active="reports" title="Approval Reports" breadcrumb={["Home", "Reports", "Approvals"]}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <div style={{ background: "white", borderRadius: 16, padding: 24, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 4 }}>Approval Rate</div>
                    <div style={{ fontSize: 11, color: C.g400, marginBottom: 16 }}>By reviewer role</div>
                    {[["Reviewer", 94, C.blue], ["Manager", 88, C.purple], ["Administrator", 82, C.amber]].map(([role, pct, col]) => (
                      <div key={role} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 13, color: C.g700 }}>{role}</span><span style={{ fontSize: 13, fontWeight: 700, color: col as string }}>{pct}%</span>
                        </div>
                        <div style={{ height: 6, background: C.g100, borderRadius: 3 }}><div style={{ width: `${pct}%`, height: "100%", background: col as string, borderRadius: 3 }} /></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "white", borderRadius: 16, padding: 24, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 4 }}>Avg Days to Approve</div>
                    <div style={{ fontSize: 11, color: C.g400, marginBottom: 16 }}>By category</div>
                    {[["Finance", "5.2d"], ["Technology", "4.1d"], ["HR Policy", "3.8d"], ["Compliance", "6.4d"], ["Security", "3.2d"]].map(([cat, days]) => (
                      <div key={cat} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.g100}` }}>
                        <span style={{ fontSize: 13, color: C.g600 }}>{cat}</span><span style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>{days}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Audit Reports">
              <AppLayout active="reports" title="Audit Reports" breadcrumb={["Home", "Reports", "Audit"]}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", border: "none", borderRadius: 9, background: C.blue, color: "white", fontSize: 13, fontWeight: 600 }}><Download size={14} /> Export PDF / Excel</button>
                </div>
                <div style={{ background: "white", borderRadius: 16, padding: 24, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 18 }}>Compliance Summary</div>
                  {[["Decisions with Full Audit Trail", "100%", C.green], ["Avg. Approval Cycle Time", "4.2 days", C.blue], ["Policy Violations Detected", "0", C.green], ["Data Retention Compliance", "100%", C.green], ["External Audit Readiness", "98.4%", C.blue]].map(([m, v, col]) => (
                    <div key={m} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.g100}` }}>
                      <span style={{ fontSize: 14, color: C.g700 }}>{m}</span>
                      <span style={{ fontSize: 15, fontWeight: 800, color: col as string }}>{v}</span>
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 7: User Management ─────────────────────────── */}
        <FlowSection num={8} title="User Management" desc="Manage users, roles, teams and permissions" color="#F59E0B">
          <ScreenRow>
            <Thumb label="User Management"><UserManagementScreen /></Thumb>
            <Arr />
            <Thumb label="Users List">
              <AppLayout active="users" title="Users" breadcrumb={["Home", "User Management", "Users"]}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px", width: 280 }}><Search size={15} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Search users...</span></div>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, background: C.blue, color: "white", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 13, fontWeight: 600 }}><Plus size={14} /> Invite User</button>
                </div>
                <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  {[["Sarah Chen", "Admin", "Finance", "Active"], ["Mark Lee", "Manager", "Research", "Active"], ["Jennifer Walsh", "Manager", "Operations", "Active"], ["Alex Thompson", "Admin", "Executive", "Active"], ["Lisa Park", "Reviewer", "Procurement", "Active"], ["Tom Wright", "Viewer", "Product", "Inactive"]].map(([n, r, d, s], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: `1px solid ${C.g100}` }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.blue},${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{(n as string).split(" ").map((x: string) => x[0]).join("")}</span></div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 500, color: C.g800 }}>{n}</div><div style={{ fontSize: 12, color: C.g500 }}>{d}</div></div>
                      <SBadge s={r} /><SBadge s={s} />
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Roles">
              <AppLayout active="users" title="Roles" breadcrumb={["Home", "User Management", "Roles"]}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["Administrator", "Full platform access including user management and system configuration", C.blue, 4, ["all_permissions"]], ["Manager", "Approve/reject decisions, manage team workflows, generate reports", C.purple, 12, ["approve", "reject", "reports"]], ["Reviewer", "Review and comment on submitted decisions within assigned scope", C.indigo, 38, ["review", "comment"]], ["Viewer", "Read-only access to approved decisions in the knowledge repository", C.g500, 18, ["view_approved"]]].map(([role, desc, col, count, perms]: any) => (
                    <div key={role} style={{ background: "white", borderRadius: 16, padding: 22, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${col}18`, display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={20} color={col} /></div>
                        <span style={{ fontSize: 12, color: C.g400 }}>{count} users</span>
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 6 }}>{role}</div>
                      <p style={{ fontSize: 13, color: C.g500, lineHeight: 1.6, margin: "0 0 14px" }}>{desc}</p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {perms.map((p: string) => <span key={p} style={{ fontSize: 11, fontWeight: 600, color: col, background: `${col}15`, padding: "3px 10px", borderRadius: 20 }}>{p}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Permissions">
              <AppLayout active="users" title="Permissions" breadcrumb={["Home", "User Management", "Permissions"]}>
                <div style={{ background: "white", borderRadius: 16, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: C.g50 }}>
                        <th style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, color: C.g500, textAlign: "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>Permission</th>
                        {["Admin", "Manager", "Reviewer", "Viewer"].map(r => <th key={r} style={{ padding: "14px 20px", fontSize: 12, fontWeight: 700, color: C.g500, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>{r}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {[["Create Decision", true, true, false, false], ["Submit Decision", true, true, true, false], ["Review Decision", true, true, true, false], ["Approve Decision", true, true, false, false], ["View Knowledge Repo", true, true, true, true], ["Generate Reports", true, true, false, false], ["Manage Users", true, false, false, false], ["System Config", true, false, false, false]].map(([perm, ...vals]) => (
                        <tr key={perm} style={{ borderTop: `1px solid ${C.g100}` }}>
                          <td style={{ padding: "12px 20px", fontSize: 13, color: C.g700 }}>{perm}</td>
                          {vals.map((v, i) => <td key={i} style={{ padding: "12px 20px", textAlign: "center" }}>{v ? <Check size={16} color={C.green} /> : <X size={16} color={C.g300} />}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AppLayout>
            </Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 8: Audit & Compliance ──────────────────────── */}
        <FlowSection num={9} title="Audit & Compliance" desc="Complete traceability, version history and security monitoring" color={C.red}>
          <ScreenRow>
            <Thumb label="Audit Dashboard"><AuditDashboardScreen /></Thumb>
            <Arr />
            <Thumb label="Activity Logs">
              <AppLayout active="audit" title="Activity Logs" breadcrumb={["Home", "Audit", "Activity"]}>
                <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "white", border: `2px solid ${C.blue}`, borderRadius: 10, padding: "10px 16px", flex: 1 }}><Search size={15} color={C.blue} /><span style={{ fontSize: 13, color: C.g400 }}>Filter logs...</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "white", border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 14px" }}><Calendar size={14} color={C.g500} /><span style={{ fontSize: 13, color: C.g600 }}>Today</span></div>
                </div>
                <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  {[["14:32", "John Doe", "Approved DEC-2847", "green"], ["13:18", "Sarah Chen", "Uploaded document to DEC-2848", "blue"], ["12:05", "Mark Lee", "Submitted review for DEC-2848", "blue"], ["11:22", "Unknown", "Failed login attempt (3x)", "red"], ["10:45", "Lisa Park", "Viewed DEC-2801", "gray"], ["09:30", "System", "Automatic policy check completed", "gray"]].map(([time, user, action, col], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 20px", borderBottom: `1px solid ${C.g100}`, background: col === "red" ? "#FFF5F5" : "white" }}>
                      <span style={{ fontSize: 12, color: C.g400, fontFamily: "monospace", width: 40 }}>{time}</span>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: col === "green" ? C.greenL : col === "red" ? C.redL : C.blueL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Activity size={14} color={col === "green" ? C.green : col === "red" ? C.red : C.blue} />
                      </div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: C.g800 }}>{user}</div><div style={{ fontSize: 12, color: C.g500 }}>{action}</div></div>
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Version History">
              <AppLayout active="audit" title="Version History" breadcrumb={["Home", "Audit", "Versions"]}>
                <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g100}`, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.g900, marginBottom: 6 }}>DEC-2847 — Version History</div>
                  <div style={{ fontSize: 13, color: C.g500, marginBottom: 20 }}>Q4 Technology Budget Allocation</div>
                  {[["v3.0", "Dec 22, 2024", "Final version — Approved by Administrator", "Approved"], ["v2.1", "Dec 18, 2024", "Budget figures revised per reviewer feedback", "Review"], ["v2.0", "Dec 16, 2024", "Added vendor comparison document", "Review"], ["v1.1", "Dec 15, 2024", "Updated alternative analysis scores", "Draft"], ["v1.0", "Dec 14, 2024", "Initial submission", "Draft"]].map(([ver, date, desc, s], i) => (
                    <div key={ver} style={{ display: "flex", gap: 14, marginBottom: i < 4 ? 0 : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: i === 0 ? C.blue : C.g100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 10, fontWeight: 800, color: i === 0 ? "white" : C.g500 }}>{ver}</span>
                        </div>
                        {i < 4 && <div style={{ width: 2, height: 28, background: C.g200 }} />}
                      </div>
                      <div style={{ paddingBottom: i < 4 ? 16 : 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>{ver}</span>
                          <SBadge s={s} /><span style={{ fontSize: 12, color: C.g400 }}>{date}</span>
                        </div>
                        <p style={{ fontSize: 13, color: C.g500, margin: 0 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
            <Arr />
            <Thumb label="Security Logs">
              <AppLayout active="audit" title="Security Logs" breadcrumb={["Home", "Audit", "Security"]}>
                <div style={{ background: C.redL, border: `1px solid ${C.red}40`, borderRadius: 14, padding: "16px 20px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
                  <AlertTriangle size={20} color={C.red} />
                  <div><div style={{ fontSize: 14, fontWeight: 700, color: C.red }}>3 Security Alerts Require Attention</div><div style={{ fontSize: 13, color: C.g600, marginTop: 2 }}>Multiple failed login attempts detected from IP 203.0.113.25</div></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
                  {[["Failed Logins", "12", C.red], ["Suspicious IPs", "3", C.amber], ["Locked Accounts", "1", C.purple]].map(([l, v, col]) => (
                    <div key={l} style={{ background: "white", borderRadius: 12, padding: 18, border: `1px solid ${C.g100}`, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                      <div style={{ fontSize: 11, color: C.g500, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: col as string }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "white", borderRadius: 14, border: `1px solid ${C.g100}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.g100}`, fontSize: 14, fontWeight: 700, color: C.g800 }}>Recent Security Events</div>
                  {[["11:22:08", "LOGIN_FAIL", "203.0.113.25", "red"], ["11:20:44", "LOGIN_FAIL", "203.0.113.25", "red"], ["11:18:12", "LOGIN_FAIL", "203.0.113.25", "red"], ["09:30:00", "ROLE_CHANGE", "10.0.0.1", "amber"], ["08:15:33", "EXPORT_DATA", "10.0.2.12", "blue"]].map(([time, event, ip, col], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: `1px solid ${C.g100}`, background: col === "red" ? "#FFF5F5" : "white" }}>
                      <span style={{ fontSize: 11, color: C.g400, fontFamily: "monospace", width: 56 }}>{time}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: col === "red" ? C.red : col === "amber" ? C.amber : C.blue, fontFamily: "monospace", flex: 1 }}>{event}</span>
                      <span style={{ fontSize: 12, color: C.g500, fontFamily: "monospace" }}>{ip}</span>
                    </div>
                  ))}
                </div>
              </AppLayout>
            </Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 10: Email & Support ────────────────────────── */}
        <FlowSection num={10} title="Email & Support" desc="Internal email service and support center for platform users" color={C.teal}>
          <ScreenRow>
            <Thumb label="Email Service"><EmailServiceScreen /></Thumb>
            <Arr />
            <Thumb label="Support Center"><SupportCenterScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

        {/* ── FLOW 11: Settings ───────────────────────────────── */}
        <FlowSection num={11} title="Settings" desc="User account preferences, security, notifications and system configuration" color={C.indigo}>
          <ScreenRow>
            <Thumb label="Settings"><SettingsScreen /></Thumb>
          </ScreenRow>
        </FlowSection>

      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.g200}`, padding: "28px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={16} color="white" /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.g800 }}>Expert Decision Replay Platform</div>
            <div style={{ fontSize: 12, color: C.g400 }}>UX/UI Flow Diagram · Enterprise Decision Management System</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["11 Flows", "21 Screens", "4 Roles", "Full Audit Trail"].map(item => (
            <span key={item} style={{ fontSize: 12, fontWeight: 600, color: C.g500 }}>{item}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: C.g400 }}>© 2024 EDRP Enterprise Platform</div>
      </div>
    </div>
  );
}
