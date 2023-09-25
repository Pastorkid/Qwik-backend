const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

var corOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
  cookieSession({
    name: "sample-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello node API");
});
app.get("/blog", (req, res) => {
  res.send("Hello bog is running");
});
app.listen(3000, () => {
  console.log("node API app is running on port 3000");
});

mongoose.connect();
