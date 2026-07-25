import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Tags,
  HelpCircle,
  Image as ImageIcon,
  ImagePlay,
  MessageSquare,
  FileCode2,
  Search,
  LayoutTemplate
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/cms/dashboard', icon: LayoutDashboard },
  { name: 'Articles', href: '/cms/articles', icon: FileText },
  { name: 'Categories', href: '/cms/categories', icon: Tags },
  { name: 'Media Library', href: '/cms/media-library', icon: ImageIcon },
  { name: 'Banner', href: '/cms/banner', icon: ImagePlay },
  { name: 'Testimonials', href: '/cms/testimonials', icon: MessageSquare },
  { name: 'FAQ Management', href: '/cms/faq-management', icon: HelpCircle },
  { name: 'Static Pages', href: '/cms/static-pages', icon: FileCode2 },
  { name: 'SEO Settings', href: '/cms/seo-settings', icon: Search },
  { name: 'Homepage Builder', href: '/cms/homepage-builder', icon: LayoutTemplate },
];

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/cms/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HL</span>
            </div>
            <span className="text-base font-semibold tracking-tight text-gray-900">
              CMS Admin
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="px-2 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Menu
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2.5 text-sm font-medium rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 group"
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="min-h-full px-8 py-8 max-w-[1600px] mx-auto">
          {/* Content Wrapper for contrast */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/75 min-h-[calc(100vh-4rem)] p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
