import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple middleware that doesn't rely on database access
export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname

    // Define protected routes
    const protectedRoutes = ["/dashboard", "/settings", "/pricing"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Define authentication routes
    const authRoutes = ["/sign-in", "/sign-up"]
    const isAuthRoute = authRoutes.some((route) => pathname === route)

    // Check for session cookie
    const sessionCookie = request.cookies.get("session")
    const isAuthenticated = !!sessionCookie?.value

    // Redirect authenticated users away from auth routes
    if (isAuthenticated && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Redirect unauthenticated users away from protected routes
    if (!isAuthenticated && isProtectedRoute) {
      return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // In case of error, allow the request to proceed
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/pricing", "/sign-in", "/sign-up"],
}
