const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");

const login = async (req, res) => {
  return res.status(200).json({ message: "Login" });
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await Users.findOne({ email: email });

  if (checkUser) {
    throw new APIError("User already exists", 401);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt); //hash the password
  req.body.password = hashPassword;

  console.log(req.body.password);
  try {
    const userSave = new Users(req.body);

    await userSave
      .save()
      .then((response) => {
        return res.status(201).json({
          succes: true,
          data: response,
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
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
