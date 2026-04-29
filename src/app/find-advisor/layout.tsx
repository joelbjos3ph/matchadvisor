import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Financial Advisor in Singapore — MAS-Licensed & Verified",
  description:
    "Get matched with MAS-licensed financial advisors in Singapore. Free service, no cold calls — you reach out first. Coverage, retirement, investments and more.",
  alternates: {
    canonical: "https://matchadvisor.vercel.app/find-advisor",
  },
  openGraph: {
    title: "Find a Verified Financial Advisor in Singapore | MatchAdvisor",
    description:
      "Free matching with MAS-licensed financial advisors. No cold calls, no pressure — you stay in control.",
    url: "https://matchadvisor.vercel.app/find-advisor",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
