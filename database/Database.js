const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://binddigvijay1234:Digvijay1234@cluster0.xtqlioi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect Suucessfully");
  })
  .catch((err) => {
    console.log("err", err);
  });

module.exports = mongoose;
