const Operator = require("../db/Operator");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const operator = await Operator.findById(decoded?.id);
        req.operator = operator;
        next();
      }
    } catch (error) {
      console.log("No Authorized token, token expired , Please LOgin again");
    }
  } else {
    console.log("No Bearer token attached to header");
  }
};

// const isAdmin=asyncHandler(async(req,res,next)=>{
//   const {email}=req.admin;
//   const adminUser=await prisma.Admin.findUnique({
//     where:{
//       email:email
//     }
//   });
//   if(adminUser.role!=="Admin"){
//       throw new Error("Only admin can access this route")
//   }else{
//     next();
//   }
// })
module.exports = {authMiddleware};
