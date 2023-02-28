const router = require("express").Router();

const auth = require("./authRouter");

router.use("/auth", auth);

module.exports = router;
// Path: src/routers/index.js
