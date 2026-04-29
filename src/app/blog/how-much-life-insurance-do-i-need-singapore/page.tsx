import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How Much Life Insurance Do I Need in Singapore? A Straight-Talking Guide",
  description:
    "The average Singaporean is covered for less than half of what they need. Here's how to calculate the right amount of life insurance — and what to do about critical illness and employer coverage.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/blog/how-much-life-insurance-do-i-need-singapore",
  },
  openGraph: {
    title: "How Much Life Insurance Do I Need in Singapore? A Straight-Talking Guide",
    description:
      "Plain-English breakdown: the 10x income formula, term vs whole life, CI cover, employer gaps, and a real worked example.",
    url: "https://matchadvisor.vercel.app/blog/how-much-life-insurance-do-i-need-singapore",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Life Insurance Do I Need in Singapore? A Straight-Talking Guide",
  description:
    "The average Singaporean is covered for less than half of what they need. Here's how to calculate the right amount of life insurance — and what to do about critical illness and employer coverage.",
  author: { "@type": "Organization", name: "MatchAdvisor Editorial" },
  publisher: { "@type": "Organization", name: "MatchAdvisor" },
  datePublished: "2026-04-29",
  url: "https://matchadvisor.vercel.app/blog/how-much-life-insurance-do-i-need-singapore",
};

const factors = [
  {
    label: "Income replacement",
    detail: "How many years of income your dependants need — typically 5–10 years.",
  },
  {
    label: "Outstanding debts",
    detail: "Mortgage balance, car loan, personal loans. These don't disappear when you do.",
  },
  {
    label: "Children's education",
    detail: "S$80k–S$200k per child for a local degree; S$200k–S$500k for overseas.",
  },
  {
    label: "Funeral and admin costs",
    detail: "Budget S$15,000–S$30,000 for funeral, estate admin, and legal fees.",
  },
  {
    label: "Spouse's lost income",
    detail: "If your spouse reduces working hours to care for the family, account for that gap.",
  },
  {
    label: "Existing coverage",
    detail: "Subtract CPF nomination, employer group life, and existing personal policies.",
  },
];

const termVsWhole = [
  {
    type: "Term life",
    best: "Pure protection, typically 20–40 years",
    pros: ["Much cheaper premiums", "High coverage for low cost", "Simple to understand"],
    cons: ["No cash value if policy expires", "Premiums increase if you renew after term ends"],
    verdict: "Best for most people",
    verdictCls: "bg-indigo-50 text-indigo-700 border-indigo-100",
  },
  {
    type: "Whole life",
    best: "Lifelong coverage with savings component",
    pros: ["Never expires", "Cash value builds over time", "Can be used as legacy planning"],
    cons: ["Premiums are 5–15x more expensive", "Returns are lower than most investment alternatives", "Complexity can obscure value"],
    verdict: "Consider for estate planning",
    verdictCls: "bg-slate-50 text-slate-600 border-slate-200",
  },
];

const employerGaps = [
  {
    gap: "Coverage typically ends the day you resign",
    fix: "Your personal policy has no such condition — it travels with you.",
  },
  {
    gap: "Group policies rarely cover critical illness",
    fix: "CI is a separate rider or standalone policy. Do not assume you have it.",
  },
  {
    gap: "Coverage amount is usually 1–3x annual salary",
    fix: "The LIA recommends 9x. There is almost always a gap.",
  },
  {
    gap: "Dependants may not be your employer's priority",
    fix: "Employer policies protect the company's interest in you, not your family's.",
  },
];

const faqs = [
  {
    q: "Does my CPF count as life insurance?",
    a: "Your CPF nomination ensures your CPF savings go to your nominees when you die — it is not life insurance. The amount in your CPF at death depends on what you have saved and withdrawn. Do not confuse a CPF nomination with a life insurance policy. However, your CPF balance does reduce how much additional coverage you need, so include it in your calculation.",
  },
  {
    q: "What is critical illness insurance and do I need it?",
    a: "Critical illness (CI) insurance pays a lump sum if you are diagnosed with a covered condition — typically cancer, heart attack, or stroke (the 'Big 3' account for over 80% of CI claims in Singapore). Life insurance only pays out on death; CI cover pays while you are alive but unable to work. The LIA recommends CI coverage of at least 3.9x your annual income. Given that 1 in 4 Singaporeans will develop cancer in their lifetime, most financial advisors consider CI cover non-negotiable.",
  },
  {
    q: "How does my HDB mortgage affect how much cover I need?",
    a: "If you have an outstanding HDB or bank mortgage, that liability should be covered by your life insurance — your family should not be forced to sell the home if you die. Add your outstanding loan balance to your coverage calculation. Note that HDB loans require HPS (Home Protection Scheme) which covers the outstanding mortgage on death or permanent disability, but HPS is not a substitute for life insurance covering income replacement and other liabilities.",
  },
  {
    q: "Should I get insurance from a bank or an independent advisor?",
    a: "Banks and bancassurance agents typically represent one insurer's products. An independent financial advisor (IFA) can compare across multiple insurers and is required by MAS regulations to recommend the most suitable product, not the most profitable one. For most people, shopping around through an IFA — who is legally required to act in your interest — tends to produce better outcomes than going direct to a single insurer.",
  },
];

