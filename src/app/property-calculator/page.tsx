"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function fmt(n: number) {
  if (n >= 1_000_000) return `S$${(n / 1_000_000).toFixed(2)}M`;
  return `S$${Math.round(n).toLocaleString("en-SG")}`;
}

function num(s: string) {
  return parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
}

type FlatType = "3-room" | "4-room" | "5-room" | "executive";
type SellReason = "upgrading" | "downgrading" | "moving" | "investment" | "other";

interface FormState {
  flatType: FlatType;
  yearBought: string;
  purchasePrice: string;
  outstandingLoan: string;
  estCurrentValue: number;
  cpfUsed: string;
  reason: SellReason;
}

const CURRENT_YEAR = 2026;
const MOP_YEARS = 5;

function computeResults(f: FormState) {
  const yearBought = parseInt(f.yearBought) || CURRENT_YEAR - 5;
  const purchasePrice = num(f.purchasePrice);
  const outstandingLoan = num(f.outstandingLoan);
  const estValue = f.estCurrentValue;
  const cpfUsed = num(f.cpfUsed);

  const yearsHeld = Math.max(CURRENT_YEAR - yearBought, 0);
  const mopMet = yearsHeld >= MOP_YEARS;
  const mopRemainingYears = mopMet ? 0 : MOP_YEARS - yearsHeld;
  const mopEligibleYear = yearBought + MOP_YEARS;

  // CPF accrued interest at 2.5% p.a. compound
  const cpfRefund = Math.round(cpfUsed * Math.pow(1.025, yearsHeld));
  const cpfInterest = cpfRefund - Math.round(cpfUsed);

  // Transaction costs
  const agentFee = Math.round(estValue * 0.01);
  const legalFee = 2800;

  // Net proceeds (cash in hand)
  const netProceeds = estValue - cpfRefund - agentFee - legalFee - outstandingLoan;

  // Price appreciation
  const appreciationPct = purchasePrice > 0 ? ((estValue - purchasePrice) / purchasePrice) * 100 : 0;
  const absoluteGain = estValue - purchasePrice;

  // Upgrade options
  const upgradeOptions: { title: string; desc: string }[] = [];
  if (f.reason === "upgrading") {
    if (f.flatType === "3-room") {
      upgradeOptions.push({ title: "4-Room or 5-Room HDB", desc: "More space in a mature or non-mature estate, still within HDB pricing" });
      upgradeOptions.push({ title: "Executive Condominium (EC)", desc: "If your household income is under S$16,000, an EC offers condo facilities at below-market prices" });
    } else if (f.flatType === "4-room") {
      upgradeOptions.push({ title: "5-Room or Executive Apartment HDB", desc: "Largest HDB flat types — ideal for growing families" });
      upgradeOptions.push({ title: "Executive Condominium (EC)", desc: "A popular next step with full privatisation after 10 years" });
      upgradeOptions.push({ title: "Private condominium (entry-level)", desc: "OCR condos typically start from S$1.1M–S$1.3M for a 2-bedder" });
    } else {
      upgradeOptions.push({ title: "Executive Condominium (EC)", desc: "A cost-effective private-property option with eligibility conditions" });
      upgradeOptions.push({ title: "Private condominium", desc: "No restrictions — RCR and CCR condos offer higher capital appreciation potential" });
      upgradeOptions.push({ title: "Landed property", desc: "Terraces and semi-detached homes for families seeking more space and privacy" });
    }
  }

  return {
    mopMet,
    mopRemainingYears,
    mopEligibleYear,
    yearsHeld,
    cpfRefund,
    cpfInterest,
    agentFee,
    legalFee,
    outstandingLoan,
    netProceeds,
    appreciationPct,
    absoluteGain,
    upgradeOptions,
  };
}

