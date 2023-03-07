const router = require("express").Router();
const {
  register,
  login,
  me,
  forgetPassword,
  resetCodeCheck,
  resetPassword,
} = require("../controllers/authController");
const AuthValidation = require("../middleware/Validations/authValidation");
const { tokenCheck } = require("../middleware/Token/auth");

router.post("/login", AuthValidation.login, login);
router.post("/register", AuthValidation.register, register);

router.get("/me", tokenCheck, me);

router.post("/forget-password", forgetPassword);

router.post("/reset-code-check", resetCodeCheck);

router.post("/reset-password", resetPassword);

module.exports = router;
