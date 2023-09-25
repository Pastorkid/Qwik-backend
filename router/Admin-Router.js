const express = require("express");
const router = express.Router();
const AdminController = require("../controller/C-Admin");

router.post("/login", AdminController);
router.get("/get", );
router.get("/margin", AdminController.AdminPrice);
