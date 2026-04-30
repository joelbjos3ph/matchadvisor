import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-indigo-600 pt-32 pb-20 px-6 text-center">
        <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-4">
          About MatchAdvisor
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
          Finding the right professional
          <br />
          <span className="text-indigo-200">shouldn&apos;t be a guessing game</span>
        </h1>
        <p className="text-indigo-100 text-lg max-w-2xl mx-auto leading-relaxed">
          MatchAdvisor was built for Singaporeans who need a financial advisor, property agent, or interior designer — and want to find one they can actually trust.
        </p>
      </section>

      {/* 3 mission cards */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What we stand for</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Three principles guide every decision we make on this platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl mb-5 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                To make it simple and safe for every Singaporean to find a trustworthy, verified professional — without relying on who you happen to know.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl mb-5 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">How We Work</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                You tell us what you need. We match you with pre-vetted professionals who hold the right licences and have a clean track record. You receive an introduction within 24 hours.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl mb-5 flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Why Trust Us</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Every professional is verified before listing. We never cold-call you. We never sell your data. And using MatchAdvisor as a consumer is completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Our story</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Honest about where we are, clear about where we are going.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-4xl font-bold text-indigo-100 mb-4">01</p>
              <h3 className="text-lg font-bold text-slate-900 mb-3">The problem</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Most Singaporeans find professionals through word-of-mouth. That means your options depend entirely on your network. Those without connections — or new to Singapore — have no reliable way to find vetted advisors.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-4xl font-bold text-indigo-100 mb-4">02</p>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our approach</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We check MAS licences for financial advisors, CEA registration for property agents, and portfolio quality for interior designers — before anyone is listed. We accept only a fraction of applicants.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <p className="text-4xl font-bold text-indigo-100 mb-4">03</p>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Where we are now</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We are a new platform and we are honest about that. We are building carefully from scratch — a curated network that puts consumers in control. If you meet our standards, we want you here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category links */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Three categories, one platform</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              We cover the three types of professionals Singaporeans most often need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a href="/find-advisor" className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">MAS-licensed</span>
              <h3 className="text-lg font-bold text-indigo-800 mb-2">Financial Advisors</h3>
              <p className="text-indigo-700 text-sm leading-relaxed mb-4">Insurance, investments, retirement planning, and general financial advice.</p>
              <p className="text-indigo-600 text-sm font-semibold">Get matched &rarr;</p>
            </a>

            <a href="/find-agent" className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">CEA-registered</span>
              <h3 className="text-lg font-bold text-emerald-800 mb-2">Property Agents</h3>
              <p className="text-emerald-700 text-sm leading-relaxed mb-4">Buying, selling, and renting HDB, condo, and landed properties.</p>
              <p className="text-emerald-600 text-sm font-semibold">Get matched &rarr;</p>
            </a>

            <a href="/find-designer" className="bg-amber-50 border border-amber-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">Vetted portfolios</span>
              <h3 className="text-lg font-bold text-amber-800 mb-2">Interior Designers</h3>
              <p className="text-amber-700 text-sm leading-relaxed mb-4">BTO, resale HDB, condo, and landed renovation projects.</p>
              <p className="text-amber-600 text-sm font-semibold">Get matched &rarr;</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions or feedback?</h2>
          <p className="text-slate-500 mb-8">
            We are a small team and we read every message. Email us at{" "}
            <a href="mailto:matchadvisorsg@gmail.com" className="text-indigo-600 hover:underline font-medium">
              matchadvisorsg@gmail.com
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contact" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors">
              Get in touch
            </a>
            <a href="/join" className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 transition-colors">
              Join as a Professional
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