export default function LifeInsurancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="pt-24 pb-12 px-6 border-b border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
                <span className="w-1.5 h-1.5 rounded-full inline-block bg-indigo-500" />
                Financial
              </span>
              <span className="text-xs text-slate-400">5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
              How Much Life Insurance Do I Need in Singapore? A Straight-Talking Guide
            </h1>
            <p className="text-slate-500 text-sm">By MatchAdvisor Editorial · Updated April 2026</p>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 py-12 space-y-12">

          {/* Hook */}
          <p className="text-lg text-slate-700 leading-relaxed">
            {"Ask most Singaporeans how much life insurance they have and they'll say 'got lah.' Ask them if it's enough and you'll get a longer pause. According to the Life Insurance Association (LIA) of Singapore, the average Singaporean is covered for less than half of what they actually need. This guide shows you how to calculate the right number — and what to do about it."}
          </p>

          {/* Section 1: Why underinsured */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Most Singaporeans Are Underinsured</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"The LIA's Protection Gap Study consistently finds the same pattern: Singaporeans own policies, but the coverage amounts are too low to actually replace income, clear debts, and fund dependants' futures. The gap isn't about having no insurance — it's about having the wrong amount."}
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <p className="text-sm text-slate-700">
                <strong className="text-indigo-700">The LIA benchmark:</strong>
                {" The LIA recommends life insurance coverage of 9–10x your annual income. The average Singaporean has coverage of roughly 3.5x. If you earn S$72,000 per year, you need roughly S$648,000–S$720,000 in coverage. Most people have S$250,000 or less."}
              </p>
            </div>
          </section>

          {/* Section 2: 10x formula */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">The 10x Formula — A Starting Point</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"The simplest rule of thumb: multiply your annual income by 10. This gives your dependants roughly a decade to adjust — pay off the mortgage, raise the kids, retrain for work, or draw down the sum gradually."}
            </p>
            <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Annual income</span>
                <span>× 10</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>+ Outstanding mortgage</span>
                <span>+ S$XXX,XXX</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>+ Other debts</span>
                <span>+ S$XX,XXX</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>+ Dependant education costs</span>
                <span>+ S$XX,XXX</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{"− CPF savings (OA + SA)"}</span>
                <span>{"− S$XX,XXX"}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{"− Existing life coverage"}</span>
                <span>{"− S$XXX,XXX"}</span>
              </div>
              <div className="border-t border-slate-600 pt-2 flex justify-between font-bold text-white">
                <span>= Coverage gap</span>
                <span className="text-indigo-400">S$XXX,XXX</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              {"This is a starting point, not a final answer. A MAS-licensed financial advisor can run a proper needs analysis that accounts for inflation, investment returns, and your specific family structure."}
            </p>
          </section>

          {/* Section 3: Factors */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Six Factors That Change Your Number</h2>
            <div className="space-y-4">
              {factors.map((f, i) => (
                <div key={f.label} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800">{f.label}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{f.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Term vs whole life */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Term vs Whole Life — Which Should You Choose?</h2>
            <div className="space-y-5">
              {termVsWhole.map((t) => (
                <div key={t.type} className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{t.type}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${t.verdictCls}`}>
                      {t.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">{t.best}</p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-700 mb-2">Pros</p>
                      <ul className="space-y-1">
                        {t.pros.map((p) => (
                          <li key={p} className="flex gap-2 text-slate-600">
                            <span className="text-indigo-500 shrink-0">✓</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 mb-2">Cons</p>
                      <ul className="space-y-1">
                        {t.cons.map((c) => (
                          <li key={c} className="flex gap-2 text-slate-600">
                            <span className="text-red-400 shrink-0">✕</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Employer coverage */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{"Don't Rely on Your Employer's Group Policy"}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {"Group life insurance from your employer is a benefit, not a financial plan. Here's what you're actually relying on — and where it falls short."}
            </p>
            <div className="space-y-3">
              {employerGaps.map((item) => (
                <div key={item.gap} className="flex gap-4 bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <span className="text-amber-500 font-bold text-lg leading-none shrink-0 mt-0.5">!</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.gap}</p>
                    <p className="text-sm text-slate-600 mt-0.5">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: CPF */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">CPF and Life Insurance — How They Interact</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"Your CPF savings are not life insurance — but they do affect your coverage calculation. When you die, your CPF balances are distributed to your nominees. This is separate from, and in addition to, any life insurance payout."}
            </p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 text-sm text-slate-700 space-y-2">
              <p>
                <strong className="text-indigo-700">Home Protection Scheme (HPS):</strong>
                {" If you use CPF OA to service your HDB loan, HPS is compulsory. It covers your outstanding mortgage if you die or become permanently disabled — but it covers only the mortgage, not your family's broader income needs."}
              </p>
              <p>
                <strong className="text-indigo-700">CPF nomination:</strong>
                {" Nominate your beneficiaries in your CPF account to ensure quick distribution without going through probate. Without a nomination, CPF funds are distributed by the Public Trustee's Office, which takes much longer."}
              </p>
            </div>
          </section>

          {/* Section 7: Critical illness */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Critical Illness Cover — The Policy Most People Skip</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"Life insurance pays your family when you die. Critical illness (CI) insurance pays you when you're diagnosed with a serious illness and can no longer work. In Singapore, the three most common CI claims are cancer, heart attack, and stroke — and together they account for over 80% of all CI claims."}
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"The LIA recommends CI coverage of at least 3.9x annual income. Consider: the average cancer treatment in Singapore can cost S$100,000–S$300,000 and may span years. Your MediShield Life and MediSave cover hospitalisation and treatment — they do not replace the income you lose while you cannot work."}
            </p>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5 text-sm text-slate-700">
              <p>
                <strong className="text-red-700">Common mistake:</strong>
                {" Assuming MediShield Life covers everything. MediShield Life covers large medical bills — it does not pay for your mortgage, your rent, or your family's food while you spend 18 months in treatment. That is what CI cover is for."}
              </p>
            </div>
          </section>

          {/* Section 8: Rajan example */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Worked Example: Rajan, 35</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {"Rajan is 35, married with two young kids, and earns S$84,000 per year. He has an HDB mortgage with S$280,000 outstanding and S$90,000 in CPF. He has S$150,000 of group life from his employer. How much personal life insurance does he actually need?"}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Income replacement (S$84k × 10)</span>
                <span className="font-semibold text-slate-900">S$840,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">+ Outstanding mortgage</span>
                <span className="font-semibold text-slate-900">S$280,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">+ Education (2 kids, local university)</span>
                <span className="font-semibold text-slate-900">S$200,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{"− CPF balance"}</span>
                <span className="font-semibold text-red-600">{"(S$90,000)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{"− Employer group life"}</span>
                <span className="font-semibold text-red-600">{"(S$150,000)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">{"− HPS (covers mortgage on death)"}</span>
                <span className="font-semibold text-red-600">{"(S$280,000)"}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-slate-900">
                <span>Coverage gap</span>
                <span className="text-indigo-600">S$800,000</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              {"A 20-year S$800,000 term life policy for a healthy 35-year-old male in Singapore typically costs S$60–S$100 per month. That's less than most people spend on dining out. Additionally, Rajan should add a CI policy of ~S$330,000 (3.9x income). An IFA can find him the best combination of policies across multiple insurers."}
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">{"Know your number. Then close the gap."}</h2>
            <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
              {"Use our free Financial Calculator to estimate how much cover you need, or speak to a MAS-licensed advisor who can compare policies across multiple insurers — at no cost to you."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/financial-calculator"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
              >
                Calculate my coverage →
              </Link>
              <Link
                href="/find-advisor"
                className="inline-flex items-center justify-center gap-2 border border-indigo-200 text-indigo-700 font-semibold px-5 py-3 rounded-xl hover:bg-indigo-100 transition-colors text-sm"
              >
                Find a MAS-licensed advisor →
              </Link>
            </div>
            <p className="text-xs text-slate-400 mt-4">Free service · No cold calls · You choose who to contact</p>
          </section>

        </article>
      </main>
      <Footer />
    </>
  );
}
