import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Property Agent in Singapore — CEA-Registered & Verified",
  description:
    "Get matched with CEA-registered property agents in Singapore. Free service, no cold calls — whether you're buying, selling or renting HDB or private property.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/find-agent",
  },
  openGraph: {
    title: "Find a Verified Property Agent in Singapore | MatchAdvisor",
    description:
      "Free matching with CEA-registered property agents. No cold calls, no pressure — you stay in control.",
    url: "https://matchadvisor.vercel.app/find-agent",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
