
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
    type: Number,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
