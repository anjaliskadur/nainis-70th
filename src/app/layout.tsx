import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SurpriseBanner } from "@/components/layout/SurpriseBanner";
import { SurpriseModal } from "@/components/layout/SurpriseModal";
import { UnderConstructionModal } from "@/components/layout/UnderConstructionModal";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.event.title,
    template: `%s \u2014 ${site.meta.siteName}`,
  },
  description: site.meta.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ivory">
        <SurpriseBanner />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <SurpriseModal />
        <UnderConstructionModal />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
