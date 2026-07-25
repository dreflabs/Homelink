export const metadata = {
  title: "Cookie Policy | HomeLink 2.0",
  description: "Learn how we use cookies on our platform.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-8">Cookie Policy</h1>
        <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <h2>1. What Are Cookies?</h2>
        <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
        
        <h2>2. How We Use Cookies</h2>
        <p>We use cookies for several reasons:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for the operation of our platform. They include, for example, cookies that enable you to log into secure areas.</li>
          <li><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and to see how visitors move around our platform when they are using it.</li>
          <li><strong>Functionality Cookies:</strong> Used to recognize you when you return to our platform, enabling us to personalize our content for you.</li>
        </ul>
        
        <h2>3. Managing Cookies</h2>
        <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>
        
        <h2>4. Changes to This Policy</h2>
        <p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.</p>
      </div>
    </main>
  );
}
