import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovation Cost Estimator — Singapore 2026 Market Rates",
  description:
    "Get an instant renovation cost estimate for your Singapore home — HDB BTO, HDB Resale, Condo or Landed. Based on 2026 market rates. Free tool, no sign-up required.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/renovation-calculator",
  },
  openGraph: {
    title: "Renovation Cost Estimator | MatchAdvisor",
    description:
      "Get a realistic renovation cost range for HDB, Condo, or Landed in Singapore. Free calculator based on 2026 market rates.",
    url: "https://matchadvisor.vercel.app/renovation-calculator",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Renovation Cost Estimator",
  url: "https://matchadvisor.vercel.app/renovation-calculator",
  description:
    "Get an instant renovation cost estimate for HDB BTO, HDB Resale, Condo, or Landed properties in Singapore. Based on 2026 market rates.",
  applicationCategory: "HomeImprovement",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "SGD",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to renovate an HDB flat in Singapore in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In 2026, a standard HDB BTO renovation in Singapore costs S$25,000–$45,000 for a 3-room flat and S$45,000–$70,000 for a 5-room flat at a modern style level. HDB resale renovations typically run 25% higher due to hacking, plumbing upgrades, and concealed wiring works.",
      },
    },
    {
      "@type": "Question",
      name: "What is the most expensive part of a home renovation in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Carpentry and built-in joinery is typically the largest variable cost in a Singapore renovation, ranging from S$8,000 to S$20,000 depending on scope. Kitchen renovations (S$8,000–$15,000) and bathrooms (S$4,000–$8,000 per unit) are the next largest items.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a full HDB renovation take in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full HDB BTO renovation typically takes 8–12 weeks from start to handover. Resale renovations take longer — usually 10–14 weeks — due to additional hacking and concealed works. Adding extensive carpentry or kitchen and bathroom works can extend the timeline by 2–4 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use an interior designer or contractor for my renovation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An interior designer (ID) firm typically charges 15–20% more than a direct contractor but provides project management, 3D design, and a single point of accountability. For complex renovations with extensive carpentry or multiple wet works, an ID firm often saves time and reduces costly mistakes.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
