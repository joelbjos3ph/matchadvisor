"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function fmtSGD(n: number) {
  return `S$${Math.round(n).toLocaleString("en-SG")}`;
}

type PropertyType = "hdb-bto" | "hdb-resale" | "condo-new" | "condo-resale" | "landed";
type UnitSize = "3-room" | "4-room" | "5-room" | "executive" | "1-bedder" | "2-bedder" | "3-bedder" | "other";
type RenovStyle = "basic" | "modern" | "scandinavian" | "industrial" | "luxury";

interface FormState {
  propertyType: PropertyType;
  unitSize: UnitSize;
  style: RenovStyle;
  kitchen: boolean;
  bathroom: boolean;
  flooring: boolean;
  carpentry: boolean;
  electrical: boolean;
  painting: boolean;
  featureWall: boolean;
  falseCeiling: boolean;
  hacking: boolean;
}

const initial: FormState = {
  propertyType: "hdb-bto",
  unitSize: "4-room",
  style: "modern",
  kitchen: false,
  bathroom: false,
  flooring: false,
  carpentry: false,
  electrical: false,
  painting: false,
  featureWall: false,
  falseCeiling: false,
  hacking: false,
};

function isResaleProp(propertyType: PropertyType) {
  return propertyType === "hdb-resale" || propertyType === "condo-resale";
}

function getBaseRange(propertyType: PropertyType, unitSize: UnitSize): [number, number] {
  if (propertyType === "hdb-bto") {
    const map: Partial<Record<UnitSize, [number, number]>> = {
      "3-room": [25000, 45000],
      "4-room": [40000, 62000],
      "5-room": [45000, 70000],
      "executive": [50000, 78000],
    };
    return map[unitSize] ?? [38000, 58000];
  }
  if (propertyType === "hdb-resale") {
    const [bMin, bMax] = getBaseRange("hdb-bto", unitSize);
    return [Math.round(bMin * 1.25), Math.round(bMax * 1.25)];
  }
  if (propertyType === "condo-new") {
    const m = unitSize === "1-bedder" ? 0.85 : unitSize === "3-bedder" ? 1.15 : 1.0;
    return [Math.round(40000 * m), Math.round(80000 * m)];
  }
  if (propertyType === "condo-resale") {
    const m = unitSize === "1-bedder" ? 0.85 : unitSize === "3-bedder" ? 1.15 : 1.0;
    return [Math.round(80000 * m), Math.round(105000 * m)];
  }
  return [120000, 300000];
}

const styleMultiplier: Record<RenovStyle, number> = {
  basic: 0.85,
  modern: 1.0,
  scandinavian: 1.05,
  industrial: 1.1,
  luxury: 1.4,
};

const SCOPE_ITEMS: {
  key: keyof FormState;
  label: string;
  min: number;
  max: number;
  resaleOnly?: boolean;
}[] = [
  { key: "kitchen", label: "Kitchen renovation", min: 8000, max: 15000 },
  { key: "bathroom", label: "Bathroom renovation (per unit)", min: 4000, max: 8000 },
  { key: "flooring", label: "Flooring (whole home)", min: 3000, max: 8000 },
  { key: "carpentry", label: "Carpentry & built-ins", min: 8000, max: 20000 },
  { key: "electrical", label: "Electrical works", min: 3000, max: 8000 },
  { key: "painting", label: "Painting (whole home)", min: 1500, max: 3000 },
  { key: "featureWall", label: "Feature wall", min: 1500, max: 4000 },
  { key: "falseCeiling", label: "False ceiling", min: 2000, max: 5000 },
  { key: "hacking", label: "Hacking works", min: 3000, max: 8000, resaleOnly: true },
];

