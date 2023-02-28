const router = require("express").Router();
const { register, login, me } = require("../controllers/authController");
const AuthValidation = require("../middleware/Validations/authValidation");
const { tokenCheck } = require("../middleware/Token/auth");

router.post("/login", AuthValidation.login, login);
router.post("/register", AuthValidation.register, register);

router.get("/me", tokenCheck, me);

module.exports = router;
