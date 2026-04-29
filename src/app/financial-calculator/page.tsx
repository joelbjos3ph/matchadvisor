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

interface FormState {
  age: string;
  monthlyIncome: string;
  maritalStatus: string;
  numChildren: string;
  existingInsurance: string;
  currentSavings: string;
  outstandingLoans: string;
  retirementPlanning: boolean;
  childrenEducation: boolean;
  incomeProtection: boolean;
  wealthAccumulation: boolean;
  estatePlanning: boolean;
}

const initial: FormState = {
  age: "",
  monthlyIncome: "",
  maritalStatus: "single",
  numChildren: "0",
  existingInsurance: "",
  currentSavings: "",
  outstandingLoans: "",
  retirementPlanning: false,
  childrenEducation: false,
  incomeProtection: false,
  wealthAccumulation: false,
  estatePlanning: false,
};

function computeResults(f: FormState) {
  const age = num(f.age) || 30;
  const income = num(f.monthlyIncome);
  const children = num(f.numChildren);
  const insurance = num(f.existingInsurance);
  const savings = num(f.currentSavings);
  const loans = num(f.outstandingLoans);
  const annualIncome = income * 12;

  const recInsurance = (10 + children * 2) * annualIncome;
  const insuranceGap = Math.max(recInsurance - insurance, 0);

  const monthlyRetNeed = income * 0.7;
  const targetNestEgg = (monthlyRetNeed * 12) / 0.04;
  const retirementGap = Math.max(targetNestEgg - savings, 0);
  const yearsToRetirement = Math.max(65 - age, 1);
  const monthlyTopUp = Math.round(retirementGap / (yearsToRetirement * 12));

  const insScore = recInsurance > 0 ? Math.min(insurance / recInsurance, 1) * 35 : 0;
  const savScore = targetNestEgg > 0 ? Math.min(savings / targetNestEgg, 1) * 35 : 0;
  const debtRatio = annualIncome > 0 ? loans / (annualIncome * 5) : 0;
  const debtScore = Math.max(1 - Math.min(debtRatio, 1), 0) * 20;
  const goalsCount = [
    f.retirementPlanning,
    f.childrenEducation,
    f.incomeProtection,
    f.wealthAccumulation,
    f.estatePlanning,
  ].filter(Boolean).length;
  const goalsScore = (goalsCount / 5) * 10;
  const score = Math.round(insScore + savScore + debtScore + goalsScore);

  const recs: { title: string; body: string }[] = [];

  if (insuranceGap > 0) {
    recs.push({
      title: "Close your insurance gap",
      body: `Your sum assured is ${fmt(insuranceGap)} below the recommended level for your income and family size. A term life plan is the most cost-effective way to bridge this.`,
    });
  }

  if (retirementGap > 0 && yearsToRetirement > 2) {
    recs.push({
      title: "Boost your retirement savings",
      body: `Setting aside ${fmt(monthlyTopUp)}/month into your CPF SA or SRS account now can close your ${fmt(retirementGap)} retirement gap by age 65.`,
    });
  }

  if (loans > annualIncome * 2) {
    recs.push({
      title: "Prioritise debt reduction",
      body: `Your outstanding loans are high relative to your income. Clearing high-interest debt first frees up cash flow for savings and investments.`,
    });
  }

  if (f.childrenEducation && children > 0) {
    recs.push({
      title: "Start an education fund early",
      body: `For ${children === 1 ? "your child's" : `your ${children} children's`} university education, an endowment plan or regular savings plan started today benefits most from compounding over 15–18 years.`,
    });
  }

  if (f.estatePlanning) {
    recs.push({
      title: "Draft a will and LPA",
      body: `A will and Lasting Power of Attorney (LPA) ensure your assets go to the right people and that someone you trust can act on your behalf if needed.`,
    });
  }

  if (f.wealthAccumulation && recs.length < 4) {
    recs.push({
      title: "Grow wealth through investing",
      body: `Unit trusts, REITs, and Regular Savings Plans (RSPs) are accessible starting points for building long-term wealth alongside your CPF.`,
    });
  }

  if (f.incomeProtection && recs.length < 4) {
    recs.push({
      title: "Protect your income",
      body: `A disability income or critical illness plan replaces your salary if you're unable to work — often the most overlooked gap in Singapore households.`,
    });
  }

  return { score, insuranceGap, recInsurance, retirementGap, targetNestEgg, monthlyTopUp, recs: recs.slice(0, 4) };
}

