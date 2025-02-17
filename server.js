const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const axios = require("axios");
const OperatorRouter = require("./routes/Operator-Router");
const CustomerRouter = require("./routes/Customer-Router");
const AdminRouter = require("./routes/Admin-Router");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error-middleware");
const dotenv = require("dotenv");
require("./database/Database");
dotenv.config();
const CustomerController=require("./controller/C-Customer")

// var corOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corOptions));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.use(
  cookieSession({
    name: "sample-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);
const corsOption = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8000",
  ],
};
app.use(cors(corsOption));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello node API");
});


app.post('/calculateFlightTime', async (req, res) => {
  const requestData = {
    departure_airport: req.body.departure_airport,
    arrival_airport:req.body.arrival_airport,
    aircraft: req.body.aircraft,
    airway_time: req.body.airway_time,
    great_circle_distance:true, 
    advise_techstop:true
  };

  try {
    // Call the Aviapages API to calculate flight time using requestData
    const flightTime = await CustomerController.calculateFlightTime(requestData);

    res.json(flightTime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function getAllAirports() {
  let allAirports = [];
  let nextPage = 'https://dir.aviapages.com/api/airports/';

  while (nextPage) {
    try {
      const response = await axios.get(nextPage, {
        headers: {
          'accept': 'application/json',
          'Authorization':process.env.AVID_API_TOKEN, // Replace 'your_token_here' with your actual token
        },
      });

      if (response.status === 200) {
        const pageData = response.data.results;
        allAirports = allAirports.concat(pageData);
        nextPage = response.data.next;
      } else {
        console.error('Failed to fetch airport data');
        break;
      }
    } catch (error) {
      console.error('Error fetching airport data');
      break;
    }
  }

  return allAirports;
}

app.get('/all-airports', async (req, res) => {
  try {
    const airports = await getAllAirports();
    res.json(airports.map(airport => ({
      city_name: airport.city_name,
      icao: airport.icao,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching airport data' });
  }
});

async function getAllCrafts() {
  let allAirCrafts = [];
  let nextPage = 'https://dir.aviapages.com/api/aircraft/';

  while (nextPage) {
    try {
      const response = await axios.get(nextPage, {
        headers: {
          'accept': 'application/json',
          'Authorization': process.env.AVID_API_TOKEN,
        },
      });

      if (response.status === 200) {
        const pageData = response.data.results;
        allAirCrafts = allAirCrafts.concat(pageData);
        nextPage = response.data.next;
      } else {
        console.error('Failed to fetch aircraft data');
        break;
      }
    } catch (error) {
      console.error('Error fetching aircraft data');
      break;
    }
  }

  return allAirCrafts;
}

app.get('/all-airCrafts', async (req, res) => {
  try {
    const aircraft = await getAllCrafts();
    // Filter the aircraft data
    const filteredAircraft = aircraft.filter(aircraft => (
      aircraft.aircraft_type_name === "Challenger 605" ||
      aircraft.aircraft_type_name === "Learjet" ||
      aircraft.aircraft_type_name === "B200" ||
      aircraft.aircraft_type_name === "C90"
    ));

    res.json(filteredAircraft.map(aircraft => ({
      aircraft_id: aircraft.aircraft_id,
      aircraft_type_name: aircraft.aircraft_type_name,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching aircraft data' });
  }
});

// app.get("/calculateDistance", async (req, res) => {
//   let data =
//     '{"departure_airport": "VABB", "arrival_airport": "OMDB", "aircraft": "Learjet 25", "airway_time_weather_impacted": true,"airport":true,"great_circle_distance":true, "advise_techstop":true}\r\n';
//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://frc.aviapages.com/flight_calculator/",
//     headers: {
//       "Content-Type": "text/plain",
//       Authorization: "Token qBEefU5YDGi7rSYKyJPGGjrR6FVm4MeyzcRo",
//     },
//     data: data,
//   };
//   axios
//     .request(config)
//     .then((response) => {
//       console.log(response.data);
//       const data = response.data;

//       console.log("data", data);
//       const miles = data / 1.852;
//       console.log(" nauticles miles", miles);
//       const techHalts = miles / 1800;
//       console.log(techHalts);
//       const time_aircraft = miles / 464;
//       const total_time = 1;
//       const total_flying = time_aircraft + total_time;
//       const TotalPrice_operator = total_flying * 250000;
//       const MarginPrice =
//         (TotalPrice_operator + TotalPrice_operator * 0.05) * 2;

//       console.log("total", MarginPrice);

//       // const result = data / 60;
//       // const finalPrice = result * 120000;
//       // const marginPrice = finalPrice + finalPrice * 0.05;
//       // const customerPrice = marginPrice + finalPrice;
//       console.log(JSON.stringify(customerPrice));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   let data1 =
//     '{"departure_airport": "VABB", "arrival_airport": "KSWF", "aircraft": "Learjet 25", "airway_time_weather_impacted": true,"airport":true,"great_circle_distance":true, "advise_techstop":true}\r\n';
//   let config1 = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://frc.aviapages.com/flight_calculator/",
//     headers: {
//       "Content-Type": "text/plain",
//       Authorization: "Token qBEefU5YDGi7rSYKyJPGGjrR6FVm4MeyzcRo",
//     },
//     data: data1,
//   };
//   axios
//     .request(config1)
//     .then((response) => {
//       console.log(response.data);
//       const data1 = response.data;

//       console.log("data", data1);
//       const miles1 = data / 1.852;
//       console.log(" nauticles miles", miles1);
//       const techHalts1 = miles / 1800;
//       console.log(techHalts1);
//       const time_aircraft1 = miles / 464;
//       const total_time = 1;
//       const total_flying = time_aircraft1 + total_time;
//       const TotalPrice_operator = total_flying * 250000;
//       const MarginPrice =
//         (TotalPrice_operator + TotalPrice_operator * 0.05) * 2;

//       console.log("total", MarginPrice);

//       // const result = data / 60;
//       // const finalPrice = result * 120000;
//       // const marginPrice = finalPrice + finalPrice * 0.05;
//       // const customerPrice = marginPrice + finalPrice;
//       console.log(JSON.stringify(customerPrice));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.get("/calculateDistance", async (req, res) => {
  try {
    const apiResponse = await CustomerController.calculateDistance();
    const calculatedValues = CustomerController.calculateValues(apiResponse);
    // Send the calculated values as a JSON response
    res.json(calculatedValues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/blog", (req, res) => {
  res.send("Hello bog is running");
});
app.use("/customer", CustomerRouter);
app.use("/operator", OperatorRouter);
app.use("/admin", AdminRouter);
// app.use("/operator");
// app.use("/customer");
// app.use("/admin");
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("node API app is running on port 3000");
});
