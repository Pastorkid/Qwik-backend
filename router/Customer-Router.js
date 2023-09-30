const express = require("express");
const router = express().Router();
const CustomerController = require("../controller/C-Customer");

router.post("/user", CustomerController);
router.get("/search", CustomerController.FlightSearch);

router.get("/price", CustomerController.calculateDistance);

router.delete("", CustomerController);

//New router endpoints for customer(endpoints)

router.post("/register",);
router.login("/login",);
router.post("searchAircraft",);
