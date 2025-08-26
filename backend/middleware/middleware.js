const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// Extract token from headers
const verifyToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return token;
  }
  return null;
};

// Middleware: Check if user is authenticated
exports.checkAuthenticated = async (req, res, next) => {
  const token = verifyToken(req);
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.user_id || decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

// Middleware: Check if user is Admin
exports.isAdmin = (req, res, next) => {
  const token = verifyToken(req);
  if (!token) return res.status(401).json({ message: "No token provided" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  if (req.user.role !== "Admin")
    return res.status(403).json({ message: "Forbidden: Admins only" });
  next();
};
