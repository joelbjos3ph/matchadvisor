"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  licenceNumber: string;
  yearsOfExperience: string;
  bio: string;
};

const initialData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  profession: "",
  licenceNumber: "",
  yearsOfExperience: "",
  bio: "",
};

const professions = [
  { value: "financial_advisor", label: "Financial Advisor" },
  { value: "property_agent", label: "Property Agent" },
  { value: "interior_designer", label: "Interior Designer" },
];

export default function JoinPage() {
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<FormData> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "A valid email address is required.";
    if (!form.phone.trim() || !/^[+\d\s()-]{8,}$/.test(form.phone))
      next.phone = "A valid phone number is required.";
    if (!form.profession) next.profession = "Please select your profession.";
    if (!form.licenceNumber.trim())
      next.licenceNumber = "Licence / registration number is required.";
    if (
      !form.yearsOfExperience ||
      isNaN(Number(form.yearsOfExperience)) ||
      Number(form.yearsOfExperience) < 0
    )
      next.yearsOfExperience = "Please enter your years of experience.";
    if (!form.bio.trim() || form.bio.trim().length < 30)
      next.bio = "Please write at least 30 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError(null);

    const { error } = await supabase.from("professionals").insert({
      name: form.fullName,
      email: form.email,
      phone: form.phone,
      type: form.profession,
      licence_number: form.licenceNumber,
      years_experience: Number(form.yearsOfExperience),
      bio: form.bio,
      verified: false,
    });

    setLoading(false);

    if (error) {
      console.error("[Supabase error — professionals insert]", error);
      setSubmitError(`Error: ${error.message}`);
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <section className="flex items-center justify-center min-h-[calc(100vh-64px)] px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              Application received!
            </h1>
            <p className="text-slate-500 leading-relaxed mb-8">
              Thank you, <span className="font-medium text-slate-700">{form.fullName}</span>. We&apos;ve received your
              application and will review your credentials within 2–3 business
              days. We&apos;ll be in touch at{" "}
              <span className="font-medium text-slate-700">{form.email}</span>.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Back to home
            </a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Grow your client base
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Join as a Professional
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Apply to be listed on MatchAdvisor. All applications are reviewed
            and verified before approval — keeping the platform trusted.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Personal details
            </h2>

            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <Field
                label="Full name"
                error={errors.fullName}
                required
              >
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jane Tan"
                  className={inputCls(!!errors.fullName)}
                />
              </Field>

              <Field label="Email address" error={errors.email} required>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className={inputCls(!!errors.email)}
                />
              </Field>
            </div>

            <div className="mb-5">
              <Field label="Phone number" error={errors.phone} required>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+65 9123 4567"
                  className={inputCls(!!errors.phone)}
                />
              </Field>
            </div>

            <div className="border-t border-slate-100 pt-8 mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Professional details
              </h2>

              <div className="mb-5">
                <Field
                  label="Profession type"
                  error={errors.profession}
                  required
                >
                  <select
                    name="profession"
                    value={form.profession}
                    onChange={handleChange}
                    className={inputCls(!!errors.profession)}
                  >
                    <option value="">Select your profession</option>
                    {professions.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field
                  label="Licence / registration number"
                  error={errors.licenceNumber}
                  required
                  hint="e.g. MAS FA number, CEA registration"
                >
                  <input
                    type="text"
                    name="licenceNumber"
                    value={form.licenceNumber}
                    onChange={handleChange}
                    placeholder="e.g. FA12345"
                    className={inputCls(!!errors.licenceNumber)}
                  />
                </Field>

                <Field
                  label="Years of experience"
                  error={errors.yearsOfExperience}
                  required
                >
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={form.yearsOfExperience}
                    onChange={handleChange}
                    min={0}
                    max={60}
                    placeholder="e.g. 5"
                    className={inputCls(!!errors.yearsOfExperience)}
                  />
                </Field>
              </div>

              <div className="mb-8">
                <Field
                  label="Short bio"
                  error={errors.bio}
                  required
                  hint={`${form.bio.length} characters — minimum 30`}
                >
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell potential clients about your background, specialisations, and what makes you the right professional for them..."
                    className={`${inputCls(!!errors.bio)} resize-none`}
                  />
                </Field>
              </div>
            </div>

            {/* Trust note */}
            <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-8 text-sm text-slate-500">
              <svg
                className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <span>
                Your application will be reviewed within{" "}
                <strong className="text-slate-700">2–3 business days</strong>.
                We verify all licences and credentials before approving your
                listing.
              </span>
            </div>

            {submitError && (
              <p className="mb-4 text-sm text-red-500 text-center">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm shadow-indigo-200 text-base"
            >
              {loading ? "Submitting…" : "Submit application"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-2.5 rounded-lg border text-slate-900 text-sm bg-white",
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 transition",
    hasError
      ? "border-red-300 focus:ring-red-200"
      : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400",
  ].join(" ");
}

function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-indigo-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
