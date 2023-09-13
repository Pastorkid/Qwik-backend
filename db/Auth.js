const Mongoose=require("mongoose");


const UserSchema=new Mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    }
})
module.exports = mongoose.module("Auth", UserSchema);