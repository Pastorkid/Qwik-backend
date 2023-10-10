const Mongoose = require("mongoose");

const OperatorSchema = new Mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});
const AircraftOPeratorSchema = new Mongoose.Schema({
  contact_number: {
    type: Number,
  },
  Aircraft_type: {
    type: String,
    enum: ["Challenger 605", "Learjet", "B200", "C90"],
  },
  Tail_sign: {
    type: String,
  },
  location: {
    type: String,
  },
  charges_per_hour: {
    type: Number,
  },
  speed: {
    type: Number,
  },
  date: {type: Date, default: Date.now},
});

const Operator = Mongoose.model("Operator", OperatorSchema);
const AircraftOPerator = Mongoose.model(
  "AircraftOPerator",
  AircraftOPeratorSchema
);
module.exports = {Operator, AircraftOPerator};
