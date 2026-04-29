import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HDB Renovation Cost Guide Singapore 2026 — What You'll Actually Pay | MatchAdvisor",
  description:
    "Planning an HDB renovation in Singapore? Here's what a 3-room, 4-room and 5-room flat renovation actually costs in 2026 — with real breakdowns, honest tips, and red flags to avoid.",
  alternates: {
    canonical:
      "https://matchadvisor.vercel.app/blog/hdb-renovation-cost-guide-singapore-2026",
  },
  openGraph: {
    title: "HDB Renovation Cost Guide Singapore 2026 — What You'll Actually Pay",
    description:
      "What a 3-room, 4-room and 5-room HDB renovation actually costs in 2026. Real breakdowns, honest tips, red flags to avoid.",
    url: "https://matchadvisor.vercel.app/blog/hdb-renovation-cost-guide-singapore-2026",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "HDB Renovation Cost Guide Singapore 2026 — What You'll Actually Pay",
  description:
    "Planning an HDB renovation in Singapore? Here's what a 3-room, 4-room and 5-room flat renovation actually costs in 2026 — with real breakdowns, honest tips, and red flags to avoid.",
  url: "https://matchadvisor.vercel.app/blog/hdb-renovation-cost-guide-singapore-2026",
  datePublished: "2026-04-29",
  dateModified: "2026-04-29",
  author: { "@type": "Organization", name: "MatchAdvisor Editorial" },
  publisher: { "@type": "Organization", name: "MatchAdvisor" },
};

const costs = [
  { type: "3-Room BTO", range: "S$25,000–$45,000", note: "Basic to modern finish" },
  { type: "4-Room BTO", range: "S$40,000–$62,000", note: "Most common renovation budget" },
  { type: "5-Room BTO", range: "S$45,000–$70,000", note: "Full scope with carpentry" },
  { type: "HDB Resale (any size)", range: "+20–40% vs BTO", note: "Hacking, rewiring, waterproofing" },
  { type: "Condo (New)", range: "S$40,000–$80,000", note: "Varies by unit size and style" },
  { type: "Condo (Resale)", range: "S$80,000–$105,000", note: "Older units need more rework" },
];

const redFlags = [
  {
    flag: "Vague line items",
    detail:
      '"Renovation works: S$45,000" tells you nothing. If they can\'t quote line by line, they won\'t manage your project line by line either.',
  },
  {
    flag: "No HDB registration number",
    detail:
      "Any contractor doing HDB works must be a registered HDB contractor. Check the HDB directory before you sign a single thing.",
  },
  {
    flag: "Pressure to sign fast",
    detail:
      '"This price is only valid for 48 hours" is a sales tactic, not a business reality. Good firms don\'t need to rush you.',
  },
  {
    flag: "Quote significantly below market",
    detail:
      "If everyone else is at S$55,000 and one firm says S$35,000, ask very hard questions. Corners will be cut. Materials will be swapped.",
  },
  {
    flag: "No formal contract",
    detail:
      "Never proceed without a signed contract detailing scope, materials, timeline, and payment terms. Never.",
  },
];

const tips = [
  {
    tip: "Bundle your wet works",
    detail:
      "One contractor for both kitchen and bathroom tiling and waterproofing saves 8–12% versus separate trades.",
  },
  {
    tip: "Overlay instead of hack for flooring",
    detail:
      "Vinyl planks laid over existing tiles saves S$3,000–$5,000. Only works if the base tiles are level, intact, and free of lippage.",
  },
  {
    tip: "Choose laminate over solid timber for carpentry",
    detail:
      "The look is nearly identical in most homes. The price difference is very real.",
  },
  {
    tip: "Get at least 3 quotes",
    detail:
      "Carpentry prices can vary 30% between ID firms for identical specifications. The market is your friend — use it.",
  },
  {
    tip: "Start on weekdays",
    detail:
      "Many contractors charge weekend surcharges for workers. A weekday start saves 3–5% on labour costs.",
  },
];

const faqs = [
  {
    q: "Is S$30,000 enough for an HDB renovation?",
    a: "For a 3-room BTO with a basic scope — kitchen, one bathroom, flooring, painting, no carpentry — S$30,000 is achievable. For a 4-room or 5-room, or anything with full built-in carpentry, it is tight. Most 4-room BTO renovations in 2026 start from S$40,000 for a proper job.",
  },
  {
    q: "How long does an HDB renovation take?",
    a: "A typical BTO renovation takes 8–12 weeks from start to handover. Resale flats take 10–16 weeks due to hacking and concealed works. Add 2–4 weeks if you have extensive carpentry or full kitchen and bathroom renovation.",
  },
  {
    q: "Do I need HDB approval for renovation?",
    a: "Yes, for certain works. Hacking walls, bathroom and kitchen alterations, and anything affecting the structure or building services require HDB approval. Your registered contractor should handle this — make sure it is included in the contract and project timeline.",
  },
  {
    q: "Should I hire an ID firm or a direct contractor?",
    a: "Hire an ID firm if you want a cohesive design, someone to manage the whole project, and a single point of accountability when things go wrong. Hire a direct contractor if you are confident managing trades yourself and want to save 15–20%. For first-time renovators, most find the ID fee worth every dollar.",
  },
];

