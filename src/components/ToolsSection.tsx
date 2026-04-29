const tools = [
  {
    href: "/financial-calculator",
    badge: "Financial",
    badgeBg: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-indigo-100 text-indigo-600",
    btnCls: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Financial Needs Calculator",
    description:
      "Answer 3 quick sets of questions to get a personalised coverage score, see your insurance and retirement gaps, and receive specific recommendations.",
    cta: "Check my coverage",
    stats: [
      { label: "Coverage score", value: "out of 100" },
      { label: "Insurance gap", value: "estimated" },
      { label: "Retirement gap", value: "calculated" },
    ],
  },
  {
    href: "/property-calculator",
    badge: "Property",
    badgeBg: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-100 text-emerald-600",
    btnCls: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"
        />
      </svg>
    ),
    title: "HDB Seller Calculator",
    description:
      "Enter your flat details to instantly check MOP eligibility, estimate net proceeds after CPF refund and fees, and explore your upgrade options.",
    cta: "Calculate my proceeds",
    stats: [
      { label: "MOP status", value: "instant" },
      { label: "Net proceeds", value: "after CPF & fees" },
      { label: "Upgrade paths", value: "personalised" },
    ],
  },
  {
    href: "/renovation-calculator",
    badge: "Interior Design",
    badgeBg: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-100 text-amber-600",
    btnCls: "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    title: "Renovation Cost Estimator",
    description:
      "Estimate your renovation budget for any Singapore home — HDB BTO, resale, condo or landed. Based on 2026 market rates, no sign-up needed.",
    cta: "Estimate my budget →",
    stats: [
      { label: "Cost estimate", value: "instant" },
      { label: "Market accurate", value: "2026 rates" },
      { label: "Fully free", value: "no sign-up" },
    ],
  },
];

export default function ToolsSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
            100% free, no sign-up required
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Free tools for Singaporeans
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Know your numbers before you speak to anyone. Our calculators give you an honest, unbiased starting point.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.href}
              className="group relative bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-5 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className={`${tool.iconBg} p-3 rounded-xl`}>{tool.icon}</div>
                <span className={`${tool.badgeBg} text-xs font-semibold px-2.5 py-1 rounded-full`}>
                  {tool.badge}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{tool.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm mb-5">{tool.description}</p>
                <div className="grid grid-cols-3 gap-3">
                  {tool.stats.map((s) => (
                    <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
                      <p className="text-xs font-semibold text-slate-900">{s.value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={tool.href}
                className={`inline-flex items-center justify-center gap-2 ${tool.btnCls} text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm`}
              >
                {tool.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
