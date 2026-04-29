"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const STEPS = ["Your Property", "Timeline", "Contact Details"];

const PROPERTY_TYPES = ["HDB", "Condo", "Landed", "Commercial"];

const BUY_BUDGETS = [
  "Below $300k",
  "$300k–$500k",
  "$500k–$800k",
  "$800k–$1.2m",
  "$1.2m–$2m",
  "Above $2m",
];

const SELL_BUDGETS = [
  "Below $400k",
  "$400k–$600k",
  "$600k–$900k",
  "$900k–$1.5m",
  "$1.5m–$2.5m",
  "Above $2.5m",
];

const TIMELINES = [
  { value: "urgent", label: "Urgent", sub: "Within 1 month" },
  { value: "3months", label: "Within 3 months", sub: "Some flexibility" },
  { value: "exploring", label: "Just exploring", sub: "No fixed timeline" },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  intent: "buy" | "sell" | "";
  propertyType: string;
  budget: string;
  timeline: string;
};

const inputCls =
  "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition";

export default function FindAgentPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    intent: "",
    propertyType: "",
    budget: "",
    timeline: "",
  });

  const budgetOptions = data.intent === "sell" ? SELL_BUDGETS : BUY_BUDGETS;

  function canProceed() {
    if (step === 0) return data.intent && data.propertyType && data.budget;
    if (step === 1) return data.timeline;
    if (step === 2) return data.name.trim() && data.email.trim() && data.phone.trim();
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from("consumer_leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: "property_agent",
      details: {
        intent: data.intent,
        propertyType: data.propertyType,
        budget: data.budget,
        timeline: data.timeline,
      },
      status: "new",
    });

    setLoading(false);

    if (error) {
      console.error("[Supabase error — consumer_leads agent insert]", error);
      setSubmitError(`Error: ${error.message}`);
      return;
    }

    setSubmitted(true);

    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "consumer_lead",
        category: "property_agent",
        name: data.name,
        email: data.email,
        phone: data.phone,
        details: {
          intent: data.intent,
          propertyType: data.propertyType,
          budget: data.budget,
          timeline: data.timeline,
        },
      }),
    }).catch((err) => console.warn("[Email notification failed]", err));
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto">
            {!submitted ? (
              <>
                {/* Hero */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Property Agents
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                    Find Your Perfect Property Agent in Singapore
                  </h1>
                  <p className="text-slate-500 text-base max-w-md mx-auto mb-6">
                    Get matched with CEA-registered agents who know your neighbourhood — reach out on your own terms, no cold calls, no pressure.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {["CEA-registered only", "You reach out first", "Free service"].map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        <span className="text-emerald-500 font-bold">✓</span>
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                  {STEPS.map((label, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i <= step ? "bg-emerald-600" : "bg-slate-200"
                        }`}
                      />
                      <p
                        className={`text-xs mt-1.5 font-medium ${
                          i === step ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  {/* Step 0 — Your Property */}
                  {step === 0 && (
                    <div className="space-y-6">
                      <h2 className="font-semibold text-slate-900 text-lg">About your property</h2>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Are you looking to buy or sell?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {(["buy", "sell"] as const).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setData({ ...data, intent: opt, budget: "" })}
                              className={`px-4 py-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                                data.intent === opt
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {opt === "buy" ? "Buy a property" : "Sell my property"}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Property type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {PROPERTY_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setData({ ...data, propertyType: type })}
                              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                                data.propertyType === type
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          {data.intent === "sell" ? "Estimated property value" : "Budget range"}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {budgetOptions.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setData({ ...data, budget: b })}
                              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                                data.budget === b
                                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 1 — Timeline */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="font-semibold text-slate-900 text-lg">What&apos;s your timeline?</h2>
                      <div className="space-y-3">
                        {TIMELINES.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setData({ ...data, timeline: t.value })}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                              data.timeline === t.value
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <p
                              className={`text-sm font-semibold ${
                                data.timeline === t.value ? "text-emerald-700" : "text-slate-800"
                              }`}
                            >
                              {t.label}
                            </p>
                            <p
                              className={`text-xs mt-0.5 ${
                                data.timeline === t.value ? "text-emerald-600" : "text-slate-500"
                              }`}
                            >
                              {t.sub}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Contact Details */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="font-semibold text-slate-900 text-lg">
                          Almost done — how should agents reach you?
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          Your details are only used to match you with agents. We never sell your information or add you to mailing lists.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Full name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lee Hui Ling"
                          value={data.name}
                          onChange={(e) => setData({ ...data, name: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={data.email}
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          placeholder="+65 9XXX XXXX"
                          value={data.phone}
                          onChange={(e) => setData({ ...data, phone: e.target.value })}
                          className={inputCls}
                        />
                      </div>
                    </div>
                  )}

                  {submitError && (
                    <p className="mt-4 text-sm text-red-500 text-center">{submitError}</p>
                  )}

                  {/* Navigation */}
                  <div className={`flex mt-8 ${step > 0 ? "justify-between" : "justify-end"}`}>
                    {step > 0 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                    {step < STEPS.length - 1 ? (
                      <button
                        onClick={() => setStep(step + 1)}
                        disabled={!canProceed()}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                      >
                        Continue
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!canProceed() || loading}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                      >
                        {loading ? "Submitting…" : "Find My Agent"}
                        {!loading && (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                  Free service · No cold calls · You stay in control
                </p>
              </>
            ) : (
              /* Confirmation */
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  You&apos;re all set, {data.name.split(" ")[0]}!
                </h2>
                <p className="text-slate-600 text-base mb-2">
                  We will match you with vetted professionals within 24 hours.
                </p>
                <p className="text-slate-500 text-sm mb-8">
                  A confirmation has been sent to{" "}
                  <span className="font-medium text-slate-700">{data.email}</span>.
                </p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-left mb-8">
                  <p className="text-sm font-semibold text-emerald-800 mb-3">What happens next?</p>
                  <ul className="text-sm text-emerald-700 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="font-bold mt-0.5">·</span>
                      <span>
                        We&apos;ll shortlist CEA-registered agents who specialise in your property type and area
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold mt-0.5">·</span>
                      <span>You&apos;ll receive a curated list — no cold calls, no spam</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold mt-0.5">·</span>
                      <span>Browse their profiles and reach out to whoever feels right</span>
                    </li>
                  </ul>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  ← Back to MatchAdvisor
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
