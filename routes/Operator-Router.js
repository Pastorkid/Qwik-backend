const express = require("express");
const router = express.Router();
const OperatorController = require("../controller/C-Operator");
const asyncMiddleware = require("../middleware/async-middleware");

// router.patch(
//   "/editaircraft",
//   OperatorController.login,
//   OperatorController.EditOperator
// );

// new router endpoints in new api (crud)
router.post("/register", asyncMiddleware(OperatorController.Register));
router.post("/login", asyncMiddleware(OperatorController.Login));
router.post("/addAircraftdeatils", OperatorController.AddAircrafts);
router.patch("/editdatils");
router.delete("/deleteAircraft");
module.exports = router;
