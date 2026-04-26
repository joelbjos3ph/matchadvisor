export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                MatchAdvisor
              </span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Singapore&apos;s trusted platform for finding verified financial
              advisors, property agents, and interior designers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">For Consumers</span>
              <a href="/find-advisor" className="hover:text-white transition-colors">Find a Financial Advisor</a>
              <a href="/find-agent" className="hover:text-white transition-colors">Find a Property Agent</a>
              <a href="/find-designer" className="hover:text-white transition-colors">Find an Interior Designer</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Company</span>
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/join" className="hover:text-white transition-colors">Join as a Professional</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Legal</span>
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; 2026 MatchAdvisor. All rights reserved.</span>
          <span>Made with care in Singapore 🇸🇬</span>
        </div>
      </div>
    </footer>
  );
}
