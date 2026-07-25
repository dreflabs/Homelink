import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://homelink.id"),
  title: {
    default: "HomeLink 2.0 | Platform Properti Terverifikasi #1 di Indonesia",
    template: "%s | HomeLink 2.0",
  },
  description: "Platform properti paling aman tanpa ghost listing. Temukan rumah impian Anda dengan inspeksi ketat dan garansi AI valuation.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
