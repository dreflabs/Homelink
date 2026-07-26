import { Search, Book, MessageCircle, FileCheck, Settings, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Help Center | HomeLink 2.0",
  description: "Get support and learn how to use HomeLink 2.0.",
};

const categories = [
  { icon: Book, title: "Getting Started", desc: "Learn the basics of using HomeLink 2.0" },
  { icon: FileCheck, title: "Managing Listings", desc: "How to create and edit your property listings" },
  { icon: Shield, title: "Verification Process", desc: "Understand our property verification standards" },
  { icon: MessageCircle, title: "Communication", desc: "How to contact buyers, sellers, and agents" },
  { icon: Settings, title: "Account Settings", desc: "Manage your profile, passwords, and notifications" },
];

export default function HelpCenterPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-blue-700 py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            How can we help you?
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2  w-5 h-5" />
            <Input 
              placeholder="Search for articles, guides, and FAQs..." 
              className="w-full h-14 pl-12 rounded-full text-base bg-white border-none shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{cat.title}</h3>
              <p className="text-slate-600">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center bg-white p-12 rounded-3xl border border-slate-100 shadow-sm max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Still need help?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Our support team is always ready to help you with any questions or issues you might have.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-8 h-12">
              Contact Support
            </Button>
            <Button variant="outline" className="rounded-full px-8 h-12">
              View System Status
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
