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
