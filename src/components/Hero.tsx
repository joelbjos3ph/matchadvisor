export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Background decoration */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]"
      />

      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
          Trusted by thousands of Singaporeans
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight text-balance mb-6">
          Find Trusted Professionals
          <br />
          <span className="text-indigo-600">in Singapore</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Verified financial advisors, property agents, and interior designers
          — matched to your exact needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#categories"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-sm shadow-indigo-200"
          >
            Find a Professional
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 transition-colors"
          >
            How it works
          </a>
        </div>
      </div>
    </section>
  );
}
