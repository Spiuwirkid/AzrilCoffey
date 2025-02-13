const suspiciousIPs = new Set(); // Simpan IP mencurigakan
const maxFailedAttempts = 3;

export const securityMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip;
  const userAgent = req.headers['user-agent'];

  // Cek IP mencurigakan
  if (suspiciousIPs.has(clientIP)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Cek User-Agent
  if (!userAgent || userAgent.includes('curl') || userAgent.includes('Postman')) {
    suspiciousIPs.add(clientIP);
    return res.status(403).json({ error: 'Invalid client' });
  }

  next();
}; 