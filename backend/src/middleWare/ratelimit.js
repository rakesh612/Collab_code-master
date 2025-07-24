import redis from '../config/dbConnect.js';

const RATE_LIMIT = {
  capacity: 10,
  refillInterval: 10000,
};

export const rateLimiter = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const key = `ratelimit:${ip}`;
  const now = Date.now();

  let bucket = await redis.hGetAll(key);
  let tokens = parseInt(bucket.tokens) || RATE_LIMIT.capacity;
  let lastRefill = parseInt(bucket.lastRefill) || now;
  
  const elapsed = now - lastRefill;
  const tokensToAdd = Math.floor(elapsed / RATE_LIMIT.refillInterval);

  if (tokensToAdd > 0) {
    tokens = Math.min(RATE_LIMIT.capacity, tokens + tokensToAdd);
    lastRefill = lastRefill + tokensToAdd * RATE_LIMIT.refillInterval;
  }

  if (tokens > 0) {
    tokens -= 1;

    await redis.hSet(key, {
      tokens,
      lastRefill,
    });

    await redis.expire(key, 3600);

    res.setHeader('X-RateLimit-Remaining', tokens);
    return next();
  } else {
    const retryAfter = Math.ceil(
      (RATE_LIMIT.refillInterval - (now - lastRefill)) / 1000
    );
    res.setHeader('Retry-After', retryAfter);
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
    });
  }
};
