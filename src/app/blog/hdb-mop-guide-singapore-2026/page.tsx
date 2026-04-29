import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HDB MOP Guide Singapore 2026 — When Can You Sell and What Comes Next",
  description:
    "Everything you need to know about HDB Minimum Occupation Period (MOP): how to check it, what you can and cannot do during MOP, and your three options once it ends.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/blog/hdb-mop-guide-singapore-2026",
  },
  openGraph: {
    title: "HDB MOP Guide Singapore 2026 — When Can You Sell and What Comes Next",
    description:
      "MOP is up. Now what? A plain-English guide to your options: sell, rent, upgrade — with a real numbers walkthrough.",
    url: "https://matchadvisor.vercel.app/blog/hdb-mop-guide-singapore-2026",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HDB MOP Guide Singapore 2026 — When Can You Sell and What Comes Next",
  description:
    "Everything you need to know about HDB Minimum Occupation Period (MOP): how to check it, what you can and cannot do during MOP, and your three options once it ends.",
  author: { "@type": "Organization", name: "MatchAdvisor Editorial" },
  publisher: { "@type": "Organization", name: "MatchAdvisor" },
  datePublished: "2026-04-29",
  url: "https://matchadvisor.vercel.app/blog/hdb-mop-guide-singapore-2026",
};

const canDo = [
  "Rent out individual rooms (you must continue living there)",
  "Apply for a HDB loan to finance a resale flat after MOP",
  "Take in boarders with HDB approval",
  "Run a home-based business (within HDB guidelines)",
];

const cannotDo = [
  "Sell your flat on the open market",
  "Rent out the entire flat",
  "Own a private residential property in Singapore",
  "Buy a second HDB flat",
];

const options = [
  {
    num: "01",
    title: "Sell and downgrade",
    who: "Empty nesters, retirees, anyone who wants to unlock equity",
    pros: ["Cash out capital gain", "Reduce mortgage burden", "Free up cash for retirement"],
    cons: ["Smaller living space", "May still need to pay ABSD on next purchase if timing overlaps"],
  },
  {
    num: "02",
    title: "Sell and upgrade to private",
    who: "Dual-income couples, growing families, those wanting investment upside",
    pros: ["Potential for greater capital appreciation", "Fewer restrictions on rental", "Status upgrade"],
    cons: [
      "ABSD applies if you buy private before selling HDB (currently 20% for second property)",
      "Higher monthly outgoings",
      "Market timing risk",
    ],
  },
  {
    num: "03",
    title: "Stay and rent rooms",
    who: "Those who love their location and want supplemental income",
    pros: ["Rental income with zero transaction costs", "Continue enjoying HDB subsidies", "No stamp duty, no agent fees"],
    cons: [
      "Sharing your home",
      "No capital gain realised",
      "Must continue to reside in the flat",
    ],
  },
];

const upgradeOptions = [
  { flat: "3-room (60–65 sqm)", equity: "S$80k–S$180k", upgrade: "4-room resale, small condo in OCR" },
  { flat: "4-room (85–95 sqm)", equity: "S$120k–S$280k", upgrade: "5-room resale, condo in OCR/RCR" },
  { flat: "5-room / EA (110–145 sqm)", equity: "S$200k–S$400k+", upgrade: "Executive condo, condo in CCR" },
];

