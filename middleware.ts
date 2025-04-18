import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  try {
    const { pathname, search } = request.nextUrl
    const hostname = request.headers.get("host") || ""
    const isPreview = process.env.VERCEL_ENV === "preview" || !process.env.VERCEL_ENV

    // Check for session cookie
    const sessionCookie = request.cookies.get("session")
    const isAuthenticated = !!sessionCookie?.value

    // In preview environments, don't do subdomain routing
    if (isPreview) {
      // Redirect authenticated users away from auth routes
      if (isAuthenticated && (pathname === "/sign-in" || pathname === "/sign-up")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      // Redirect unauthenticated users away from protected routes
      if (!isAuthenticated && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, request.url))
      }

      return NextResponse.next()
    }

    // Production environment logic below
    // Check if we're on the app subdomain
    const isAppDomain = hostname.startsWith("app.") || hostname.includes("localhost")

    // Check if we're on the main domain (alpaka.ai)
    const isMainDomain = !isAppDomain && (hostname.includes("alpaka.ai") || hostname.includes("vercel.app"))

    // Define protected routes that should only be accessible on app.alpaka.ai
    const protectedRoutes = ["/dashboard", "/settings", "/pricing"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Define authentication routes
    const authRoutes = ["/sign-in", "/sign-up"]
    const isAuthRoute = authRoutes.some((route) => pathname === route)

    // If we're on the main domain (alpaka.ai) and trying to access app routes, redirect to app subdomain
    if (isMainDomain && (isProtectedRoute || isAuthRoute)) {
      const url = new URL(request.url)
      url.host = url.host.replace(hostname, `app.${hostname.replace("www.", "")}`)
      return NextResponse.redirect(url)
    }

    // If we're on the app subdomain (app.alpaka.ai)
    if (isAppDomain) {
      // Redirect authenticated users away from auth routes
      if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      // Redirect unauthenticated users away from protected routes
      if (!isAuthenticated && isProtectedRoute) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${encodeURIComponent(pathname)}`, request.url))
      }

      // If on the root path of app subdomain, redirect to dashboard if authenticated
      if (pathname === "/" && isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }

      // If on the root path of app subdomain and not authenticated, redirect to sign-in
      if (pathname === "/" && !isAuthenticated) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
      }
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
