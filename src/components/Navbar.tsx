export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-slate-900 font-semibold text-lg tracking-tight">
            MatchAdvisor
          </span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="/how-it-works"
            className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors hidden sm:block"
          >
            How it works
          </a>
          <a
            href="/join"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Join as a Professional
          </a>
        </div>
      </div>
    </nav>
  );
}
