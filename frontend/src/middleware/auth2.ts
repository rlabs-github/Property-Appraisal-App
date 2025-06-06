import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/utils/firebase'

export async function middleware(request: NextRequest) {
  // Auth checks bypassed for now
  return NextResponse.next();
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