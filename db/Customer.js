const Mongoose = require("mongoose");
const CustomerSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Minimum password length is 8"],
  },
  contact_number: {
    type: String,
    unique: true,
  },
});


const CustomerFightTimeCalculationSchema = new Mongoose.Schema({
  departure_airport: {
    type: String,
    unique: true,
    required: true,
  },
 
  aircraft: {
    type: String,
    unique: true,
  },
  pax: {
    type: String,
    required: true,
  },
  airway_time: {
    type: Boolean,
    default: true,
  },
});

const TimeFlight = Mongoose.model("TimeFlight", CustomerFightTimeCalculationSchema);
const Customer=Mongoose.model("Customer", CustomerSchema);
module.exports = { Customer, TimeFlight};

