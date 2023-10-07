const express = require("express");
const router = express.Router();
const AdminController = require("../controller/C-Admin");

// router.post("/login", AdminController);
router.get("/get");
router.get("/margin", AdminController.AdminPrice);

//New routers of admin(new endpoint for new version development)

router.post("/resgister");
router.post("/login");
router.get("/distance");
router.get("/time");
router.post("/margin");
router.get("/totalCost");

module.exports = router;
