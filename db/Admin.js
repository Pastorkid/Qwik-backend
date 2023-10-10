const Mongoose = require("mongoose");

const AdminSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  margin: {
    type: Number,
    required: true,
  },
  role:{
    type:String,
   required:true
  }
});


module.exports = Mongoose.model("Admin", AdminSchema);