function computeResults(f: FormState) {
  const resale = isResaleProp(f.propertyType);
  const [baseMin, baseMax] = getBaseRange(f.propertyType, f.unitSize);
  const mult = styleMultiplier[f.style];
  const styledMin = Math.round(baseMin * mult);
  const styledMax = Math.round(baseMax * mult);

  const breakdown: { label: string; min: number; max: number }[] = [
    { label: "Base renovation (structure & prep)", min: styledMin, max: styledMax },
  ];

  let addMin = 0;
  let addMax = 0;

  for (const { key, label, min, max, resaleOnly } of SCOPE_ITEMS) {
    if (f[key] && !(resaleOnly && !resale)) {
      breakdown.push({ label, min, max });
      addMin += min;
      addMax += max;
    }
  }

  const totalMin = styledMin + addMin;
  const totalMax = styledMax + addMax;

  let tlMin = f.propertyType === "landed" ? 16 : resale ? 10 : 8;
  let tlMax = f.propertyType === "landed" ? 24 : resale ? 14 : 12;
  if (f.kitchen) { tlMin += 2; tlMax += 2; }
  if (f.bathroom) { tlMin += 1; tlMax += 1; }
  if (f.carpentry) { tlMin += 2; tlMax += 3; }
  if (f.hacking && resale) { tlMin += 1; tlMax += 2; }
  if (f.flooring) { tlMin += 1; tlMax += 1; }
  if (f.electrical) { tlMin += 1; tlMax += 1; }
  if (f.falseCeiling) { tlMin += 1; tlMax += 1; }

  const tips: string[] = [];

  if (f.kitchen && f.bathroom) {
    tips.push(
      "Bundle your wet works — engaging one contractor for both kitchen and bathroom tiling and waterproofing typically saves 8–12% versus separate contracts."
    );
  }
  if (f.carpentry) {
    tips.push(
      "Get at least 3 quotes for carpentry. It is the highest-variance line item in any renovation and prices can differ by 30% or more between ID firms."
    );
  }
  if (resale) {
    tips.push(
      "Build a 10–15% contingency buffer for resale units — unexpected concealed pipe or wiring issues are common once hacking begins and can add S$3,000–$8,000 to your bill."
    );
  }
  if (f.style === "luxury") {
    tips.push(
      "Phase your luxury renovation — complete the core structural works now and add statement pieces (marble accents, custom lighting, feature walls) 12–18 months later when cash flow allows."
    );
  }
  if (!f.electrical && resale) {
    tips.push(
      "Even without a full electrical renovation, a basic wiring inspection is strongly recommended for resale units — faulty concealed wiring is a safety and insurance liability."
    );
  }
  if (f.flooring && !f.hacking && resale) {
    tips.push(
      "Overlay vinyl planks over existing tiles to save S$3,000–$5,000 versus full hacking — a good option if existing tiles are level, intact, and free of lippage."
    );
  }
  if (tips.length < 3) {
    tips.push(
      "Schedule your renovation to start on a weekday — many contractors offer 3–5% savings by avoiding weekend surcharges for their workers."
    );
  }

  return { totalMin, totalMax, breakdown, tlMin, tlMax, tips: tips.slice(0, 3) };
}

