"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const STEPS = ["Contact", "Your Space", "Budget & Timing"];

const PROPERTY_TYPES = [
  { value: "bto", label: "BTO" },
  { value: "resale-hdb", label: "Resale HDB" },
  { value: "condo", label: "Condo" },
  { value: "landed", label: "Landed" },
];

const RENO_TYPES = [
  { value: "full", label: "Full Renovation", sub: "Complete overhaul of the entire unit" },
  { value: "partial", label: "Partial Renovation", sub: "Specific rooms or areas only" },
  { value: "id-consult", label: "ID Consultation", sub: "Design advice and space planning" },
];

const BUDGETS = [
  "Below $30k",
  "$30k–$50k",
  "$50k–$80k",
  "$80k–$120k",
  "$120k–$180k",
  "Above $180k",
];

const START_DATES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3months", label: "1–3 months from now" },
  { value: "3-6months", label: "3–6 months from now" },
  { value: "6months+", label: "More than 6 months away" },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  renoType: string;
  budget: string;
  startDate: string;
};

export default function FindDesignerPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    renoType: "",
    budget: "",
    startDate: "",
  });

  function canProceed() {
    if (step === 0) return data.name.trim() && data.email.trim() && data.phone.trim();
    if (step === 1) return data.propertyType && data.renoType;
    if (step === 2) return data.budget && data.startDate;
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from("consumer_leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      category: "interior_designer",
      details: {
        propertyType: data.propertyType,
        renoType: data.renoType,
        budget: data.budget,
        startDate: data.startDate,
      },
      status: "new",
    });

    setLoading(false);

    if (error) {
      console.error("[Supabase error — consumer_leads designer insert]", error);
      setSubmitError(`Error: ${error.message}`);
      return;
    }

    setSubmitted(true);
  }

  const propertyLabel = PROPERTY_TYPES.find((p) => p.value === data.propertyType)?.label ?? "";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-2xl mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Find an Interior Designer</h1>
                <p className="text-slate-500 mt-1 text-sm">Share your renovation plans and we&apos;ll connect you with designers who know your space.</p>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((label, i) => (
                  <div key={i} className="flex-1">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-amber-500" : "bg-slate-200"}`} />
                    <p className={`text-xs mt-1.5 font-medium ${i === step ? "text-amber-600" : "text-slate-400"}`}>{label}</p>
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
                        placeholder="e.g. Priya Nair"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        placeholder="+65 9XXX XXXX"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-semibold text-slate-900 text-lg">About your space</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Property type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {PROPERTY_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setData({ ...data, propertyType: type.value })}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              data.propertyType === type.value
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Renovation type</label>
                      <div className="space-y-3">
                        {RENO_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setData({ ...data, renoType: type.value })}
                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                              data.renoType === type.value
                                ? "border-amber-500 bg-amber-50"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                          >
                            <p className={`text-sm font-semibold ${data.renoType === type.value ? "text-amber-700" : "text-slate-800"}`}>{type.label}</p>
                            <p className={`text-xs mt-0.5 ${data.renoType === type.value ? "text-amber-600" : "text-slate-500"}`}>{type.sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-semibold text-slate-900 text-lg">Budget & timing</h2>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">Renovation budget</label>
                      <div className="grid grid-cols-2 gap-3">
                        {BUDGETS.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setData({ ...data, budget: b })}
                            className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                              data.budget === b
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">When do you want to start?</label>
                      <div className="space-y-3">
                        {START_DATES.map((d) => (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => setData({ ...data, startDate: d.value })}
                            className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all ${
                              data.startDate === d.value
                                ? "border-amber-500 bg-amber-50 text-amber-700"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
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
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
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
                      className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      {loading ? "Submitting…" : "Find My Designer"}
                      {!loading && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">Free service · No cold calls · Vetted designers with proven portfolios</p>
            </>
          ) : (
            /* Confirmation */
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">You&apos;re all set, {data.name.split(" ")[0]}!</h2>
              <p className="text-slate-600 text-base mb-2">We will match you with vetted professionals within 24 hours.</p>
              <p className="text-slate-500 text-sm mb-8">A confirmation has been sent to <span className="font-medium text-slate-700">{data.email}</span>.</p>
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-left mb-8">
                <p className="text-sm font-semibold text-amber-800 mb-1">What happens next?</p>
                <ul className="text-sm text-amber-700 space-y-1.5">
                  <li>· We shortlist designers experienced with {propertyLabel} renovations in your budget</li>
                  <li>· You&apos;ll receive an introduction within 24 hours</li>
                  <li>· Browse portfolios and meet designers before committing to anything</li>
                </ul>
              </div>
              <a href="/" className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">← Back to MatchAdvisor</a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
