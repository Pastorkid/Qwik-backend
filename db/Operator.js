const Mongoose = require("mongoose");

const OperatorSchema = new Mongoose.Schema({
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
  Operator_person: {
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
    unique:true,
  },
  charges_per_hour:{
    type:Number,
    required:true,
    unique:true,
  }
});

module.exports = Mongoose.model("Operator", OperatorSchema);