const STEP_LABELS = ["Property Details", "Scope of Work", "Results"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="relative flex items-start justify-between mb-4">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-10" />
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-28">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < step
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : i === step
                  ? "bg-white border-indigo-600 text-indigo-600"
                  : "bg-white border-slate-200 text-slate-400"
              }`}
            >
              {i < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-xs font-medium text-center leading-tight ${
                i <= step ? "text-indigo-600" : "text-slate-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {helper && <p className="text-xs text-slate-400 mb-2">{helper}</p>}
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

const STYLE_OPTIONS: { value: RenovStyle; label: string; desc: string }[] = [
  { value: "basic", label: "Basic & Functional", desc: "Clean and practical — maximise utility within budget" },
  { value: "modern", label: "Modern & Minimalist", desc: "Clean lines, neutral palette, quality finishes" },
  { value: "scandinavian", label: "Scandinavian", desc: "Warm whites, natural wood tones, cosy feel" },
  { value: "industrial", label: "Industrial", desc: "Exposed concrete, metal accents, darker tones" },
  { value: "luxury", label: "Luxury", desc: "Premium materials, bespoke carpentry, statement pieces" },
];

const HDB_SIZES: { value: UnitSize; label: string }[] = [
  { value: "3-room", label: "3-Room" },
  { value: "4-room", label: "4-Room" },
  { value: "5-room", label: "5-Room" },
  { value: "executive", label: "Executive" },
  { value: "other", label: "Other" },
];

const CONDO_SIZES: { value: UnitSize; label: string }[] = [
  { value: "1-bedder", label: "1-Bedder" },
  { value: "2-bedder", label: "2-Bedder" },
  { value: "3-bedder", label: "3-Bedder" },
  { value: "other", label: "Other" },
];

function Step1({
  f,
  set,
  onNext,
}: {
  f: FormState;
  set: (k: keyof FormState, v: string | boolean) => void;
  onNext: () => void;
}) {
  const isHDB = f.propertyType === "hdb-bto" || f.propertyType === "hdb-resale";
  const isCondo = f.propertyType === "condo-new" || f.propertyType === "condo-resale";
  const sizeOptions = isHDB ? HDB_SIZES : isCondo ? CONDO_SIZES : [{ value: "other" as UnitSize, label: "Not applicable" }];

  function handlePropertyTypeChange(newType: PropertyType) {
    set("propertyType", newType);
    if (newType === "hdb-bto" || newType === "hdb-resale") {
      set("unitSize", "4-room");
    } else if (newType === "condo-new" || newType === "condo-resale") {
      set("unitSize", "2-bedder");
    } else {
      set("unitSize", "other");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Tell us about your property</h2>
      <p className="text-sm text-slate-500 mb-6">We use this to calibrate your renovation cost estimate.</p>
      <div className="flex flex-col gap-5">
        <Field label="Property type">
          <select
            value={f.propertyType}
            onChange={(e) => handlePropertyTypeChange(e.target.value as PropertyType)}
            className={inputCls}
          >
            <option value="hdb-bto">HDB BTO</option>
            <option value="hdb-resale">HDB Resale</option>
            <option value="condo-new">Condo (New)</option>
            <option value="condo-resale">Condo (Resale)</option>
            <option value="landed">Landed</option>
          </select>
        </Field>

        <Field label="Flat / unit size">
          <select
            value={f.unitSize}
            onChange={(e) => set("unitSize", e.target.value as UnitSize)}
            className={inputCls}
          >
            {sizeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Renovation style">
          <div className="flex flex-col gap-2 mt-1">
            {STYLE_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => set("style", s.value)}
                className={`flex items-center gap-4 text-left px-4 py-3 rounded-xl border-2 transition-all ${
                  f.style === s.value
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                    f.style === s.value
                      ? "border-indigo-600 bg-indigo-600"
                      : "border-slate-300 bg-white"
                  }`}
                />
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      f.style === s.value ? "text-indigo-700" : "text-slate-900"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Step2({
  f,
  set,
  onBack,
  onNext,
}: {
  f: FormState;
  set: (k: keyof FormState, v: string | boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const resale = isResaleProp(f.propertyType);

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">What are you renovating?</h2>
      <p className="text-sm text-slate-500 mb-6">
        Select everything you plan to include. Cost ranges shown are per item.
      </p>
      <div className="flex flex-col gap-3">
        {SCOPE_ITEMS.map(({ key, label, min, max, resaleOnly }) => {
          const disabled = !!resaleOnly && !resale;
          const checked = f[key] as boolean;
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => set(key, !checked)}
              className={`flex items-center gap-4 text-left px-4 py-4 rounded-xl border-2 transition-all ${
                disabled
                  ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                  : checked
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                  checked && !disabled
                    ? "bg-indigo-600 border-indigo-600"
                    : "border-slate-300 bg-white"
                }`}
              >
                {checked && !disabled && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p
                    className={`text-sm font-semibold ${
                      checked && !disabled ? "text-indigo-700" : "text-slate-900"
                    }`}
                  >
                    {label}
                  </p>
                  {resaleOnly && (
                    <span className="text-xs text-slate-400 font-medium">(resale only)</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {fmtSGD(min)} – {fmtSGD(max)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold px-4 py-3 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          See estimate
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const PROPERTY_LABELS: Record<PropertyType, string> = {
  "hdb-bto": "HDB BTO",
  "hdb-resale": "HDB Resale",
  "condo-new": "Condo (New)",
  "condo-resale": "Condo (Resale)",
  "landed": "Landed",
};

const STYLE_LABELS: Record<RenovStyle, string> = {
  basic: "Basic & Functional",
  modern: "Modern & Minimalist",
  scandinavian: "Scandinavian",
  industrial: "Industrial",
  luxury: "Luxury",
};

function Results({ f, onBack }: { f: FormState; onBack: () => void }) {
  const { totalMin, totalMax, breakdown, tlMin, tlMax, tips } = computeResults(f);

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Your renovation cost estimate</h2>
      <p className="text-sm text-slate-500 mb-6">
        {PROPERTY_LABELS[f.propertyType]} · {STYLE_LABELS[f.style]} · Based on 2026 Singapore market rates
      </p>

      {/* Total range */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-5 text-center">
        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-2">
          Estimated total cost range
        </p>
        <p className="text-4xl font-bold text-indigo-700">
          {fmtSGD(totalMin)} – {fmtSGD(totalMax)}
        </p>
        <p className="text-xs text-indigo-400 mt-2">
          Indicative range. Final cost depends on contractor quotes and material selections.
        </p>
      </div>

      {/* Breakdown */}
      <div className="border border-slate-200 rounded-2xl p-5 mb-5 bg-white">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Cost breakdown by category</h3>
        <div className="flex flex-col divide-y divide-slate-100">
          {breakdown.map(({ label, min, max }, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-slate-600">{label}</span>
              <span className="text-sm font-semibold text-slate-900">
                {fmtSGD(min)} – {fmtSGD(max)}
              </span>
            </div>
          ))}
        </div>
        {breakdown.length > 1 && (
          <div className="mt-3 pt-3 border-t-2 border-slate-200 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">Total range</span>
            <span className="text-base font-bold text-indigo-600">
              {fmtSGD(totalMin)} – {fmtSGD(totalMax)}
            </span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="border border-slate-200 rounded-2xl p-5 mb-5 bg-white">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Estimated timeline</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {tlMin}–{tlMax} weeks
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              From start of works to handover, including defects rectification
            </p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900 mb-3">
          Money-saving tips for your renovation
        </h3>
        <div className="flex flex-col gap-3">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 rounded-2xl p-6 text-center">
        <p className="text-white font-bold text-lg mb-1">Ready to bring your home to life?</p>
        <p className="text-indigo-200 text-sm mb-4">
          Get matched with a verified interior designer who specialises in your property type and renovation style.
        </p>
        <Link
          href="/find-designer"
          className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Get matched with a verified interior designer
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Edit scope
        </button>
        <p className="text-xs text-slate-400">Estimates only. Not a contractor quote.</p>
      </div>
    </div>
  );
}

export default function RenovationCalculator() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>(initial);

  function set(k: keyof FormState, v: string | boolean) {
    setF((prev) => ({ ...prev, [k]: v }));
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
              Free Renovation Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Renovation Cost Estimator
            </h1>
            <p className="text-slate-500 max-w-md mx-auto">
              Get a realistic cost range for your Singapore home renovation — based on 2026 market rates.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ProgressBar step={step} />
            {step === 0 && <Step1 f={f} set={set} onNext={() => setStep(1)} />}
            {step === 1 && (
              <Step2 f={f} set={set} onBack={() => setStep(0)} onNext={() => setStep(2)} />
            )}
            {step === 2 && <Results f={f} onBack={() => setStep(1)} />}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            This calculator provides general estimates only and does not constitute a contractor quote or professional advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
