const categories = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
    color: "indigo",
    label: "Financial Advisors",
    title: "Find a Financial Advisor",
    description:
      "Get personalised guidance on investments, insurance, retirement, and wealth planning from MAS-licensed advisors who put your goals first.",
    cta: "Find an Advisor",
    href: "/find-advisor",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    color: "emerald",
    label: "Property Agents",
    title: "Find a Property Agent",
    description:
      "Whether buying, selling, or renting HDB or private property, work with CEA-registered agents who know every neighbourhood in Singapore.",
    cta: "Find an Agent",
    href: "/find-agent",
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    color: "amber",
    label: "Interior Designers",
    title: "Find an Interior Designer",
    description:
      "Transform your new BTO, condo, or landed property with talented designers who understand Singapore living spaces and your personal style.",
    cta: "Find a Designer",
    href: "/find-designer",
  },
];

const colorMap: Record<
  string,
  { bg: string; icon: string; badge: string; badgeText: string; btn: string; ring: string }
> = {
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    badge: "bg-indigo-100",
    badgeText: "text-indigo-700",
    btn: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100",
    ring: "focus-visible:ring-indigo-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    badge: "bg-emerald-100",
    badgeText: "text-emerald-700",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100",
    ring: "focus-visible:ring-emerald-500",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    badge: "bg-amber-100",
    badgeText: "text-amber-700",
    btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
    ring: "focus-visible:ring-amber-500",
  },
};

export default function Categories() {
  return (
    <section id="categories" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What are you looking for?
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Browse by category and connect with vetted experts who match your
            specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const c = colorMap[cat.color];
            return (
              <div
                key={cat.color}
                className="group relative bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-5 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className={`${c.bg} ${c.icon} p-3 rounded-xl`}>
                    {cat.icon}
                  </div>
                  <span
                    className={`${c.badge} ${c.badgeText} text-xs font-semibold px-2.5 py-1 rounded-full`}
                  >
                    {cat.label}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {cat.description}
                  </p>
                </div>

                <a
                  href={cat.href}
                  className={`inline-flex items-center justify-center gap-2 ${c.btn} text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm`}
                >
                  {cat.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
