const express = require("express");
const router = express().Router();
const CustomerController = require("../controller/C-Customer");

router.post("", CustomerController);
router.get("", CustomerController);
router.patch("", CustomerController);
router.delete("", CustomerController);
