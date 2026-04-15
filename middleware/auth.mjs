import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, error: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET || 'ape-self-secret-2026', (err, user) => {
    if (err) return res.status(403).json({ success: false, error: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: "Access denied. Insufficient permissions." });
    }
    next();
  };
};
