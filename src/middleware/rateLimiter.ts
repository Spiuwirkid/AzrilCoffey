import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 5, // maksimal 5 percobaan
  message: 'Too many login attempts',
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    return req.ip; // Gunakan IP sebagai identifier
  }
}); 