const STEP_LABELS = ["Property Details", "Market Value", "Results"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="relative flex items-start justify-between mb-4">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-10" />
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-24">
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
            <span className={`text-xs font-medium text-center leading-tight ${i <= step ? "text-indigo-600" : "text-slate-400"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, helper, children }: { label: string; helper?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>
      {helper && <p className="text-xs text-slate-400 mb-2">{helper}</p>}
      {children}
    </div>
  );
}

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

const yearOptions = Array.from({ length: 40 }, (_, i) => CURRENT_YEAR - i);

function Step1({
  f,
  set,
  onNext,
}: {
  f: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onNext: () => void;
}) {
  const valid = num(f.purchasePrice) > 0 && parseInt(f.yearBought) > 1960;
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Tell us about your flat</h2>
      <p className="text-sm text-slate-500 mb-6">We will use this to calculate MOP status and your loan position.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Flat type">
          <select value={f.flatType} onChange={(e) => set("flatType", e.target.value as FlatType)} className={inputCls}>
            <option value="3-room">3-Room</option>
            <option value="4-room">4-Room</option>
            <option value="5-room">5-Room</option>
            <option value="executive">Executive Apartment (EA)</option>
          </select>
        </Field>
        <Field label="Year of purchase">
          <select value={f.yearBought} onChange={(e) => set("yearBought", e.target.value)} className={inputCls}>
            <option value="">Select year</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </Field>
        <Field label="Purchase price (SGD)" helper="What you paid when you bought the flat">
          <input
            type="number"
            min={0}
            placeholder="e.g. 380000"
            value={f.purchasePrice}
            onChange={(e) => set("purchasePrice", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Outstanding HDB / bank loan (SGD)" helper="Remaining loan balance today">
          <input
            type="number"
            min={0}
            placeholder="e.g. 150000"
            value={f.outstandingLoan}
            onChange={(e) => set("outstandingLoan", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          disabled={!valid}
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
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

const reasonLabels: Record<SellReason, string> = {
  upgrading: "Upgrading to a larger/private property",
  downgrading: "Downgrading to a smaller flat",
  moving: "Moving location",
  investment: "Cashing out investment",
  other: "Other reason",
};

function Step2({
  f,
  set,
  onBack,
  onNext,
}: {
  f: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const purchasePrice = num(f.purchasePrice);
  const sliderMin = Math.max(100_000, Math.round(purchasePrice * 0.5 / 10000) * 10000);
  const sliderMax = Math.max(1_500_000, Math.round(purchasePrice * 3 / 10000) * 10000);

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Market value and selling context</h2>
      <p className="text-sm text-slate-500 mb-6">Use HDB resale price data or a recent valuation as your estimate.</p>
      <div className="flex flex-col gap-6">
        <Field label="Estimated current market value" helper="Drag the slider or use recent transacted prices on HDB Resale Portal">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="text-3xl font-bold text-indigo-600 text-center mb-4">
              {fmt(f.estCurrentValue)}
            </div>
            <input
              type="range"
              min={sliderMin}
              max={sliderMax}
              step={10000}
              value={f.estCurrentValue}
              onChange={(e) => set("estCurrentValue", Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>{fmt(sliderMin)}</span>
              <span>{fmt(sliderMax)}</span>
            </div>
          </div>
        </Field>
        <Field label="CPF used (principal only, SGD)" helper="Total CPF withdrawn for this flat — check My CPF portal">
          <input
            type="number"
            min={0}
            placeholder="e.g. 120000"
            value={f.cpfUsed}
            onChange={(e) => set("cpfUsed", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Reason for selling">
          <div className="grid sm:grid-cols-2 gap-2">
            {(Object.keys(reasonLabels) as SellReason[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => set("reason", r)}
                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  f.reason === r ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {reasonLabels[r]}
              </button>
            ))}
          </div>
        </Field>
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
          See my results
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function ResultRow({ label, value, highlight }: { label: string; value: string; highlight?: "red" | "green" | "neutral" }) {
  const cls =
    highlight === "red"
      ? "text-red-600 font-bold"
      : highlight === "green"
      ? "text-emerald-600 font-bold"
      : "text-slate-900 font-semibold";
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm ${cls}`}>{value}</span>
    </div>
  );
}

