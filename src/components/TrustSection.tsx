const trustPoints = [
  {
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
    title: "All professionals are verified",
    description:
      "Every advisor, agent, and designer is screened for licensing, credentials, and a clean track record before joining MatchAdvisor.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636M15 9h.008v.008H15V9zm-6 3h.008v.008H9V12zm3 3h.008v.008H12v-.008z"
        />
      </svg>
    ),
    title: "No cold calls — you reach out first",
    description:
      "Your contact details are never shared without your consent. Browse profiles and initiate contact on your own terms, with zero pressure.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Free for consumers",
    description:
      "Using MatchAdvisor to find and connect with professionals costs you nothing. Our platform is funded by the professionals, not consumers.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 px-6 bg-slate-50" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Singaporeans trust MatchAdvisor
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            We built MatchAdvisor to make finding a reliable professional simple,
            safe, and stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((point, i) => (
            <div key={i} className="flex flex-col items-start gap-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                {point.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Launching soon banner */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-800 mb-1">MatchAdvisor is live in Singapore.</p>
              <p className="text-sm text-indigo-700">Join our growing network of verified professionals and get matched with consumers who are ready to act.</p>
            </div>
            <a
              href="/join"
              className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Join as a Professional
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
