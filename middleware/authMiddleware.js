const {Operator}= require("../db/Operator");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const operator = await Operator.findById(decoded?.id);
        req.operator = operator;
        next();
      }
    } 
  else {
    console.log("No Bearer token attached to header");
  }
};

module.exports = {authMiddleware};
