const router = require("express").Router();

const { register, login } = require("../controllers/authController");

const AuthValidation = require("../middleware/Validations/authValidation");
router.post("/login", AuthValidation, login);
router.post("/register", AuthValidation.register, register);

module.exports = router;
