import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HDB Seller Calculator — MOP Status & Net Proceeds",
  description:
    "Instantly check your HDB MOP eligibility, estimate net proceeds after CPF refund and agent fees, and explore your upgrade options. Free calculator for Singapore homeowners.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/property-calculator",
  },
  openGraph: {
    title: "HDB Seller Calculator | MatchAdvisor",
    description:
      "Check MOP status, calculate net proceeds after CPF refund, and explore upgrade options. Free tool for Singapore HDB owners.",
    url: "https://matchadvisor.vercel.app/property-calculator",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HDB Seller Calculator",
  url: "https://matchadvisor.vercel.app/property-calculator",
  description:
    "Check HDB MOP eligibility, calculate net proceeds after CPF refund and fees, and explore upgrade options. Free tool for Singapore homeowners.",
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
      name: "What is the MOP for HDB flats in Singapore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Minimum Occupation Period (MOP) for HDB flats is 5 years from the date of key collection. You cannot sell your flat on the open market before completing the MOP.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate my HDB net proceeds after selling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your net proceeds = Sale price minus CPF refund (principal + accrued interest at 2.5% p.a.) minus agent fee (typically 1%) minus legal fees (est. S$2,800) minus outstanding loan. Our calculator does this instantly.",
      },
    },
    {
      "@type": "Question",
      name: "How much CPF do I have to return when I sell my HDB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You must refund all CPF principal withdrawn for the flat plus accrued interest at 2.5% per annum. This goes back into your CPF OA account, not lost — you can use it for your next property.",
      },
    },
    {
      "@type": "Question",
      name: "Can I upgrade from HDB to a condo after selling?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, once your MOP is fulfilled you can sell your HDB and upgrade to a private condo, executive condominium (EC), or landed property. Our calculator shows your estimated net proceeds and upgrade options based on your flat type.",
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
