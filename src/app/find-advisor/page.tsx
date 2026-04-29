"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const STEPS = ["Your Needs", "Your Details", "Contact Details"];

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

const inputCls =
  "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

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
    if (step === 0) return data.helpWith.length > 0 && data.ageRange;
    if (step === 1) return data.incomeRange;
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
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-xl mx-auto">
            {!submitted ? (
              <>
                {/* Hero */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
                    Financial Advisors
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                    Find Your Perfect Financial Advisor in Singapore
                  </h1>
                  <p className="text-slate-500 text-base max-w-md mx-auto mb-6">
                    Get matched with MAS-licensed advisors who put your goals first — reach out on your own terms, no cold calls, no pressure.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {["MAS-licensed only", "You reach out first", "Free service"].map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        <span className="text-indigo-500 font-bold">✓</span>
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
                          i <= step ? "bg-indigo-600" : "bg-slate-200"
                        }`}
                      />
                      <p
                        className={`text-xs mt-1.5 font-medium ${
                          i === step ? "text-indigo-600" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  {/* Step 0 — Your Needs */}
                  {step === 0 && (
                    <div className="space-y-6">
                      <h2 className="font-semibold text-slate-900 text-lg">What do you need help with?</h2>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Select all that apply
                        </label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Your age range
                        </label>
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

                  {/* Step 1 — Your Details */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="font-semibold text-slate-900 text-lg">A bit more about you</h2>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                          Monthly income range
                        </label>
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
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Any specific concerns?{" "}
                          <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
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

                  {/* Step 2 — Contact Details */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="font-semibold text-slate-900 text-lg">
                          Almost done — how should advisors reach you?
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          Your details are only used to match you with advisors. We never sell your information or add you to mailing lists.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          Full name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Tan Wei Ming"
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

                <p className="text-center text-xs text-slate-400 mt-6">
                  Free service · No cold calls · You stay in control
                </p>
              </>
            ) : (
              /* Confirmation */
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-left mb-8">
                  <p className="text-sm font-semibold text-indigo-800 mb-3">What happens next?</p>
                  <ul className="text-sm text-indigo-700 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="font-bold mt-0.5">·</span>
                      <span>We&apos;ll shortlist MAS-licensed advisors who match your goals and situation</span>
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
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
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
