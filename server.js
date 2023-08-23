const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello node API");
});
app.get("/blog", (req, res) => {
  res.send("Hello bog is running");
});
app.listen(3000, () => {
  console.log("node API app is running on port 3000");
});

mongoose.connect(
 
);
