const router = require("express").Router();

const { register, login } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
