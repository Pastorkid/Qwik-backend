const express = require("express");
const router = express.Router();
const OperatorController = require("../controller/C-Operator");

router.post("", OperatorController);
router.get("", OperatorController);
router.patch("", OperatorController);
router.delete("", OperatorController);
