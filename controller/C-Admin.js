const Admin = require("../db/Admin");
const bcrypt = require("bcrypt");
const Role=require("../db/role")
const generateToken=require("../configs/jwtToken");


exports.Register = async (req, res, next) => {
  const {email, password,   margin} = req.body;
  const role=Role.ADMIN
  console.log(req.body);


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const findAdmin = await Admin.findOne({
      email,
    });
    if (!findAdmin) {
      // create new Admin
      const newAdmin = new Admin({
        email,
        password: hashedPassword,
        margin,
        role:role
      });
      res.json(newAdmin);

    await newAdmin.save();
    res.status(201).json({ message: "Admin register suceesful" });
    } else {
      throw new Error("Admin already exist");
    }

  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const admin = await Admin.findOne({email });
   

    if (!admin) {
      return res.json({ message: "Incorrect email" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "inCorrect passord" });
    }
    if(admin && passwordMatch){
      res.json({
        id:admin?._id,
        email,
        password,
        token:generateToken(admin?._id)
      })
      // return res.status(200).json({ message: "login succes fully done " });
    }
 
  } catch (error) {
res.json({
  msg:error
})
  }
};