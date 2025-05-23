import jwt from 'jsonwebtoken';

// Replace with your actual secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function verifyToken(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      // If roles are specified, check authorization
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(400).json({ error: 'Invalid token' });
    }
  };
}


