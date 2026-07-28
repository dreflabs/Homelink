import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homelink.id"),
  title: {
    default: "HomeLink 2.0 | Platform Properti Terverifikasi #1 di Indonesia",
    template: "%s | HomeLink 2.0",
  },
  description: "Platform properti paling aman tanpa ghost listing. Temukan rumah impian Anda dengan inspeksi ketat dan garansi AI valuation.",
  icons: {
    icon: "/FAV_ICON.png",
    shortcut: "/FAV_ICON.png",
    apple: "/FAV_ICON.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://homelink.id",
    siteName: "HomeLink 2.0",
    title: "HomeLink 2.0 | Properti Terverifikasi Bebas Ghost Listing",
    description: "Cari properti aman dan terverifikasi di seluruh Indonesia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HomeLink 2.0 OG Image",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeLink 2.0",
    description: "Platform properti paling aman tanpa ghost listing.",
  },
};

export default async function RootLayout({
  children,
  modal,
  params
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Wait for the params to resolve before using properties from it
  const resolvedParams = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={resolvedParams.locale}
      className={cn("h-full", "antialiased", geist.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages} locale={resolvedParams.locale}>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
          {modal}
          <Toaster richColors closeButton position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
