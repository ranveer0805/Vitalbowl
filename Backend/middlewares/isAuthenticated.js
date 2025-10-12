// backend/middlewares/isAuthenticated.js
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  console.log('isAuthenticated middleware called');
  console.log('Auth header:', req.headers.authorization);
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    console.log('Token extracted:', token ? 'Yes' : 'No');
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "jorasiyaKey");
    console.log('Decoded token:', decoded);
    // decoded should contain { id: ... }
    if (!decoded || !decoded.id) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded.id;
    console.log('req.user set to:', req.user);
    return next();
  } catch (err) {
    console.log('JWT verify error:', err.message);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

module.exports = isAuthenticated;

