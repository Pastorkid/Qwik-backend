const express = require("express");
const router = express.Router();
const OperatorController = require("../controller/C-Operator");


router.patch(
  "/editaircraft",
  OperatorController.login,
  OperatorController.EditOperator
);


// new router endpoints in new api (crud)
router.post("/register", OperatorController.Register);
router.post("/login", OperatorController.Login);
router.post("/addAircraftdeatils",);
router.patch("/editdatils",);
router.delete("/deleteAircraft",);
module.exports = router;
