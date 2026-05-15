import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { PHProvider } from "@/components/providers/posthog-provider";
import PostHogPageView from "@/components/providers/posthog-pageview";
import AffiliateTracker from "@/components/providers/AffiliateTracker";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EtherForge | AI-Powered Autonomy for Digital Wealth",
  description: "The premier platform for high-margin digital downloads, Notion templates, and AI toolkits for the modern solopreneur.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased dark`}
    >
      <PHProvider>
        <body className="min-h-full flex flex-col">
          <PostHogPageView />
          <AffiliateTracker />
          {children}
          {gaId && <GoogleAnalytics gaId={gaId} />}
        </body>
      </PHProvider>
    </html>
  );
}
