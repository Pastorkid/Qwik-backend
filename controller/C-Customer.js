const Operator = require("../db/Operator");
const {Customer} = require("../db/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const axios = require('axios');
const { buildRequestConfig } = require('../configs/aviapi.config');

exports.Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {email, password, contact_number} = req.body;

  try {
    const existingUser = await Customer.findOne({email});

    if (existingUser) {
      return res.status(400).json({message: "User is already exist"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Customer({
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({message: "User register succesfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

exports.Login = async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);
  try {
    const user = await Customer.findOne({email});

    if (!user) {
      return res.status(401).json({message: "Customer not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({message: "Authcation is failed"});
    }

    const token = jwt.sign({userId: user._id}, "auth", {
      expiresIn: "1d",
    });

    res.json({token});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal server Error"});
  }
};
// exports.Authorization=async(req,res)=>{
//   const token=req.header("Authorization");

//   if(!token){
//     return res.status(401).json({message:'Authcation failed'})
//   }
//   try{
//     const decoded=jwt.verify(token,"auth");
//     res.json({message:'You have access to this autherzation'})
//   }catch(error){
//     console.log(error);
//     res.status(401).json({message:"Authnication is failed"})
//   }
// }




exports.calculateFlightTime=async(data)=> {
  try {
    const response = await axios(buildRequestConfig(data));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate flight time');
  }
}


// exports.FlightSearch = async (req, res) => {
//   const {from, to, date} = req.query;

//   const results = flights.filter((flight) => {
//     return (
//       flight.from.toLowerCase() == from.toLowerCase() &&
//       flight.to.toLowerCase() === to.toLowerCase() &&
//       flight.date === date
//     );
//   });

//   res.json(results);
// };
// exports.calculateDistance = async (lat1, lon1, lat2, lon2) => {
//   const earthRadius = 6371;
//   const dLat = (lat2 - lat1) * (MATH.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(Lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = earthRadius * c;
//   return distance;
// };



// exports.PriceCalcultor = async (req, res) => {
//   try {
//     const {aircraftType, origin, destination} = req.body;
//     const aircraft = await Operator.findOne({type: aircraftType});
//     if (!aircraft) {
//       return res.status(404).json({error: "Aircraft not found"});
//     }

//     const distance = calculateDistance(
//       origin.latitude,
//       origin.longitude,
//       destination.latitude,
//       destination.longitude
//     );
//     const totalPrice = aircraft.hourlyRate * (distance / aircraft.speed);

//     res.json({totalPrice});
//   } catch (error) {
//     res.status(500).json({error: "Internal server error"});
//   }
// };

// exports.AdminPrice = async (req, res) => {
//   try {
//     const calculatePriceResponse = await PriceCalcultor();
//     console.log(calculatePriceResponse);

//     if (!calculatePriceResponse.ok) {
//       return res.status(500).json({error: "error calculating"});
//     }

//     const {totalPrice} = await calculatePriceResponse.json();

//     const discountAmount = totalPrice * 0.05;
//     console.log(discountAmount);

//     req.json({discountAmount});
//   } catch (error) {
//     res.status(500).json({error: "Internal server error"});
//   }
// };




// Function to make the Aviapages API request
// exports.calculateDistance=async ()=> {
//   const data = '{"departure_airport": "VABB", "arrival_airport": "OMDB", "aircraft": "Learjet 25", "airway_time_weather_impacted": true, "airport": true, "great_circle_distance": true, "advise_techstop": true}\r\n';
//   const config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://frc.aviapages.com/flight_calculator/",
//     headers: {
//       "Content-Type": "text/plain",
//       Authorization: "Token qBEefU5YDGi7rSYKyJPGGjrR6FVm4MeyzcRo",
//     },
//     data:data
//   };
//   try {
//     const response = await axios(config);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to make API request');
//   }
// }


// exports.calculateValues=(apiResponse) =>{
//   const miles = apiResponse / 1.852;
//   const techHalts = miles / 1800;
//   const time_aircraft = miles / 464;
//   const total_time = 1;
//   const total_flying = time_aircraft + total_time;
//   const TotalPrice_operator = total_flying * 250000;
//   const MarginPrice = (TotalPrice_operator + TotalPrice_operator * 0.05) * 2;

//   return {
//     miles,
//     techHalts,
//     time_aircraft,
//     total_time,
//     total_flying,
//     TotalPrice_operator,
//     MarginPrice,
//   };
// }


