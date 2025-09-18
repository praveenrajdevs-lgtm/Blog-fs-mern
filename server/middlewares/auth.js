const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "unautorized" });

    const bearerToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized request" });

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

module.exports = authMiddleware;
