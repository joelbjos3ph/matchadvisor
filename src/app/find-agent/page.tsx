"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const STEPS = ["Contact", "Your Property", "Timeline"];

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
    if (step === 0) return data.name.trim() && data.email.trim() && data.phone.trim();
    if (step === 1) return data.intent && data.propertyType && data.budget;
    if (step === 2) return data.timeline;
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
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-2xl mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Find a Property Agent</h1>
                <p className="text-slate-500 mt-1 text-sm">Tell us about your property needs and we&apos;ll match you with a CEA-registered agent.</p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex-1">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-emerald-600" : "bg-slate-200"}`} />
                    <p className={`text-xs mt-1.5 font-medium ${i === step ? "text-emerald-600" : "text-slate-400"}`}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                {step === 0 && (
                  <div className="space-y-5">
                    <h2 className="font-semibold text-slate-900 text-lg">Your contact details</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                      <input
                        type="text"
                        placeholder="e.g. Lee Hui Ling"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        placeholder="+65 9XXX XXXX"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-semibold text-slate-900 text-lg">About your property</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Are you looking to buy or sell?</label>
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
                      <label className="block text-sm font-medium text-slate-700 mb-3">Property type</label>
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

                {step === 2 && (
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
                          <p className={`text-sm font-semibold ${data.timeline === t.value ? "text-emerald-700" : "text-slate-800"}`}>{t.label}</p>
                          <p className={`text-xs mt-0.5 ${data.timeline === t.value ? "text-emerald-600" : "text-slate-500"}`}>{t.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {submitError && (
                  <p className="mt-4 text-sm text-red-500 text-center">{submitError}</p>
                )}

                {/* Navigation */}
                <div className={`flex mt-8 ${step > 0 ? "justify-between" : "justify-end"}`}>
                  {step > 0 && (
                    <button onClick={() => setStep(step - 1)} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
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

              <p className="text-center text-xs text-slate-400 mt-6">Free service · No cold calls · CEA-registered agents only</p>
            </>
          ) : (
            /* Confirmation */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">You&apos;re all set, {data.name.split(" ")[0]}!</h2>
              <p className="text-slate-600 text-base mb-2">We will match you with vetted professionals within 24 hours.</p>
              <p className="text-slate-500 text-sm mb-8">A confirmation has been sent to <span className="font-medium text-slate-700">{data.email}</span>.</p>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-left mb-8">
                <p className="text-sm font-semibold text-emerald-800 mb-1">What happens next?</p>
                <ul className="text-sm text-emerald-700 space-y-1.5">
                  <li>· Our team matches you with agents experienced in {data.propertyType} properties</li>
                  <li>· You&apos;ll receive an introduction within 24 hours</li>
                  <li>· View listings or arrange viewings at your own pace — no pressure</li>
                </ul>
              </div>
              <a href="/" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">← Back to MatchAdvisor</a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
