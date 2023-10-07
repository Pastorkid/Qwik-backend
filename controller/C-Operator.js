const Auth = require("../db/Auth");
const bcrypt = require("bcrypt");
const Operator = require("../db/Operator");
const Token = require("../configs/jwtToken");
const ErrorHandler = require("../utils/error-handler");
const OperatorService = require("../services/operator-service");
const OperatorDto = require("../dtos/operator-dto");

exports.Register = async (req, res, next) => {
  const {company_name, email_address, password} = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Operator({
      company_name,
      email_address,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({message: "Operator register suceesful"});
  } catch (error) {
    console.log(error);
  }
};
exports.Login = async (req, res) => {
  const {email_address, password} = req.body;
  const findUser = await Operator.findOne({email_address: email_address});
  try {
    const user = await Operator.findOne({
      email_address: email_address,
      // token: generateToken(findUser?._id),
    });

    if (!user) {
      return res.json({message: "Incorrect email"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({message: "inCorrect passord"});
    }
    const token = Token(user);
    return res
      .status(200)
      .json({token: token, message: "login succes fully done "});
  } catch (error) {
    console.log(error);
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

exports.getOperatorlist = async (req, res) => {
  const operator = await OperatorService.getOperators();
  if (!operator || operator.length < 1)
    return res.status(404).json({success: false, message: "No opeator found"});
  operator = operator.map((o) => {
    return new OperatorDto(o);
  });
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
