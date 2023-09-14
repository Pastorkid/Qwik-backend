const express = require("express");
const router = express.Router();
const AuthController = require("../controller/C-Auth");


router.post("/register", AuthController.Register);
router.get("",)