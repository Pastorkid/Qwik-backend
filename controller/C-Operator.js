const Auth = require("../db/Auth");
const bcrypt = require("bcrypt");
const {Operator,AircraftOPerator}= require("../db/Operator");
const Token = require("../configs/jwtToken");
const ErrorHandler = require("../utils/error-handler");
const OperatorService = require("../services/operator-service");
const OperatorDto = require("../dtos/operator-dto");
const generateToken=require("../configs/jwtToken")

exports.Register = async (req, res, next) => {
  const { company_name, email_address, password } = req.body;
  console.log(req.body);


  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const findOperator = await Operator.findOne({
      email_address,
    });
    if (!findOperator) {
      // create new operator
      const newUser = new Operator({
        company_name,
        email_address,
        password: hashedPassword,
      });
      res.json(newUser);

    await newUser.save();
    res.status(201).json({ message: "Operator register suceesful" });
    } else {
      throw new Error("Operator already exist");
    }

  } catch (error) {
    console.log(error);
  }
};


exports.Login = async (req, res) => {
  const { email_address, password } = req.body;
 
  try {
    const user = await Operator.findOne({email_address });
   

    if (!user) {
      return res.json({ message: "Incorrect email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ message: "inCorrect passord" });
    }
    if(user && passwordMatch){
      res.json({
        id:user?._id,
        email_address,
        password,
        token:generateToken(user?._id)
      })
      return res.status(200).json({ message: "login succes fully done " });
    }
 
  } catch (error) {

  }
};
exports.AddAircrafts = async (req, res, next) => {
  console.log(req.body);

  const AirOperator = {
    Aircraft_type: req.body.Aircraft_type,
    Tail_sign: req.body.Tail_sign,
    location: req.body.location,
    charges_per_hour: req.body.charges_per_hour,
    speed: req.body.speed
  };
  console.log(AirOperator);

  if (!AirOperator) {
    return next(new ErrorHandler("All field is required", 400));
  }
  const operator = await OperatorService.createOperator(AirOperator);
  operator.save();
  return res.json({
    success: true,
    message: "Operator has beedn added Succesfully",
    statusCode: "201",
    data: new OperatorDto(operator),
  });
};

exports.getOperatorlists = async (req, res) => {

  const operator = await OperatorService.getOperators();
  // if (!operator || operator.length < 1)
  //   return res.status(404).json({success: false, message: "No opeator found"});
  // operator = operator.map((o) => {
  //   return new OperatorDto(o);
  // });
  res.json({succes: true, message: "operator List found", data: operator});
};
exports.EditOperator = async (req, res) => {
  const _id = req.params.cardId;
  const body = req.body;

  const AirOperator = {
    Aircraft_type: req.body.Aircraft_type,
    Tail_sign: req.body.Tail_sign,
    location: req.body.location,
    charges_per_hour: req.body.charges_per_hour,
    speed: req.body.speed,
    date: req.body.date,
  };
  console.log(AirOperator);

  const operator = await OperatorService.updateOperator({_id}, AirOperator);
  operator.save();

  res.status(200).json({succes: true, message: "Operator is updated"});
};
exports.DeleteOperator = async (req, res) => {};
