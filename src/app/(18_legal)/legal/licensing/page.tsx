export const metadata = {
  title: "Licensing | HomeLink 2.0",
  description: "Read our licensing information.",
};

export default function LicensingPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">Licensing</h1>
        <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. Intellectual Property</h2>
        <p>All content, features, and functionality on the HomeLink 2.0 platform, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the exclusive property of HomeLink 2.0 or its licensors and are protected by Indonesian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
        
        <h2>2. User-Generated Content</h2>
        <p>By posting, uploading, or submitting property listings, images, or other content to our platform, you grant HomeLink 2.0 a non-exclusive, worldwide, royalty-free, irrevocable, sub-licensable, perpetual license to use, display, edit, modify, reproduce, distribute, store, and prepare derivative works of your content.</p>
        
        <h2>3. Open Source Software</h2>
        <p>Certain components of our platform may incorporate open-source software. Each open-source component is subject to its own applicable license terms, which can be found in our open-source attribution documentation.</p>
        
        <h2>4. Restrictions</h2>
        <p>You may not copy, reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our site without prior written consent from HomeLink 2.0.</p>
      </div>
    </main>
  );
}
