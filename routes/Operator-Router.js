const express = require("express");
const router = express.Router();
const OperatorController = require("../controller/C-Operator");
const {authMiddleware} = require("../middleware/authMiddleware");
const asyncMiddleware = require("../middleware/async-middleware");
// router.patch(
//   "/editaircraft",
//   OperatorController.login,
//   OperatorController.EditOperator
// );

// new router endpoints in new api (crud)
router.post("/register", asyncMiddleware(OperatorController.Register));
router.post("/login", asyncMiddleware(OperatorController.Login));
router.post(
  "/addAircraftdeatils",
  authMiddleware,
  asyncMiddleware(OperatorController.AddAircrafts)
);
router.get("/getOperatorlists", authMiddleware, asyncMiddleware(OperatorController.getOperatorlists));
// router.get("/getOperator", authMiddleware, OperatorController.getOperatorlist);
router.patch("/editdatils", authMiddleware, OperatorController.EditOperator);
router.delete(
  "/deleteAircraft",
  authMiddleware,
  OperatorController.DeleteOperator
);
module.exports = router;
