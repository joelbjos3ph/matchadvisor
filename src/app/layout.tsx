import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matchadvisor.vercel.app"),
  title: {
    default: "MatchAdvisor — Find Trusted Professionals in Singapore",
    template: "%s | MatchAdvisor",
  },
  description:
    "Connect with verified financial advisors, property agents, and interior designers in Singapore. Free matching, no cold calls, no commission pressure.",
  keywords: [
    "financial advisor Singapore",
    "property agent Singapore",
    "interior designer Singapore",
    "find financial advisor Singapore",
    "HDB property agent",
    "verified professionals Singapore",
  ],
  authors: [{ name: "MatchAdvisor" }],
  creator: "MatchAdvisor",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://matchadvisor.vercel.app",
    siteName: "MatchAdvisor",
    title: "MatchAdvisor — Find Trusted Professionals in Singapore",
    description:
      "Connect with verified financial advisors, property agents, and interior designers in Singapore. Free matching, no cold calls.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MatchAdvisor — Find Trusted Professionals in Singapore",
    description:
      "Connect with verified financial advisors, property agents, and interior designers in Singapore. Free matching, no cold calls.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