const STEP_LABELS = ["Personal Info", "Coverage", "Goals", "Results"];

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="relative flex items-start justify-between mb-4">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 -z-10" />
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-16">
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

function Step1({
  f,
  set,
  onNext,
}: {
  f: FormState;
  set: (k: keyof FormState, v: string | boolean) => void;
  onNext: () => void;
}) {
  const valid = num(f.age) >= 18 && num(f.age) <= 70 && num(f.monthlyIncome) > 0;
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Tell us about yourself</h2>
      <p className="text-sm text-slate-500 mb-6">We use this to calibrate your coverage benchmarks.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Age" helper="Must be between 18 and 70">
          <input
            type="number"
            min={18}
            max={70}
            placeholder="e.g. 35"
            value={f.age}
            onChange={(e) => set("age", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Monthly take-home income" helper="After CPF deduction (SGD)">
          <input
            type="number"
            min={0}
            placeholder="e.g. 5000"
            value={f.monthlyIncome}
            onChange={(e) => set("monthlyIncome", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Marital status">
          <select
            value={f.maritalStatus}
            onChange={(e) => set("maritalStatus", e.target.value)}
            className={inputCls}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </Field>
        <Field label="Number of dependent children">
          <select
            value={f.numChildren}
            onChange={(e) => set("numChildren", e.target.value)}
            className={inputCls}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n === 0 ? "None" : n}</option>
            ))}
          </select>
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
  const valid = num(f.monthlyIncome) > 0;
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Your current coverage</h2>
      <p className="text-sm text-slate-500 mb-6">Enter 0 if you do not have a particular item yet.</p>
      <div className="flex flex-col gap-5">
        <Field label="Total sum assured (all insurance policies)" helper="Combined payout if you pass away — check your policy documents">
          <input
            type="number"
            min={0}
            placeholder="e.g. 200000"
            value={f.existingInsurance}
            onChange={(e) => set("existingInsurance", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Total savings and investments (incl. CPF OA + SA)" helper="Include CPF, bank savings, unit trusts, shares">
          <input
            type="number"
            min={0}
            placeholder="e.g. 80000"
            value={f.currentSavings}
            onChange={(e) => set("currentSavings", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Total outstanding loans" helper="Mortgage, car loan, personal loans combined">
          <input
            type="number"
            min={0}
            placeholder="e.g. 350000"
            value={f.outstandingLoans}
            onChange={(e) => set("outstandingLoans", e.target.value)}
            className={inputCls}
          />
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

const goalsList: { key: keyof FormState; label: string; desc: string }[] = [
  { key: "retirementPlanning", label: "Retirement planning", desc: "Build a nest egg that lets you retire comfortably" },
  { key: "childrenEducation", label: "Children's education", desc: "Fund local or overseas university costs" },
  { key: "incomeProtection", label: "Income protection", desc: "Replace your salary if you can't work" },
  { key: "wealthAccumulation", label: "Wealth accumulation", desc: "Grow your money beyond savings interest" },
  { key: "estatePlanning", label: "Estate planning", desc: "Ensure your assets go to the right people" },
];

function Step3({
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
  const any = goalsList.some((g) => f[g.key] as boolean);
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">What are your financial goals?</h2>
      <p className="text-sm text-slate-500 mb-6">Select all that apply. This shapes your personalised recommendations.</p>
      <div className="flex flex-col gap-3">
        {goalsList.map(({ key, label, desc }) => {
          const checked = f[key] as boolean;
          return (
            <button
              key={key}
              type="button"
              onClick={() => set(key, !checked)}
              className={`flex items-center gap-4 text-left px-4 py-4 rounded-xl border-2 transition-all ${
                checked ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                  checked ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white"
                }`}
              >
                {checked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${checked ? "text-indigo-700" : "text-slate-900"}`}>{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
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
          disabled={!any}
          onClick={onNext}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
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

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const color =
    score >= 80 ? "#10b981" : score >= 60 ? "#3b82f6" : score >= 40 ? "#f59e0b" : "#ef4444";
  const label =
    score >= 80 ? "Well Protected" : score >= 60 ? "Fairly Covered" : score >= 40 ? "Needs Attention" : "Under-covered";
  const bgColor =
    score >= 80 ? "bg-emerald-50 border-emerald-100" : score >= 60 ? "bg-blue-50 border-blue-100" : score >= 40 ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100";

  return (
    <div className={`border rounded-2xl p-6 flex flex-col items-center text-center ${bgColor}`}>
      <p className="text-sm font-semibold text-slate-500 mb-3">Coverage Score</p>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx={64} cy={64} r={r} fill="none" stroke="#e2e8f0" strokeWidth={10} />
          <circle
            cx={64}
            cy={64}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - filled}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-slate-900">{score}</span>
          <span className="text-xs text-slate-400 font-medium">out of 100</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-bold" style={{ color }}>{label}</p>
    </div>
  );
}

function Results({ f, onBack }: { f: FormState; onBack: () => void }) {
  const { score, insuranceGap, recInsurance, retirementGap, targetNestEgg, recs } = computeResults(f);

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Your financial health snapshot</h2>
      <p className="text-sm text-slate-500 mb-6">Based on your inputs. Speak to a licensed advisor for personalised advice.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <ScoreRing score={score} />

        <div className="border border-slate-200 rounded-2xl p-5 bg-white sm:col-span-2 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">Recommended insurance</span>
              <span className="text-sm font-bold text-slate-900">{fmt(recInsurance)}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">Insurance gap</span>
              <span className={`text-sm font-bold ${insuranceGap > 0 ? "text-red-600" : "text-emerald-600"}`}>
                {insuranceGap > 0 ? `−${fmt(insuranceGap)}` : "None"}
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">Retirement savings target</span>
              <span className="text-sm font-bold text-slate-900">{fmt(targetNestEgg)}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">Retirement savings gap</span>
              <span className={`text-sm font-bold ${retirementGap > 0 ? "text-red-600" : "text-emerald-600"}`}>
                {retirementGap > 0 ? `−${fmt(retirementGap)}` : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {recs.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900 mb-3">Your recommendations</h3>
          <div className="flex flex-col gap-3">
            {recs.map((rec, i) => (
              <div key={i} className="flex gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-0.5">{rec.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{rec.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-indigo-600 rounded-2xl p-6 text-center">
        <p className="text-white font-bold text-lg mb-1">Ready to act on these insights?</p>
        <p className="text-indigo-200 text-sm mb-4">Get matched with a MAS-licensed financial advisor who can build a personalised plan for you.</p>
        <Link
          href="/find-advisor"
          className="inline-flex items-center gap-2 bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Get matched with a financial advisor
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
        <p className="text-xs text-slate-400">Estimates only. Not financial advice.</p>
      </div>
    </div>
  );
}

export default function FinancialCalculator() {
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
              Free Financial Tool
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Financial Needs Calculator</h1>
            <p className="text-slate-500 max-w-md mx-auto">
              Find out how well-covered you are and where the gaps are — in under 2 minutes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ProgressBar step={step} />
            {step === 0 && <Step1 f={f} set={set} onNext={() => setStep(1)} />}
            {step === 1 && <Step2 f={f} set={set} onBack={() => setStep(0)} onNext={() => setStep(2)} />}
            {step === 2 && <Step3 f={f} set={set} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
            {step === 3 && <Results f={f} onBack={() => setStep(2)} />}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            This calculator provides general estimates only and does not constitute financial advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
