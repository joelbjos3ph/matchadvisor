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

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Financial Needs Calculator",
  url: "https://matchadvisor.vercel.app/financial-calculator",
  description:
    "Calculate your insurance coverage gap and retirement savings gap in under 2 minutes. Free tool for Singaporeans.",
  applicationCategory: "FinanceApplication",
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
      name: "How much life insurance do I need in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A common rule of thumb is 10 times your annual income, plus 2 times for each dependent child. Our calculator gives you a personalised estimate based on your income, family size, and existing coverage.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate my retirement savings gap in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your retirement savings gap is the difference between your target nest egg (based on 70% of your current income at a 4% withdrawal rate) and your current savings including CPF. Our calculator computes this instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is this financial calculator free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the MatchAdvisor Financial Needs Calculator is completely free to use with no sign-up required. It provides general estimates only and does not constitute financial advice.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good coverage score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A score of 80 and above means you are well protected. 60-79 is fairly covered, 40-59 needs attention, and below 40 means you are significantly under-covered and should speak to a financial advisor.",
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
