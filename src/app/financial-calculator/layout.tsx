import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Needs Calculator — Insurance & Retirement Gap",
  description:
    "Find out how well-covered you are in under 2 minutes. Calculate your insurance gap, retirement savings gap, and get personalised recommendations. Free tool for Singaporeans.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/financial-calculator",
  },
  openGraph: {
    title: "Financial Needs Calculator | MatchAdvisor",
    description:
      "Calculate your insurance gap and retirement savings gap in under 2 minutes. Free tool built for Singaporeans.",
    url: "https://matchadvisor.vercel.app/financial-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

