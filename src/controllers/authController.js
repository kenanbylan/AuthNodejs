const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middleware/Token/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });

  if (user) {
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      throw new APIError("Invalid password", 401);
    }

    createToken(user, res); // <---Token is created here and sent to the client
    //return new Response(user, "Login successfully").success(res);
  } else {
    throw new APIError("User not found", 401);
  }
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

const me = async (req, res) => {
  console.log("şuan authController.js deyim");

  //return Response(req.user, "User found").success(res);

  return new Response(req.user, "User found").success(res); //Success response 200 OK
};

module.exports = {
  login,
  register,
  me,
};
