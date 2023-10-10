const express = require("express");
const router = express.Router();
const AdminController = require("../controller/C-Admin");

const asyncMiddleware = require("../middleware/async-middleware");


router.post("/register", asyncMiddleware(AdminController.Register));

router.post("/login", asyncMiddleware(AdminController.Login));


module.exports = router;
