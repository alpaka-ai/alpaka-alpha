import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl
    const hostname = request.headers.get("host") || ""

    // Check for session cookie
    const sessionCookie = request.cookies.get("session")
    const isAuthenticated = !!sessionCookie?.value

    // Check if we're on the app subdomain
    const isAppDomain = hostname.startsWith("app.") || hostname.includes("localhost")

    // Define protected routes that should only be accessible when authenticated
    const protectedRoutes = ["/dashboard", "/settings", "/pricing"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Define authentication routes
    const authRoutes = ["/sign-in", "/sign-up"]
    const isAuthRoute = authRoutes.some((route) => pathname === route)

    // Redirect authenticated users away from auth routes
    if (isAuthenticated && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Redirect unauthenticated users away from protected routes
    if (!isAuthenticated && isProtectedRoute) {
      return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url))
    }

    // If on the root path of app subdomain, redirect to dashboard if authenticated
    if (isAppDomain && pathname === "/" && isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // In case of error, allow the request to proceed
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}
