const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");

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
  const userSave = new Users(req.body);

  await userSave
    .save()
    .then((data) => {
      return new Response(data, "User created successfully").created(res);
    })
    .catch((error) => {
      throw new APIError("User not created.", 401);
    });
};

module.exports = {
  login,
  register,
};
