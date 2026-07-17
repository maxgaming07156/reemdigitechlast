import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { Toaster } from "sonner";
import { getSiteSettings } from "@/lib/data/settings";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reemdigitech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReemDigiTech | Helping Businesses Grow Through Digital Innovation",
    template: "%s | ReemDigiTech",
  },
  description:
    "ReemDigiTech is a digital agency offering content creation, digital marketing, graphic design, video editing, web development, and AI-powered business automation services that drive real business growth.",
  keywords: [
    "digital agency",
    "digital marketing agency",
    "web development agency",
    "content creation agency",
    "graphic design services",
    "video editing services",
  ],
  authors: [{ name: "ReemDigiTech" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ReemDigiTech",
    title: "ReemDigiTech | Helping Businesses Grow Through Digital Innovation",
    description:
      "A digital agency offering content creation, digital marketing, graphic design, video editing, web development, and AI automation services.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ReemDigiTech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReemDigiTech | Helping Businesses Grow Through Digital Innovation",
    description:
      "A digital agency offering content creation, digital marketing, graphic design, video editing, web development, and AI automation services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logo-icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

import { OrganizationSchema, LocalBusinessSchema, WebSiteSchema } from "@/components/layout/schema";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} font-body`}
      >
        <OrganizationSchema settings={settings} />
        <LocalBusinessSchema settings={settings} />
        <WebSiteSchema />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter settings={settings} />
        <WhatsAppButton whatsappNumber={settings.whatsapp_number} />
        <ChatbotWidget />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
