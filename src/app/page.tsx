import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ToolsSection from "@/components/ToolsSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Find Trusted Financial Advisors, Property Agents & Interior Designers in Singapore",
  description:
    "MatchAdvisor connects you with verified financial advisors, property agents, and interior designers in Singapore. Free matching, no cold calls, no pressure.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app",
  },
  openGraph: {
    title: "Find Trusted Professionals in Singapore | MatchAdvisor",
    description:
      "Free matching with verified financial advisors, property agents, and interior designers in Singapore. No cold calls, no pressure.",
    url: "https://matchadvisor.vercel.app",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MatchAdvisor",
  url: "https://matchadvisor.vercel.app",
  description:
    "Singapore marketplace connecting consumers with verified financial advisors, property agents and interior designers.",
  areaServed: "Singapore",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MatchAdvisor",
  url: "https://matchadvisor.vercel.app",
  description:
    "Find verified financial advisors, property agents and interior designers in Singapore.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <Hero />
      <Categories />
      <ToolsSection />
      <TrustSection />
      <Footer />
    </main>
  );
}

