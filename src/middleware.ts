import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

import { decrypt } from './lib/session';

const i18nMiddleware = createMiddleware(routing);

export const publicRoutes = [
  '/signin',
  '/signup',
  '/forgot-password',
  '/',
  '/not-found',
];

const protectedRoutes = ['/driver', '/passenger', '/admin'];

const roleBasedRedirects: Record<string, string> = {
  driver: '/driver/dashboard',
  user: '/passenger/dashboard',
  admin: '/admin/dashboard',
};

export default async function middleware(req: NextRequest) {
  const response = i18nMiddleware(req);

  if (response && !response.ok) {
    // response not in the range 200-299 (usually a redirect)
    // no need to execute the auth middleware
    return response;
  }
  return authMiddleware(req);
}

export async function authMiddleware(req: NextRequest) {
  // 🛠️ **Remove the locale prefix (e.g., /en/signin → /signin)**
  const localeRegex = /^\/(ne|en)(\/|$)/; // Matches '/en' or '/ne' at the start
  const normalizedPath = req.nextUrl.pathname.replace(localeRegex, '/');

  // Check if the current route is protected or public
  const isPublicRoute = publicRoutes.includes(normalizedPath);
  const isProtectedRoute = protectedRoutes.some(route =>
    normalizedPath.startsWith(route)
  );

  // Read and decrypt the session cookie
  const cookie = (await cookies()).get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;
  const role = session?.role as string;
  const isAuthenticated = Boolean(session?.token);

  // 🚨 **User is not authenticated and tries to access a protected route → Redirect to /signin**
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // 🚨 **User is authenticated but tries to access a public route (e.g., /signin, /signup) → Redirect to their dashboard**
  if (isAuthenticated && isPublicRoute) {
    const redirectPath = roleBasedRedirects[role] || '/dashboard';
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // 🚨 **Role-Based Access Control: Prevent users from accessing unauthorized dashboards**
  if (isProtectedRoute && role) {
    if (normalizedPath.startsWith('/driver') && role !== 'driver') {
      return NextResponse.redirect(new URL(roleBasedRedirects[role], req.url));
    }
    if (normalizedPath.startsWith('/passenger') && role !== 'user') {
      return NextResponse.redirect(new URL(roleBasedRedirects[role], req.url));
    }
    if (normalizedPath.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(roleBasedRedirects[role], req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match only internationalized pathnames and exclude API routes
    '/((?!api|.*\\..*|_next).*)',
    '/',
    '/(ne|en)/:path*',
  ],
};
