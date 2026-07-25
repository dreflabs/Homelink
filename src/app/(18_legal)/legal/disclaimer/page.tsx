export const metadata = {
  title: "Disclaimer | HomeLink 2.0",
  description: "Read our platform disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">Disclaimer</h1>
        <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. Information Accuracy</h2>
        <p>While HomeLink 2.0 employs surveyors to verify properties (our "Zero Ghost Listing" policy), we are a platform connecting buyers, sellers, and agents. We do not guarantee the absolute accuracy, completeness, or usefulness of all information presented. Real estate markets change rapidly, and users must conduct their own due diligence.</p>
        
        <h2>2. No Professional Advice</h2>
        <p>The information provided on this platform does not constitute legal, financial, or real estate advice. Users should consult with certified professionals before making significant financial decisions or signing legal contracts.</p>
        
        <h2>3. Third-Party Links</h2>
        <p>Our platform may contain links to third-party websites. HomeLink 2.0 has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
        
        <h2>4. Limitation of Liability</h2>
        <p>In no event shall HomeLink 2.0, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the platform.</p>
      </div>
    </main>
  );
}
