import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request) {
  const ip = request.ip || '127.0.0.1';

  try {
    const count = await redis.incr(`rate_limit_auth:${ip}`);
    if (count === 1) {
      await redis.expire(`rate_limit_auth:${ip}`, 300); // 5 minutes
    }

    if (count > 10) {
      return NextResponse.json({ error: 'Too many login attempts' }, { status: 429 });
    }

    // Auth verification logic here (if needed server-side)

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
