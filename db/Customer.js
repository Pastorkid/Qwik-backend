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

module.exports = Mongoose.model("Customer", CustomerSchema);
