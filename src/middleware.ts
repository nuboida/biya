import { NextRequest, NextResponse } from 'next/server'
import { decrypt, deleteSession } from './lib/session';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/wallet', '/order-management', '/settings', '/user-management', ];
const publicRoutes = ['/login', '/register', '/'];
const notAdmin = ['/dashboard', '/order-management'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isNotAdmin = notAdmin.includes(path);
  const cookie = req.cookies.get('session')?.value;
  if (cookie) {
    const session = await decrypt(cookie);
    if (!session?._id) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if (session?.exp < Date.now() / 1000) {
      await deleteSession()
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if (isProtectedRoute && !session?._id) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (isNotAdmin && session.role !== "Owner" && session.role !== "Admin") {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (isPublicRoute && session?._id && !path.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  //matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  matcher: [
    "/login",
    "/register",
    "/wallet",
    "/wallet/:path*",
    "/user-management",
    "/user-management/:path*",
    "/settings"
  ]
}
