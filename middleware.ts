import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public invitation pages don't need auth — skip the getUser() network call
  // entirely on every RSC payload / prefetch for /<slug>.
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/login')) {
    return NextResponse.next()
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    // Exclude static assets, _next internals, and well-known files.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ttf|otf|ico|css|js|map)$).*)',
  ],
}
