import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | HomeLink 2.0",
    default: "HomeLink 2.0 - Platform Properti Terverifikasi",
  },
  description: "Platform properti kelas dunia di Indonesia dengan verifikasi ketat tanpa ghost listing.",
  openGraph: {
    title: "HomeLink 2.0 - Platform Properti Terverifikasi",
    description: "Platform properti kelas dunia di Indonesia dengan verifikasi ketat tanpa ghost listing.",
    url: "https://homelink.id",
    siteName: "HomeLink 2.0",
    locale: "id_ID",
    type: "website",
  },
};


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
