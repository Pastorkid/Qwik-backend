// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
const token = require("../configs/jwtToken");
function authMiddleware(req, res, next) {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if a token is present
  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({message: "Token is not valid"});
    }

    // Attach the decoded payload (user information) to the request object
    req.user = decoded;

    // Continue to the next middleware or route
    next();
  });
}

module.exports = authMiddleware;
