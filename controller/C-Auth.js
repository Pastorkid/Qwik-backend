const Auth = require("../db/Auth");
const bcrypt = require("bcrypt");

exports.Register = async (req, res, next) => {
  const {username, email, password} = req.body;

  //Hash the password

  const hashedPassword = await bcrypt.hash(password, 10);

  //Create a new user

  const user = new Auth({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).send("user register succesfully");
  } catch (error) {
    res.status(500).send("error registering user");
  }
};
