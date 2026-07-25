import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | HomeLink 2.0",
  description: "Get in touch with the HomeLink 2.0 team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Let's talk about your property needs.
            </h1>
            <p className="text-lg text-slate-600 mb-12">
              Whether you're looking to buy, sell, or just have a question about our platform, our team is here to help.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Our Office</h3>
                  <p className="text-slate-600 mt-1">Sudirman Central Business District (SCBD)<br />Jakarta Selatan, 12190</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Phone</h3>
                  <p className="text-slate-600 mt-1">+62 21 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Email</h3>
                  <p className="text-slate-600 mt-1">hello@homelink.id</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
            <h2 className="text-2xl font-semibold mb-6 text-slate-900">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <Input placeholder="John" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <Input placeholder="Doe" className="bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <Input type="email" placeholder="john@example.com" className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <Textarea placeholder="How can we help you?" className="bg-white min-h-[150px]" />
              </div>
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white h-12 text-base font-semibold">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
