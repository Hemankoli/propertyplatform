const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// Extract token from headers
const verifyToken = (req) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

// Middleware: Check if user is authenticated
exports.checkAuthenticated = async (req, res, next) => {
  const token = verifyToken(req);
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id || decoded.id;
    if (!userId) return res.status(404).json({ message: "Invalid token payload" });
    const user = await UserModel.findById(userId);
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
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized: No User Data" });
    if (req.user.role !== "Admin") return res.status(403).json({ message: "Forbidden: Admins only" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};
