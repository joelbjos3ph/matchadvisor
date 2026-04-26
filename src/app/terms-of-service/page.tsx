import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "What MatchAdvisor is",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
    items: [
      {
        label: "A matching platform, not an advisor",
        body: "MatchAdvisor connects consumers with professionals. We are not a financial advisor, property agent, or interior designer. We do not provide financial, property, or design advice of any kind.",
      },
      {
        label: "We are not liable for professional advice",
        body: "Any advice, recommendations, or services provided by professionals you meet through MatchAdvisor are entirely the responsibility of those professionals. MatchAdvisor is not liable for any outcomes arising from such advice or services.",
      },
    ],
  },
  {
    title: "Professional requirements",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      {
        label: "Financial advisors — valid MAS licence required",
        body: "All financial advisory professionals on our platform must be licensed by the Monetary Authority of Singapore (MAS). We verify this before listing and reserve the right to remove any professional whose licence lapses.",
      },
      {
        label: "Property agents — CEA registration required",
        body: "All property agents on our platform must hold a valid registration with the Council for Estate Agencies (CEA). We verify this before listing.",
      },
      {
        label: "Interior designers — portfolio vetting required",
        body: "Interior designers are vetted for portfolio quality, project history, and professional conduct. We also verify BCA permits or relevant contractor registrations where applicable.",
      },
    ],
  },
  {
    title: "Consumer requirements",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    items: [
      {
        label: "You must be 18 or older",
        body: "MatchAdvisor is intended for adults only. By submitting a request on our platform, you confirm that you are at least 18 years of age.",
      },
      {
        label: "Accurate information",
        body: "You agree to provide accurate contact and preference information. Misleading information may result in an unsuitable match or removal from the platform.",
      },
    ],
  },
  {
    title: "Platform use",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    items: [
      {
        label: "Free for consumers",
        body: "Using MatchAdvisor to find a professional is free for consumers. We do not charge you to submit a request or receive an introduction.",
      },
      {
        label: "No guarantee of outcome",
        body: "While we strive to make every match a good one, we cannot guarantee that every introduction will result in an engagement. Results depend on individual circumstances and professional availability.",
      },
      {
        label: "We may update these terms",
        body: "We may revise these Terms of Service from time to time. Material changes will be communicated by updating the date above. Continued use of the platform constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    title: "Governing law",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    items: [
      {
        label: "Singapore law applies",
        body: "These Terms of Service are governed by and construed in accordance with the laws of the Republic of Singapore. Any disputes arising from use of MatchAdvisor shall be subject to the exclusive jurisdiction of the courts of Singapore.",
      },
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]"
        />
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            Legal · Last updated April 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight text-balance mb-5">
            Terms of <span className="text-indigo-600">Service</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            By using MatchAdvisor, you agree to these terms. We have written them to be as clear as possible — no unnecessary jargon. Please read them before submitting a request.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto space-y-16">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl">{section.icon}</div>
                <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-sm font-semibold text-slate-900 mb-2">{item.label}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact callout */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-slate-900 mb-1">Questions about these terms?</p>
              <p className="text-sm text-slate-600">
                Email us at{" "}
                <a href="mailto:hello@matchadvisor.sg" className="text-indigo-600 font-semibold hover:underline underline-offset-2">
                  hello@matchadvisor.sg
                </a>
                . We will respond within 1 business day.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-sm shadow-indigo-200"
            >
              Contact us
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
