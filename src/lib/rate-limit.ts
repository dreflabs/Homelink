const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// In-memory only; resets on redeploy/restart and doesn't scale across instances.
// Good enough as a basic throttle, replace with Redis for production-grade limiting.
export function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key) ?? { count: 0, lastReset: now };

  if (now - entry.lastReset > windowMs) {
    entry.count = 0;
    entry.lastReset = now;
  }

  entry.count++;
  rateLimitMap.set(key, entry);

  return entry.count > maxRequests;
}
