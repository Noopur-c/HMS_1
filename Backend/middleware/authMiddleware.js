import jwt from 'jsonwebtoken';
const { verify } = jwt;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function verifyToken(roles = []) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Token required' });

    try {
      const decoded = verify(token, JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Unauthorized role' });
      }
      req.user = decoded; // decoded has id, role
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}
