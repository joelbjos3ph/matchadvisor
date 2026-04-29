import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "hdb-renovation-cost-guide-singapore-2026",
    category: "Interior Design",
    badgeCls: "bg-amber-50 border border-amber-100 text-amber-700",
    dotCls: "bg-amber-500",
    ctaCls: "text-amber-700 group-hover:text-amber-800",
    title: "HDB Renovation Cost Guide Singapore 2026 — What You'll Actually Pay",
    excerpt:
      "You just collected your BTO keys. The excitement lasts about 48 hours — then the renovation quotes start coming in and suddenly S$60,000 feels very real. One ID quotes you S$45,000. Another says S$78,000.",
    readTime: "6 min read",
  },
  {
    slug: "hdb-mop-guide-singapore-2026",
    category: "Property",
    badgeCls: "bg-emerald-50 border border-emerald-100 text-emerald-700",
    dotCls: "bg-emerald-500",
    ctaCls: "text-emerald-700 group-hover:text-emerald-800",
    title: "HDB MOP Guide Singapore 2026 — When Can You Sell and What Comes Next",
    excerpt:
      "Five years ago you signed on the dotted line. Now your MOP is up, your neighbour just sold for S$180,000 more than they paid, and everyone has an opinion on what you should do next.",
    readTime: "5 min read",
  },
  {
    slug: "how-much-life-insurance-do-i-need-singapore",
    category: "Financial",
    badgeCls: "bg-indigo-50 border border-indigo-100 text-indigo-700",
    dotCls: "bg-indigo-500",
    ctaCls: "text-indigo-700 group-hover:text-indigo-800",
    title: "How Much Life Insurance Do I Need in Singapore? A Straight-Talking Guide",
    excerpt:
      "Ask most Singaporeans how much life insurance they have and they&apos;ll say &apos;got lah.&apos; Ask them if it&apos;s enough and you&apos;ll get a longer pause. The average Singaporean is covered for less than half of what they actually need.",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="pt-24 pb-16 px-6 border-b border-slate-100 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
              Insights for Singaporeans
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              The MatchAdvisor Blog
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Honest, practical guides on property, finance and home renovation — no jargon, no agenda.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${post.badgeCls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${post.dotCls}`} />
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>

                <div className="flex-1">
                  <h2 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed">{post.excerpt}</p>
                </div>

                <span className={`text-sm font-semibold mt-auto ${post.ctaCls} transition-colors`}>
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
