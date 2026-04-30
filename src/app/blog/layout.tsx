import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog — Property, Finance & Renovation Guides for Singaporeans",
    template: "%s | MatchAdvisor Blog",
  },
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
  robots: {
    index: false,
    follow: true,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
