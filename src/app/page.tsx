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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <ToolsSection />
      <TrustSection />
      <Footer />
    </main>
  );
}
