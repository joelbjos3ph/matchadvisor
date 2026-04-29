import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find an Interior Designer in Singapore — Verified Portfolios",
  description:
    "Get matched with verified interior designers in Singapore. Free service, no cold calls — browse portfolios and reach out on your own terms. HDB, condo and landed.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/find-designer",
  },
  openGraph: {
    title: "Find a Verified Interior Designer in Singapore | MatchAdvisor",
    description:
      "Free matching with verified interior designers. No cold calls, no pressure — you stay in control.",
    url: "https://matchadvisor.vercel.app/find-designer",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
