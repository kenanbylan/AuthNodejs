const router = require("express").Router();

const multer = require("multer");
const upload = require("../middleware/Library/upload");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const auth = require("./authRouter");

router.use("/auth", auth);

router.post("/upload", function (req, res) {
  upload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      throw new APIError("Multer Error", 400);
    } else if (error) {
      throw new APIError("Images file  not upload", 400);
    } else {
      //  return new Response({ req.savedImage ,"File upload Success", 200  });
    }
  });
});

module.exports = router;
// Path: src/routers/index.js
