import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function middleware(request) {
  // Only rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip || '127.0.0.1';

    try {
      if (!process.env.UPSTASH_REDIS_REST_URL) return NextResponse.next();

      const count = await redis.incr(`rate_limit:${ip}`);
      if (count === 1) {
        await redis.expire(`rate_limit:${ip}`, 3600);
      }

      if (count > 100) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        );
      }
    } catch (err) {
      console.error('Middleware rate limit error:', err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