function Results({ f, onBack }: { f: FormState; onBack: () => void }) {
  const r = computeResults(f);

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Your HDB sale snapshot</h2>
      <p className="text-sm text-slate-500 mb-6">Estimates based on standard CPF accrued interest, 1% agent fee, and S$2,800 legal fee.</p>

      {/* MOP status */}
      <div className={`rounded-2xl border p-5 mb-5 ${r.mopMet ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
        <div className="flex items-center gap-3">
          {r.mopMet ? (
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
          )}
          <div>
            <p className={`text-sm font-bold ${r.mopMet ? "text-emerald-800" : "text-amber-800"}`}>
              {r.mopMet ? "MOP fulfilled — you can sell" : `MOP not yet met — ${r.mopRemainingYears} year${r.mopRemainingYears !== 1 ? "s" : ""} remaining`}
            </p>
            <p className={`text-xs mt-0.5 ${r.mopMet ? "text-emerald-700" : "text-amber-700"}`}>
              {r.mopMet
                ? `You've owned this flat for ${r.yearsHeld} years, past the 5-year Minimum Occupation Period.`
                : `MOP completes in ${r.mopEligibleYear}. You cannot list the flat on the open market before then.`}
            </p>
          </div>
        </div>
      </div>

      {/* Net proceeds */}
      <div className="border border-slate-200 rounded-2xl p-5 mb-5 bg-white">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Estimated net proceeds breakdown</h3>
        <ResultRow label="Sale price (estimated)" value={fmt(f.estCurrentValue)} />
        <ResultRow label={`CPF refund (incl. ${fmt(r.cpfInterest)} accrued interest)`} value={`−${fmt(r.cpfRefund)}`} highlight="red" />
        <ResultRow label="Agent fee (1%)" value={`−${fmt(r.agentFee)}`} highlight="red" />
        <ResultRow label="Legal fees (est.)" value={`−S$2,800`} highlight="red" />
        <ResultRow label="Outstanding loan" value={r.outstandingLoan > 0 ? `−${fmt(r.outstandingLoan)}` : "None"} highlight={r.outstandingLoan > 0 ? "red" : "neutral"} />
        <div className="mt-3 pt-3 border-t-2 border-slate-200 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Estimated net cash proceeds</span>
          <span className={`text-lg font-bold ${r.netProceeds >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            {r.netProceeds >= 0 ? fmt(r.netProceeds) : `−${fmt(Math.abs(r.netProceeds))}`}
          </span>
        </div>
      </div>

      {/* Price appreciation */}
      <div className="border border-slate-200 rounded-2xl p-5 mb-5 bg-white">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Price appreciation</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500 mb-1">Absolute gain</p>
            <p className={`text-xl font-bold ${r.absoluteGain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {r.absoluteGain >= 0 ? `+${fmt(r.absoluteGain)}` : `−${fmt(Math.abs(r.absoluteGain))}`}
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500 mb-1">% appreciation</p>
            <p className={`text-xl font-bold ${r.appreciationPct >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {r.appreciationPct >= 0 ? "+" : ""}{r.appreciationPct.toFixed(1)}%
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">
          Over {r.yearsHeld} year{r.yearsHeld !== 1 ? "s" : ""} — {(r.appreciationPct / Math.max(r.yearsHeld, 1)).toFixed(1)}% annualised
        </p>
      </div>

      {/* Upgrade options */}
      {r.upgradeOptions.length > 0 && (
        <div className="border border-slate-200 rounded-2xl p-5 mb-5 bg-white">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Upgrade options to consider</h3>
          <div className="flex flex-col gap-3">
            {r.upgradeOptions.map((opt, i) => (
              <div key={i} className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-indigo-900 mb-0.5">{opt.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-indigo-600 rounded-2xl p-6 text-center">
        <p className="text-white font-bold text-lg mb-1">Ready to list your flat?</p>
        <p className="text-indigo-200 text-sm mb-4">
          Get matched with a CEA-registered agent who knows your estate and can get you the best price.
        </p>
        <Link
          href="/find-agent"
          className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Get matched with a property agent
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
          Edit answers
        </button>
        <p className="text-xs text-slate-400">Estimates only. Not financial or legal advice.</p>
      </div>
    </div>
  );
}

export default function PropertyCalculator() {
  const [step, setStep] = useState(0);
  const [f, setF] = useState<FormState>({
    flatType: "4-room",
    yearBought: "",
    purchasePrice: "",
    outstandingLoan: "",
    estCurrentValue: 500_000,
    cpfUsed: "",
    reason: "upgrading",
  });

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
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
              Free Property Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">HDB Seller Calculator</h1>
            <p className="text-slate-500 max-w-md mx-auto">
              Find out your MOP status, net proceeds after CPF refund, and what you can upgrade to.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ProgressBar step={step} />
            {step === 0 && <Step1 f={f} set={set} onNext={() => setStep(1)} />}
            {step === 1 && <Step2 f={f} set={set} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
            {step === 2 && <Results f={f} onBack={() => setStep(1)} />}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            This calculator provides general estimates only and does not constitute financial or legal advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
