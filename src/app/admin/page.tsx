"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const PASSWORD = "matchadvisor2026";
const AUTH_KEY = "ma_admin_auth";

const TYPE_LABELS: Record<string, string> = {
  financial_advisor: "Financial Advisor",
  property_agent: "Property Agent",
  interior_designer: "Interior Designer",
};

type Professional = {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  licence_number: string;
  years_experience: number;
  verified: boolean;
  created_at: string;
};

type ConsumerLead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: string;
  details: Record<string, unknown>;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function detailsSummary(category: string, details: Record<string, unknown>) {
  if (category === "financial_advisor") {
    const parts = [];
    if (Array.isArray(details.helpWith) && details.helpWith.length)
      parts.push((details.helpWith as string[]).join(", "));
    if (details.ageRange) parts.push(String(details.ageRange));
    if (details.incomeRange) parts.push(String(details.incomeRange));
    if (details.concerns) parts.push(`"${String(details.concerns).slice(0, 40)}…"`);
    return parts.join(" · ") || "—";
  }
  if (category === "property_agent") {
    const parts = [];
    if (details.intent) parts.push(details.intent === "buy" ? "Buy" : "Sell");
    if (details.propertyType) parts.push(String(details.propertyType));
    if (details.budget) parts.push(String(details.budget));
    if (details.timeline) {
      const tl = details.timeline === "urgent" ? "Urgent" : details.timeline === "3months" ? "3 months" : "Exploring";
      parts.push(tl);
    }
    return parts.join(" · ") || "—";
  }
  if (category === "interior_designer") {
    const parts = [];
    if (details.propertyType) parts.push(String(details.propertyType).toUpperCase());
    if (details.renoType) {
      const rt = details.renoType === "full" ? "Full reno" : details.renoType === "partial" ? "Partial" : "ID consult";
      parts.push(rt);
    }
    if (details.budget) parts.push(String(details.budget));
    if (details.startDate) {
      const sd = details.startDate === "asap" ? "ASAP" : details.startDate === "1-3months" ? "1–3 months" : details.startDate === "3-6months" ? "3–6 months" : "6+ months";
      parts.push(sd);
    }
    return parts.join(" · ") || "—";
  }
  return "—";
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function Badge({ label, variant }: { label: string; variant: "indigo" | "emerald" | "amber" | "slate" | "green" | "red" }) {
  const styles = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    green: "bg-green-50 text-green-700 border-green-100",
    red: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${styles[variant]}`}>
      {label}
    </span>
  );
}

function categoryBadge(category: string) {
  if (category === "financial_advisor") return <Badge label="Financial Advisor" variant="indigo" />;
  if (category === "property_agent") return <Badge label="Property Agent" variant="emerald" />;
  if (category === "interior_designer") return <Badge label="Interior Designer" variant="amber" />;
  return <Badge label={category} variant="slate" />;
}

// ─── Login ───────────────────────────────────────────────────────────────────

function LoginScreen({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-6">
        <div className="w-full max-w-sm">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-1">Admin Access</h1>
            <p className="text-sm text-slate-500 mb-6">Enter the admin password to continue.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => { setPw(e.target.value); setError(""); }}
                  placeholder="••••••••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"professionals" | "leads">("professionals");
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [leads, setLeads] = useState<ConsumerLead[]>([]);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "true") setAuthed(true);
    setChecking(false);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [{ data: profs }, { data: leadsData }] = await Promise.all([
      supabase.from("professionals").select("*").order("created_at", { ascending: false }),
      supabase.from("consumer_leads").select("*").order("created_at", { ascending: false }),
    ]);
    if (profs) setProfessionals(profs as Professional[]);
    if (leadsData) setLeads(leadsData as ConsumerLead[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  async function handleVerify(id: string) {
    setVerifying(id);
    await supabase.from("professionals").update({ verified: true }).eq("id", id);
    setProfessionals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verified: true } : p))
    );
    setVerifying(null);
  }

  function handleLogout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  }

  if (checking) return null;
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newLeadsThisWeek = leads.filter((l) => new Date(l.created_at) >= weekAgo).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage professionals and consumer leads.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl px-4 py-2 bg-white hover:bg-slate-50 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 border border-red-100 rounded-xl px-4 py-2 bg-white hover:bg-red-50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Professionals" value={professionals.length} color="text-slate-900" />
          <StatCard label="Verified Professionals" value={professionals.filter((p) => p.verified).length} color="text-green-600" />
          <StatCard label="Total Consumer Leads" value={leads.length} color="text-indigo-600" />
          <StatCard label="New Leads This Week" value={newLeadsThisWeek} color="text-amber-600" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-6">
          {(["professionals", "leads"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "professionals" ? `Professionals (${professionals.length})` : `Consumer Leads (${leads.length})`}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400 text-sm">Loading…</div>
          ) : activeTab === "professionals" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Name", "Email", "Phone", "Type", "Licence No.", "Experience", "Status", "Date Joined", ""].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {professionals.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-slate-400">No professionals yet.</td>
                    </tr>
                  ) : (
                    professionals.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{p.name}</td>
                        <td className="px-5 py-4 text-slate-600">{p.email}</td>
                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{p.phone}</td>
                        <td className="px-5 py-4 whitespace-nowrap">{categoryBadge(p.type)}</td>
                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{p.licence_number}</td>
                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{p.years_experience} yrs</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          {p.verified
                            ? <Badge label="Verified" variant="green" />
                            : <Badge label="Pending" variant="slate" />}
                        </td>
                        <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{formatDate(p.created_at)}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          {!p.verified && (
                            <button
                              onClick={() => handleVerify(p.id)}
                              disabled={verifying === p.id}
                              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors disabled:opacity-50"
                            >
                              {verifying === p.id ? "Verifying…" : "Verify"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    {["Name", "Email", "Phone", "Category", "Details", "Status", "Date Submitted"].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-slate-400">No consumer leads yet.</td>
                    </tr>
                  ) : (
                    leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{l.name}</td>
                        <td className="px-5 py-4 text-slate-600">{l.email}</td>
                        <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{l.phone}</td>
                        <td className="px-5 py-4 whitespace-nowrap">{categoryBadge(l.category)}</td>
                        <td className="px-5 py-4 text-slate-500 max-w-xs">
                          <span className="text-xs leading-relaxed">{detailsSummary(l.category, l.details)}</span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <Badge label={l.status} variant={l.status === "new" ? "indigo" : "slate"} />
                        </td>
                        <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{formatDate(l.created_at)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
