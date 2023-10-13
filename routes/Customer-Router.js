const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/C-Customer");

// router.post("/user", CustomerController);
// router.get("/search", CustomerController.FlightSearch);

// router.get("/price", CustomerController.calculateDistance);

// router.delete("", CustomerController);

//New router endpoints for customer(endpoints)

router.post("/register", CustomerController.Register);
router.post("/login", CustomerController.Login);
// router.post("/calculateDistance", async (req, res) => {
//   try {
//     const origin = "New York"; // Replace with your origin location
//     const destination = "Los Angeles"; // Replace with your destination location

//     const response = await axios.get(
//       `https://aviapages.com/aviapages_api/calculateDistance?origin=${origin}&destination=${destination}`,
//       {
//         headers: {
//           Authorization: `Bearer qBEefU5YDGi7rSYKyJPGGjrR6FVm4MeyzcRo`,
//         },
//       }
//     );

//     // Parse the response and extract the distance
//     const distance = response.data.distance;
//     console.log(distance);
//     res.json({distance});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({error: "An error occurred"});
//   }
// });
// router.login("/login");
// router.post("searchAircraft");
module.exports = router;
