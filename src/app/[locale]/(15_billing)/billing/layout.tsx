import Link from 'next/link';
import { CreditCard, Wallet, WalletCards } from 'lucide-react';
import { ReactNode } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const navItems = [
  { name: 'Subscription', href: '/billing', icon: WalletCards },
  { name: 'Upgrade Plan', href: '/billing/upgrade', icon: CreditCard },
  { name: 'Payment History', href: '/billing/payment-history', icon: Wallet },
  { name: 'Invoices', href: '/billing/invoices', icon: Wallet },
  { name: 'Coupons (Admin)', href: '/billing/coupons', icon: CreditCard },
];

export const dynamic = 'force-dynamic';

export default async function BillingLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }
  const role = (session.user as any)?.role;
  if (role !== 'OWNER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc] text-slate-900 font-sans flex flex-col md:flex-row selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/60 backdrop-blur-md border-r border-slate-200/60 px-5 py-8 flex-shrink-0 hidden md:block">
        <div className="mb-8 px-3">
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Billing & Settings</h2>
          <p className="text-xs text-slate-500 mt-1">Manage your account</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all duration-200 ease-in-out"
              >
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 overflow-x-auto shadow-sm">
        <nav className="flex space-x-6">
          {navItems.map((item) => (
             <Link
               key={item.name}
               href={item.href}
               className="text-sm font-medium text-slate-600 whitespace-nowrap hover:text-indigo-600 transition-colors"
             >
               {item.name}
             </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Subtle page header area could go here, but we leave it to children pages */}
          <div className="bg-white/50 backdrop-blur-xl rounded-2xl shadow-card border border-slate-200/60 overflow-hidden min-h-[600px] p-6 md:p-10 transition-all">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
