const router = require("express").Router();
const { getChannel } = require("../controllers/youtubeController");
router.post("/get-channel", getChannel);

module.exports = router;
