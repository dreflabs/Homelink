export const metadata = {
  title: "Refund Policy | HomeLink 2.0",
  description: "Read our refund policy for premium services.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">Refund Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. Overview</h2>
        <p>At HomeLink 2.0, we strive to ensure our premium users are completely satisfied with our services. This Refund Policy outlines the conditions under which refunds may be granted for our paid subscriptions and features.</p>
        
        <h2>2. Subscription Cancellations</h2>
        <p>You can cancel your premium subscription at any time. If you cancel, you will not be billed for any additional terms of service, and service will continue until the end of the current billing cycle.</p>
        
        <h2>3. Eligibility for Refund</h2>
        <p>We offer a 14-day money-back guarantee for all new annual subscriptions. If you are not satisfied within the first 14 days of your annual purchase, please contact our support team for a full refund.</p>
        <ul>
          <li>Monthly subscriptions are non-refundable.</li>
          <li>One-time property boost fees are non-refundable once the boost has been activated.</li>
          <li>Refunds will be processed to the original method of payment.</li>
        </ul>
        
        <h2>4. Contact Us</h2>
        <p>If you have any questions about our Refund Policy, please contact us at support@homelink.id.</p>
      </div>
    </main>
  );
}
