import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "What data we collect",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    items: [
      { label: "Contact details", body: "Your full name, email address, and phone number — provided when you submit a request on our platform." },
      { label: "Preference data", body: "Information about your financial situation, property requirements, or renovation plans, depending on which form you submit. This is used solely to find the right professional for you." },
      { label: "Usage data", body: "Standard web analytics such as pages visited and browser type. We do not use this to personally identify you." },
    ],
  },
  {
    title: "Why we collect it",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    items: [
      { label: "To match you with professionals", body: "Your contact and preference data is used to identify and introduce you to suitable, verified professionals on our platform." },
      { label: "To communicate with you", body: "We may email you with your match results and, occasionally, relevant updates about the platform. You can opt out at any time." },
      { label: "To improve the platform", body: "Aggregated, anonymised data helps us understand how people use MatchAdvisor and make it better." },
    ],
  },
  {
    title: "How we protect your data",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    items: [
      { label: "We never sell your data", body: "Your personal information is never sold, rented, or traded to any third party for marketing purposes — full stop." },
      { label: "Limited sharing", body: "Your details are shared only with the specific verified professional(s) we match you with, and only with your knowledge." },
      { label: "PDPA compliance", body: "We comply with Singapore's Personal Data Protection Act (PDPA). Your data is collected, used, and stored in accordance with all PDPA obligations." },
    ],
  },
  {
    title: "Your rights",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    items: [
      { label: "Access and correction", body: "You may request a copy of the personal data we hold about you, or ask us to correct any inaccurate information." },
      { label: "Withdrawal of consent", body: "You may withdraw your consent for us to use your personal data at any time by contacting us." },
      { label: "Data deletion", body: "You may request deletion of your data by emailing hello@matchadvisor.sg. We will process your request within 30 days." },
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy <span className="text-indigo-600">Policy</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            We are committed to protecting your personal data. This policy explains what we collect, why we collect it, and how we keep it safe — written in plain language, not legalese.
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
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-indigo-900 mb-1">Questions about this policy?</p>
              <p className="text-sm text-indigo-700">
                Contact our data protection team at{" "}
                <a href="mailto:hello@matchadvisor.sg" className="font-semibold underline underline-offset-2">
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
