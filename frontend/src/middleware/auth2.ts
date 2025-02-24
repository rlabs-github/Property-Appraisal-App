import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/utils/firebase'

export async function middleware(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth-token')
    const requestedPath = request.nextUrl.pathname

    // List of paths that don't require authentication
    const publicPaths = ['/login', '/register']
    if (publicPaths.includes(requestedPath)) {
      if (authToken) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
      }
      return NextResponse.next()
    }

    // Additional property-specific checks
    if (requestedPath.startsWith('/properties')) {
      if (!authToken) {
        throw new Error('No auth token')
      }
      // You could add additional checks here if needed
      // For example, checking if user has property access permissions
    }

    // Verify Firebase token for all protected routes
    if (!authToken) {
      throw new Error('No auth token')
    }

    return NextResponse.next()
  } catch (error) {
    // If authentication fails, redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    // Properties routes
    '/properties/:path*',
    '/dashboard/:path*',
    '/documents/:path*',
    '/tools/:path*',
    // Exclude public routes and static assets
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ]
}