export default function HDBRenovationCostGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-slate-50 border-b border-slate-100 pt-24 pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
              <Link href="/blog" className="hover:text-slate-800 transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span>Interior Design</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              Interior Design
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              HDB Renovation Cost Guide Singapore 2026 — What You&apos;ll Actually Pay
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">
              Planning an HDB renovation? Here&apos;s what it really costs — with honest breakdowns,
              2026 market rates, and red flags to avoid before you sign anything.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span>MatchAdvisor Editorial</span>
              <span>·</span>
              <span>29 Apr 2026</span>
              <span>·</span>
              <span>6 min read</span>
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 py-12">

          {/* Hook */}
          <p className="text-lg text-slate-800 leading-relaxed mb-5 font-medium">
            {"You just collected your BTO keys. The excitement lasts about 48 hours — then the renovation quotes start coming in and suddenly S$60,000 feels very real. One ID quotes you S$45,000. Another says S$78,000. Same flat, same scope. Who do you trust?"}
          </p>
          <p className="text-slate-600 leading-relaxed mb-10">
            {"This guide cuts through the noise. Here's what a renovation actually costs in Singapore in 2026 — and how to make sure you don't get stung."}
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            Why renovation costs vary so much
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            No two quotes are the same, even for identical flats. Here is why.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong className="text-slate-800">Flat size.</strong>{" "}
            {"A 3-room flat is roughly 65 sqm. A 5-room is 110 sqm. More space means more flooring, more carpentry, more of everything."}
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong className="text-slate-800">BTO vs resale.</strong>{" "}
            {"A new BTO is a blank canvas. A resale flat means hacking existing tiles, rewiring old electrical systems, and waterproofing aged bathrooms. That easily adds 20–40% to the bill."}
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong className="text-slate-800">Materials.</strong>{" "}
            {"Laminate cabinets vs solid timber. Vinyl planks vs homogeneous tiles. Quartz vs granite countertops. Your finish level can swing the total by S$15,000–$20,000 on the same floor plan."}
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong className="text-slate-800">ID firm vs direct contractor.</strong>{" "}
            {"An interior designer manages the whole project, handles permits, and takes accountability. You pay 15–20% more for that. A direct contractor is cheaper — if you're prepared to project-manage it yourself."}
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong className="text-slate-800">Scope of works.</strong>{" "}
            {"Full renovation with carpentry everywhere, or just a kitchen and two bathrooms? Every line item adds up. Knowing your scope before you get quotes is non-negotiable."}
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
            What does an HDB renovation actually cost in 2026?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            {"These are realistic ranges based on 2026 Singapore market rates, assuming a moderate Modern or Minimalist finish with a typical scope — kitchen, bathrooms, flooring, and carpentry."}
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-3">
            <p className="text-sm font-bold text-amber-800 mb-4">
              2026 renovation cost ranges — Singapore
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {costs.map((c) => (
                <div
                  key={c.type}
                  className="bg-white rounded-xl p-4 border border-amber-100"
                >
                  <p className="text-xs text-slate-500 mb-1">{c.type}</p>
                  <p className="text-base font-bold text-amber-700">{c.range}</p>
                  <p className="text-xs text-slate-400 mt-1">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-10">
            Landed properties: S$120,000–$300,000+. All figures assume 2026 market rates. Actual costs depend on scope, materials, and contractor.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            Where your money actually goes
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Most people are shocked when they see how much goes to one line item.
          </p>
          <div className="space-y-5 mb-6">
            {[
              {
                label: "Carpentry & built-ins (25–40% of budget)",
                body: "This is the big one. Kitchen cabinets, wardrobes, TV console, shoe cabinet — all custom-made to your flat's dimensions. Prices vary wildly between ID firms. Always get itemised, spec-by-spec quotes before comparing.",
              },
              {
                label: "Wet works — kitchen and bathrooms (15–25%)",
                body: "Hacking, waterproofing, tiling, plumbing. For resale flats, budget significantly more if pipes need replacing. Wet works is also where most hidden defects surface.",
              },
              {
                label: "Flooring (8–15%)",
                body: "Vinyl plank flooring runs S$3–$6 per sqft installed. Homogeneous tiles S$4–$9. Solid timber parquet can hit S$10+ per sqft. The whole-home difference between vinyl and parquet can be S$8,000 or more.",
              },
              {
                label: "Electrical works (5–10%)",
                body: "New power points, rewiring, distribution board upgrade. Essential for resale flats — never cut this. Faulty concealed wiring is a safety risk and an insurance liability.",
              },
              {
                label: "Painting, feature walls, false ceilings (5–15%)",
                body: "The finishing touches that define the look. Often where you can save without anyone noticing — and equally where a little extra spend makes a big visual difference.",
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 shrink-0" />
                <div>
                  <p className="text-slate-900 font-semibold mb-1">{item.label}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
            The hidden costs nobody puts in the quote
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Your renovation quote covers the renovation. It does not cover everything.
          </p>
          <div className="space-y-3 mb-8">
            {[
              {
                title: "Contingency buffer: 10–20%",
                body: "For resale flats especially, unexpected issues surface once hacking starts — old pipes, concealed wiring faults, subsurface damage. Budget for it before you need it. Kiasu is the right instinct here.",
              },
              {
                title: "Furniture and appliances: S$10,000–$30,000",
                body: "Your ID does not supply your fridge, washing machine, sofa, or dining table. New homeowners consistently underestimate this. Build it into your total budget, not an afterthought.",
              },
              {
                title: "Temporary accommodation",
                body: "Renovating a resale flat while waiting for possession? Add S$2,000–$5,000+ for 2–3 months of short-term rental. Many couples crash at parents' place — if you can, it's worth it.",
              },
              {
                title: "HDB administrative fees",
                body: "Certain works require HDB approval and come with fees. Your registered contractor handles this — but confirm it is included in the contract and accounted for in the project timeline.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5"
              >
                <p className="text-slate-900 font-semibold mb-1.5">{item.title}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            How to read a renovation quote
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            A good quote is detailed. A bad quote is vague. Here is what to look for.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              {
                point: "Line items must be specific.",
                detail:
                  '"Carpentry works" with no breakdown is a red flag. You want: "Kitchen cabinet (bottom), laminate finish, Blum hinges — S$X,XXX." If it isn\'t specific, you can\'t compare it or hold anyone to it.',
              },
              {
                point: "Materials must be named.",
                detail:
                  "Which brand of tiles? What thickness laminate? Which system furniture series? If the quote doesn't specify, the contractor can substitute cheaper materials and you have zero recourse.",
              },
              {
                point: "Check the payment schedule.",
                detail:
                  "Standard: 10–20% on signing, 20–30% on commencement, progress payments at milestones, 5–10% withheld until defects are rectified. Anyone asking for 50%+ upfront is a risk.",
              },
              {
                point: "Insist on a timeline with milestones.",
                detail:
                  "No clear start and completion dates in the contract means no legal basis to chase delays. For HDB BTOs, your rental overlap window is tight — enforce this.",
              },
            ].map((item) => (
              <li key={item.point} className="flex gap-3">
                <span className="text-amber-500 font-bold shrink-0 mt-0.5">→</span>
                <p className="text-slate-600 leading-relaxed text-sm">
                  <strong className="text-slate-900">{item.point}</strong>{" "}{item.detail}
                </p>
              </li>
            ))}
          </ul>

          {/* Section 6 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            Red flags when hiring an ID
          </h2>
          <p className="text-slate-600 leading-relaxed mb-5">
            Walk away if you see any of these.
          </p>
          <div className="space-y-3 mb-8">
            {redFlags.map((item) => (
              <div
                key={item.flag}
                className="flex gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
              >
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{item.flag}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 7 */}
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
            5 ways to keep costs down without sacrificing quality
          </h2>
          <ol className="space-y-5 mb-8">
            {tips.map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">{item.tip}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mt-1">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* FAQ */}
          <section className="mt-12 border-t border-slate-100 pt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                >
                  <h3 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="mt-12 bg-amber-500 rounded-2xl p-8">
            <p className="text-white font-bold text-xl mb-2">
              Not sure where to start?
            </p>
            <p className="text-amber-100 text-sm leading-relaxed mb-6">
              {"Try our free Renovation Cost Estimator — no sign-up needed. Then browse verified interior designers and reach out on your own terms. No cold calls, no pressure."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/renovation-calculator"
                className="inline-flex items-center justify-center bg-white text-amber-600 hover:bg-amber-50 font-bold px-5 py-3 rounded-xl transition-colors text-sm"
              >
                Try the Renovation Estimator →
              </Link>
              <Link
                href="/find-designer"
                className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm border border-amber-400"
              >
                Browse verified interior designers
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
