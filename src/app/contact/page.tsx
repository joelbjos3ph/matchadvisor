"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function canSubmit() {
    return form.name.trim() && form.email.trim() && form.message.trim();
  }

  async function handleSubmit() {
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error("Failed to send message.");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly at matchadvisorsg@gmail.com.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]"
        />
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight text-balance mb-5">
            We&apos;d love to{" "}
            <span className="text-indigo-600">hear from you</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Questions, partnership enquiries, or feedback on the platform — send us a message and we will get back to you within 1 business day.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          {!submitted ? (
            <div className="grid md:grid-cols-3 gap-10 items-start">

              {/* Sidebar */}
              <div className="flex flex-col gap-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Email us directly</p>
                    <a href="mailto:matchadvisorsg@gmail.com" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                      matchadvisorsg@gmail.com
                    </a>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-1">Response time</p>
                    <p className="text-sm text-slate-500">Within 1 business day</p>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                  <p className="text-sm font-semibold text-indigo-800 mb-1">Want to join as a professional?</p>
                  <p className="text-sm text-indigo-700 mb-3">Apply through our dedicated professionals page.</p>
                  <a href="/join" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Apply now →
                  </a>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Send a message</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
                  <input
                    type="text"
                    placeholder="e.g. Tan Wei Ming"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                  />
                </div>
                {submitError && (
                  <p className="text-sm text-red-500">{submitError}</p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit() || loading}
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  {loading ? "Sending…" : "Send message"}
                  {!loading && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Message received</h2>
              <p className="text-slate-600 mb-2">
                Thanks, {form.name.split(" ")[0]}. We will get back to you at{" "}
                <span className="font-medium text-slate-800">{form.email}</span> within 1 business day.
              </p>
              <p className="text-slate-500 text-sm mb-8">In the meantime, feel free to explore the platform.</p>
              <a href="/" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
                ← Back to home
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
