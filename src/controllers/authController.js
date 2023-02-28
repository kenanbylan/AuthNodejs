const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { response } = require("express");

const login = async (req, res) => {
  return res.status(200).json({ message: "Login" });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email: email });

  if (checkUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt); //hash the password
  req.body.password = hashPassword;

  try {
    const userSave = new User({
      email,
      password,
    });

    await userSave
      .save()
      .then.then((repsonse) => {
        return res.status(201).json({
          succes: true,
          data: repsonse,
          message: "User created successfully",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          succes: false,
          data: error,
          message: "Something went wrong",
        });
      });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  login,
  register,
};
