import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Property, Finance & Renovation Guides for Singaporeans | MatchAdvisor",
  description:
    "Practical guides on HDB renovation costs, MOP, life insurance and more — written for Singaporeans, by MatchAdvisor.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/blog",
  },
  openGraph: {
    title: "The MatchAdvisor Blog",
    description:
      "Practical guides on HDB renovation costs, MOP, life insurance and more — written for Singaporeans, by MatchAdvisor.",
    url: "https://matchadvisor.vercel.app/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
