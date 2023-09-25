const Mongoose = require("mongoose");

const OperatorSchema = new Mongoose.Schema({
  Id: {
    type: Number,
    required: true,
    unique: true,
  },
  company_name: {
    type: String,
    required: true,
    unique: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  contact_number: {
    type: Number,
    required: true,
    unique: true,
  },
  Aircraft_type: {
    type: String,
    required: true,
    enum: ["Challenger 605", "Learjet", "B200", "C90"],
  },
  Tail_sign: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  charges_per_hour: {
    type: Number,
    required: true,
    unique: true,
  },
  speed: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {type: Date, default: Date.now},
});

module.exports = Mongoose.model("Operator", OperatorSchema);
