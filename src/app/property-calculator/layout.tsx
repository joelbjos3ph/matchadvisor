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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
