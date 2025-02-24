// src/middleware/auth.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/utils/firebase' // Your Firebase auth instance

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

    // Verify Firebase token
    if (!authToken) {
      throw new Error('No auth token')
    }

    // Token verification and user status check would happen in your API
    // Middleware should be light and fast
    
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
    // Protect all routes except public ones
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ]
}