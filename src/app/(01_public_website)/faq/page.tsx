import { getActiveFAQs } from "@/actions/cms";
import FAQClient from "./FAQClient";

export const metadata = {
  title: "Frequently Asked Questions | HomeLink",
  description: "Find answers to common questions about HomeLink 2.0.",
};

export default async function FAQPage() {
  const faqs = await getActiveFAQs();
  
  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600">
            Find answers to common questions about HomeLink 2.0.
          </p>
        </div>

        <FAQClient faqs={faqs} />
      </section>
    </main>
  );
}
