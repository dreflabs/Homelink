import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;
      const pathname = nextUrl.pathname;
      
      const isProtectedRoute = 
        pathname.startsWith('/dashboard') || 
        pathname.startsWith('/admin') ||
        pathname.startsWith('/super-admin') ||
        pathname.startsWith('/internal') ||
        pathname.startsWith('/owner') ||
        pathname.startsWith('/billing') ||
        pathname.startsWith('/notifications') ||
        pathname.startsWith('/ai') ||
        pathname.startsWith('/surveyor') ||
        pathname.startsWith('/agent') ||
        pathname.startsWith('/photographer');
                               
      if (isProtectedRoute) {
        if (!isLoggedIn) return false; // Triggers redirect to /login?callbackUrl=...
        
        if (pathname.startsWith('/admin') && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        if (pathname.startsWith('/super-admin') && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        if (pathname.startsWith('/owner') && role !== 'OWNER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        if (pathname.startsWith('/surveyor') && role !== 'SURVEYOR' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        if (pathname.startsWith('/internal') && role !== 'INTERNAL_AGENT' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        if (pathname.startsWith('/agent') && role !== 'PARTNER_AGENT' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        if (pathname.startsWith('/photographer') && role !== 'PHOTOGRAPHER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }

        return true;
      } else if (isLoggedIn) {
        if (pathname === '/login' || pathname === '/register') {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
