const express = require("express");
const router = express().Router();
const CustomerController = require("../controller/C-Customer");

router.post("/user", CustomerController);
router.get("/serach", CustomerController.FlightSearch);

router.get("/price", CustomerController.calculateDistance);

router.delete("", CustomerController);
