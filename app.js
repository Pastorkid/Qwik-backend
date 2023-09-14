const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//import of all model here

const Auth = require("./db/Auth");
const Customer = require("./db/Customer");
const Operator = require("./db/Operator");
const Admin = require("./db/Admin");

//imports all routers here

const AdminRouter = require("./router/Admin-Router");
const AuthRouter = require("./router/Auth-Router");
const CustomerRouter = require("./router/Customer-Router");
const OperatorRouter = require("./router/Operator-Router");

app.use(bodyparser.json({limit: "5mb"}));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Orgins,X-Requested-With,Content-type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

//verification
app.use(async (req, res, next) => {
  if (req.header["x-access-token"]) {
    try {
      const useraccesToken = req.headers["x-access-token"];
      let tempid;
      await user_session
        .findOne({where: {Token_Secret: useraccesToken}})
        .then((sres) => {
          if (sres) {
            const {ID, exp} = jwt.verify(
              sres.Token_Secret,
              "rightpasswordradiusfeb8"
            );
            tempid = ID;
            if (exp < Date.now().valueOf() / 1000) {
              return res.status(401).json({
                error: "JWT token has expired,please login obtain a new one",
              });
            }
          } else {
            return res.status(404).json({
              error: "Not found ,someone else must be using your account",
            });
          }
        });
      let result = await Auth.findByPk(tempid);
      result.save();
      res.locals.user = result.toJSON();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

app.use("/admin", AdminRouter);
app.use("/auth", AuthRouter);
app.use("/user",CustomerRouter);
app.use("/operator", OperatorRouter);

module.exports=app;