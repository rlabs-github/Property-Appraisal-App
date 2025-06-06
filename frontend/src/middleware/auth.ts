// src/middleware/auth.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/utils/firebase' // Your Firebase auth instance

export async function middleware(request: NextRequest) {
  // Auth checks bypassed for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all routes except public ones
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ]
}