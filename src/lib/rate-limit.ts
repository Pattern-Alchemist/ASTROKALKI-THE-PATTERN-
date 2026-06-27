import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter that allows 10 requests per 1 minute
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function checkRateLimit(identifier: string): Promise<boolean> {
  try {
    const { success } = await ratelimit.limit(identifier);
    return success;
  } catch (error) {
    // If rate limit fails, allow the request (fail open)
    console.error('Rate limit check failed:', error);
    return true;
  }
}
