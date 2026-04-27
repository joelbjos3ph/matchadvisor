"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const STEPS = ["Contact", "Your Needs", "Details"];

const HELP_OPTIONS = [
  { value: "insurance", label: "Insurance" },
  { value: "investments", label: "Investments" },
  { value: "retirement", label: "Retirement Planning" },
  { value: "general", label: "General Planning" },
];

const AGE_RANGES = ["Under 25", "25–34", "35–44", "45–54", "55–64", "65 and above"];

const INCOME_RANGES = [
  "Below $3,000",
  "$3,000–$5,000",
  "$5,000–$8,000",
  "$8,000–$12,000",
  "Above $12,000",
  "Prefer not to say",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  helpWith: string[];
  ageRange: string;
  incomeRange: string;
  concerns: string;
};

export default function FindAdvisorPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    helpWith: [],
    ageRange: "",
    incomeRange: "",
    concerns: "",
  });

  function toggleHelp(value: string) {
    setData((d) => ({
      ...d,
      helpWith: d.helpWith.includes(value)
        ? d.helpWith.filter((v) => v !== value)
        : [...d.helpWith, value],
    }));
  }

  function canProceed() {
    if (step === 0) return data.name.trim() && data.email.trim() && data.phone.trim();
    if (step === 1) return data.helpWith.length > 0 && data.ageRange;
    if (step === 2) return data.incomeRange;
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from("consumer_leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: "financial_advisor",
      details: {
        helpWith: data.helpWith,
        ageRange: data.ageRange,
        incomeRange: data.incomeRange,
        concerns: data.concerns,
      },
      status: "new",
    });

    setLoading(false);

    if (error) {
      console.error("[Supabase error — consumer_leads advisor insert]", error);
      setSubmitError(`Error: ${error.message}`);
      return;
    }

    setSubmitted(true);

    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "consumer_lead",
        category: "financial_advisor",
        name: data.name,
        email: data.email,
        phone: data.phone,
        details: {
          helpWith: data.helpWith,
          ageRange: data.ageRange,
          incomeRange: data.incomeRange,
          concerns: data.concerns,
        },
      }),
    }).catch((err) => console.warn("[Email notification failed]", err));
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Find a Financial Advisor</h1>
                <p className="text-slate-500 mt-1 text-sm">Tell us a bit about yourself and we&apos;ll match you with a licensed advisor.</p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex-1">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-indigo-600" : "bg-slate-200"}`} />
                    <p className={`text-xs mt-1.5 font-medium ${i === step ? "text-indigo-600" : "text-slate-400"}`}>{label}</p>
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
                        placeholder="e.g. Tan Wei Ming"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        placeholder="+65 9XXX XXXX"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-semibold text-slate-900 text-lg">What do you need help with?</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Select all that apply</label>
                      <div className="grid grid-cols-2 gap-3">
                        {HELP_OPTIONS.map((opt) => {
                          const selected = data.helpWith.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => toggleHelp(opt.value)}
                              className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${
                                selected
                                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Your age range</label>
                      <div className="grid grid-cols-2 gap-3">
                        {AGE_RANGES.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setData({ ...data, ageRange: range })}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              data.ageRange === range
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-semibold text-slate-900 text-lg">A bit more about you</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Monthly income range</label>
                      <div className="grid grid-cols-2 gap-3">
                        {INCOME_RANGES.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setData({ ...data, incomeRange: range })}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              data.incomeRange === range
                                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Any specific concerns? <span className="text-slate-400 font-normal">(optional)</span></label>
                      <textarea
                        placeholder="e.g. I'm looking to grow my savings and plan for early retirement by 55..."
                        value={data.concerns}
                        onChange={(e) => setData({ ...data, concerns: e.target.value })}
                        rows={4}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
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
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
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
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      {loading ? "Submitting…" : "Find My Advisor"}
                      {!loading && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">Free service · No cold calls · MAS-licensed advisors only</p>
            </>
          ) : (
            /* Confirmation */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">You&apos;re all set, {data.name.split(" ")[0]}!</h2>
              <p className="text-slate-600 text-base mb-2">We will match you with vetted professionals within 24 hours.</p>
              <p className="text-slate-500 text-sm mb-8">A confirmation has been sent to <span className="font-medium text-slate-700">{data.email}</span>.</p>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-left mb-8">
                <p className="text-sm font-semibold text-indigo-800 mb-1">What happens next?</p>
                <ul className="text-sm text-indigo-700 space-y-1.5">
                  <li>· Our team reviews your profile and matches you with suitable advisors</li>
                  <li>· You&apos;ll receive an introduction within 24 hours</li>
                  <li>· A short call is arranged at your convenience — no pressure</li>
                </ul>
              </div>
              <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">← Back to MatchAdvisor</a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
