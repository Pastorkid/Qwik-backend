const express = require("express");
const router = express.Router();
const OperatorController = require("../controller/C-Operator");

router.post("/register", OperatorController.Signup);
router.get("/login", OperatorController.login);
router.post(
  "/addAircraft",
  OperatorController.login,
  OperatorController.AddAircrafts
);
router.patch(
  "/editaircraft",
  OperatorController.login,
  OperatorController.EditOperator
);
router.delete(
  "/deleteaircrafts",
  OperatorController.login,
  OperatorController.delete
);


//new router endpoints in new api (crud)
router.post("/register",);
router.post("/login");
router.post("/addAircraftdeatils");
router.patch("/editdatils",);
router.delete("/deleteAircraft");

