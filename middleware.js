import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // 1. Mobile Enforcement (except for API and public assets)
  if (!isMobile && !pathname.startsWith('/api') && !pathname.includes('.') && pathname !== '/desktop') {
    // We'll handle desktop callback page at /desktop or via a special UI
    // For now, let's allow navigation but the app components will handle the gatekeeping
    // Or we could redirect to a specific desktop page
    // return NextResponse.redirect(new URL('/desktop', request.url));
  }

  // 2. Rate Limiting for API
  if (pathname.startsWith('/api')) {
    const ip = request.ip || '127.0.0.1';
    try {
      if (process.env.UPSTASH_REDIS_REST_URL) {
        const count = await redis.incr(`ratelimit:${ip}`);
        if (count === 1) await redis.expire(`ratelimit:${ip}`, 3600);
        if (count > 100) {
          return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
      }
    } catch (err) {
      console.error('Middleware Redis error:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
