import NextAuth from 'next-auth';
import { authConfig } from '../auth.config';
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed'
});

const auth = NextAuth(authConfig).auth;

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/([a-z]{2}))?(/login|/register|/api/.*|/_next/.*|/.*\\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot))$`,
    'i'
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (auth as any)((req: NextRequest) => {
      return intlMiddleware(req);
    })(req, null);
  }
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
