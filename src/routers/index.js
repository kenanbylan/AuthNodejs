const router = require("express").Router();

const multer = require("multer");
const upload = require("../middleware/Library/upload");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const auth = require("./authRouter");

router.use("/auth", auth);

router.post("/upload", function (req, res) {
  upload(req, res, function (error) {
    console.log("req.savedImages : ", req.savedImages);

    if (error instanceof multer.MulterError) {
      throw new APIError("Multer Error", error);
    } else if (error) {
      throw new APIError("Images file  not upload", error.message);
    } else {
      return new Response(
        req.savedImages,
        "Images file upload successfully"
      ).success(res);
    }
  });
});

module.exports = router;
