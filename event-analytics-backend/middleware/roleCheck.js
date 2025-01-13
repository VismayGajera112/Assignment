const jwt = require("jsonwebtoken");

const roleCheck = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Access forbidden: insufficient permissions" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = roleCheck;