const faqs = [
  {
    q: "Can I rent out my whole HDB flat before MOP?",
    a: "No. You cannot rent out the entire flat during the MOP period. You can rent out individual rooms — but you must continue to physically reside in the flat. Subletting the whole flat before MOP is a serious infringement and HDB can compulsorily acquire your flat.",
  },
  {
    q: "What happens if I sell before MOP?",
    a: "You cannot sell your HDB flat on the open market before completing MOP. The only exception is if HDB approves a disposal under exceptional hardship circumstances — this is rare and discretionary. Attempting to sell before MOP is illegal.",
  },
  {
    q: "Does MOP reset if I do major renovations?",
    a: "No. Renovations, even major structural ones, do not reset or extend your MOP. The MOP clock runs from the date you collect your keys (for BTO/SBF) or the date of completion (for resale flats).",
  },
  {
    q: "Can I buy a private property before selling my HDB?",
    a: "Yes, but you will pay ABSD of 20% on the private property purchase price (for Singapore citizens buying a second property). You must sell your HDB within 6 months of the private property's TOP or the date of issue of the Certificate of Statutory Completion (CSC), whichever is earlier. Failure to do so means you forfeit the ABSD remission and owe the full amount plus interest.",
  },
];

export default function HdbMopGuidePage() {
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
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full inline-block bg-emerald-500" />
                Property
              </span>
              <span className="text-xs text-slate-400">5 min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
              HDB MOP Guide Singapore 2026 — When Can You Sell and What Comes Next
            </h1>
            <p className="text-slate-500 text-sm">By MatchAdvisor Editorial · Updated April 2026</p>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-6 py-12 space-y-12">

          {/* Hook */}
          <p className="text-lg text-slate-700 leading-relaxed">
            {"Five years ago you signed on the dotted line. Now your MOP is up, your neighbour just sold for S$180,000 more than they paid, and everyone — your parents, your colleagues, your uncle at CNY — has an opinion on what you should do next. This guide cuts through the noise."}
          </p>

          {/* Section 1: What is MOP */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What is the HDB MOP?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"The Minimum Occupation Period (MOP) is the compulsory period during which you must physically occupy your HDB flat before you're allowed to sell it on the open market or rent out the entire unit. It's one of HDB's core mechanisms to keep flats as homes rather than investment vehicles."}
            </p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <h3 className="font-bold text-slate-800 mb-3">MOP by flat type</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="font-semibold text-emerald-700 w-40 shrink-0">BTO / SBF flat</span>
                  <span>5 years from date of key collection</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-emerald-700 w-40 shrink-0">Resale HDB flat</span>
                  <span>5 years from date of resale completion</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-emerald-700 w-40 shrink-0">Design, Build &amp; Sell Scheme (DBSS)</span>
                  <span>5 years from date of key collection</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-emerald-700 w-40 shrink-0">Prime Location Public Housing (PLH)</span>
                  <span>10 years from date of key collection</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: How to check */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Check Your MOP Date</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {"Your MOP completion date is listed on your HDB flat's records. The quickest way to check:"}
            </p>
            <ol className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>{"Log in to the HDB MyFlat Portal at my.hdb.gov.sg using your Singpass"}</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Go to <strong>My Flat</strong> → <strong>Purchased Flat</strong> → <strong>Flat Details</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Your MOP completion date is listed under flat eligibility information</span>
              </li>
            </ol>
            <p className="text-slate-500 text-sm mt-4">
              {"Alternatively, call the HDB Sales/Resale enquiry line at 1800-866-3066 (Mon–Fri, 8am–5pm)."}
            </p>
          </section>

          {/* Section 3: Can / Cannot */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What You Can and Cannot Do During MOP</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-5">
                <h3 className="font-bold text-green-800 mb-3">You CAN</h3>
                <ul className="space-y-2">
                  {canDo.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-green-600 font-bold shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                <h3 className="font-bold text-red-800 mb-3">You CANNOT</h3>
                <ul className="space-y-2">
                  {cannotDo.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: 3 options */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your 3 Options After MOP</h2>
            <div className="space-y-6">
              {options.map((opt) => (
                <div key={opt.num} className="border border-slate-200 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-2xl font-black text-emerald-200 leading-none">{opt.num}</span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{opt.title}</h3>
                      <p className="text-sm text-slate-500">Best for: {opt.who}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-700 mb-2">Pros</p>
                      <ul className="space-y-1">
                        {opt.pros.map((p) => (
                          <li key={p} className="flex gap-2 text-slate-600">
                            <span className="text-emerald-500 shrink-0">✓</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 mb-2">Cons</p>
                      <ul className="space-y-1">
                        {opt.cons.map((c) => (
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

          {/* Section 5: Net proceeds */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Calculate Your Net Sale Proceeds</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {"Before you get excited about the headline price your neighbour achieved, run this quick calculation to find out what you'll actually walk away with."}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 font-mono text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Sale price</span>
                <span className="text-slate-900 font-bold">S$XXX,XXX</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>− Outstanding HDB / bank loan</span>
                <span>(S$XXX,XXX)</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>{"− CPF refund (OA used + accrued interest)"}</span>
                <span>(S$XXX,XXX)</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>− Agent commission (~1–2%)</span>
                <span>(S$X,XXX)</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>− Legal fees</span>
                <span>(~S$2,500)</span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-slate-900">
                <span>= Cash in hand</span>
                <span>S$XX,XXX</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              {"Note: CPF refund goes back into your CPF Ordinary Account, not your bank account. It can be used for your next property purchase, but you cannot withdraw it as cash unless you're above 55."}
            </p>
          </section>

          {/* Section 6: Real example */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Real Example: 4-Room BTO in Punggol</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Marcus and Priya bought their 4-room BTO in Punggol in 2021 for S$380,000. Their MOP ended in early 2026 and they want to sell.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Resale valuation</span>
                <span className="font-semibold text-slate-900">S$560,000</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>{"− Outstanding HDB loan (30-yr, 2.6%)"}</span>
                <span>(S$188,000)</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>{"− CPF OA used + accrued interest"}</span>
                <span>(S$142,000)</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>{"− Agent commission (1%)"}</span>
                <span>(S$5,600)</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>− Legal fees</span>
                <span>(S$2,500)</span>
              </div>
              <div className="border-t border-emerald-200 pt-3 flex justify-between font-bold text-slate-900">
                <span>Cash in hand</span>
                <span className="text-emerald-700">S$221,900</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">CPF refund (re-usable for next property)</span>
                <span className="font-semibold text-slate-900">S$142,000</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              {"Figures are illustrative. Actual CPF accrued interest depends on your drawdown history. Use HDB's My Flat portal for your exact numbers."}
            </p>
          </section>

          {/* Section 7: Upgrade by flat type */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Upgrade Options by Flat Type</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {"Where you can realistically upgrade to depends on how much equity you've built. Here's a rough guide — your actual position depends on your specific flat, town, and loan balance."}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-slate-200">Flat type</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-slate-200">Typical equity range</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-slate-200">Realistic upgrade options</th>
                  </tr>
                </thead>
                <tbody>
                  {upgradeOptions.map((row) => (
                    <tr key={row.flat} className="border-b border-slate-100">
                      <td className="px-4 py-3 border border-slate-200 text-slate-800">{row.flat}</td>
                      <td className="px-4 py-3 border border-slate-200 text-emerald-700 font-semibold">{row.equity}</td>
                      <td className="px-4 py-3 border border-slate-200 text-slate-600">{row.upgrade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              {"OCR = Outside Central Region. RCR = Rest of Central Region. CCR = Core Central Region. EC eligibility requires household income ≤ S$16,000 (as of 2026)."}
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
          <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Ready to run the numbers?</h2>
            <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
              {"Use our free Property Calculator to estimate your stamp duties and net proceeds, or find a CEA-registered agent to guide you through the sale."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/property-calculator"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-emerald-700 transition-colors text-sm"
              >
                Calculate stamp duties →
              </Link>
              <Link
                href="/find-agent"
                className="inline-flex items-center justify-center gap-2 border border-emerald-200 text-emerald-700 font-semibold px-5 py-3 rounded-xl hover:bg-emerald-100 transition-colors text-sm"
              >
                Find a CEA-registered agent →
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
