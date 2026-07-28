import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
        token.isOnboarded = (user as any).isOnboarded;
      }
      if (trigger === "update" && session) {
        if (session.role) token.role = session.role;
        if (session.isOnboarded !== undefined) token.isOnboarded = session.isOnboarded;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
        (session.user as any).isOnboarded = token.isOnboarded;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      let pathname = nextUrl.pathname;
      
      // Extract existing locale prefix if any, defaulting to '/id'
      let localePrefix = '/id';
      const locales = ['/id', '/en'];
      for (const loc of locales) {
        if (pathname === loc || pathname.startsWith(`${loc}/`)) {
          localePrefix = loc;
          break;
        }
      }

      // Normalize pathname by stripping locale prefixes for consistent authorization check
      for (const loc of locales) {
        if (pathname === loc) {
          pathname = '/';
          break;
        } else if (pathname.startsWith(`${loc}/`)) {
          pathname = pathname.slice(loc.length);
          break;
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DEBUG_AUTH_CONFIG] Normalized Path: ${pathname}, Original Path: ${nextUrl.pathname}, LoggedIn: ${isLoggedIn}`);
      }
      const role = (auth?.user as any)?.role;
      const isOnboarded = (auth?.user as any)?.isOnboarded;
      
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
        
        // Force onboarding if they haven't completed it
        if (!isOnboarded && pathname !== '/onboarding') {
          return Response.redirect(new URL(`${localePrefix}/onboarding`, nextUrl));
        }

        if (pathname.startsWith('/admin') && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/super-admin') && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/owner') && role !== 'OWNER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/surveyor') && role !== 'SURVEYOR' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/internal') && role !== 'INTERNAL_AGENT' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/agent') && role !== 'PARTNER_AGENT' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/photographer') && role !== 'PHOTOGRAPHER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/billing') && role !== 'OWNER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }
        if (pathname.startsWith('/ai') && role !== 'OWNER' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
          return Response.redirect(new URL(`${localePrefix}/unauthorized`, nextUrl));
        }

        return true;
      } else if (isLoggedIn) {
        if (pathname === '/login' || pathname === '/register') {
          if (!isOnboarded) {
            return Response.redirect(new URL(`${localePrefix}/onboarding`, nextUrl));
          }
          switch (role) {
            case 'OWNER':
              return Response.redirect(new URL(`${localePrefix}/owner/properties`, nextUrl));
            case 'SURVEYOR':
              return Response.redirect(new URL(`${localePrefix}/surveyor/dashboard`, nextUrl));
            case 'ADMIN':
            case 'SUPER_ADMIN':
              return Response.redirect(new URL(`${localePrefix}/admin`, nextUrl));
            case 'BUYER':
              return Response.redirect(new URL(`${localePrefix}/dashboard`, nextUrl));
            default:
              return Response.redirect(new URL(`${localePrefix}/`, nextUrl));
          }
        }
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
