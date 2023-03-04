const multer = require("multer");
const fs = require("fs");
const path = require("path");

const fileFilter = (request, file, cb) => {
  let alloedImageTypes = ["image/jpeg", "image/png", "image/jpg", "images/gif"];
  //reject a file

  if (!alloedImageTypes.includes(request.file.mimetype)) {
    //dosya tipi kontrolü yapıyoruz.
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootDir = path.dirname(require.main.filename); //main dosyasının bulunduğu dizini verir.
    console.log("rootDir : ", rootDir);

    fs.mkdirSync(path.join(`${rootDir}/public/uploads`, req.user._id), {
      recursive: true,
    }); //uploads dizini yoksa oluşturuyoruz.

    cb(null, path.join(`${rootDir}/public/uploads`));
  }, //dosyaların kaydedileceği yer.

  filename: (req, file, cb) => {
    const fileName = file.mimetype.split("/")[1];

    if (!req.savedImage) {
      req.savedImage = [];
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    let url = `image_${uniqueSuffix}.${fileName}`;

    req.savedImage = [...req.savedImage, path.join(`${url}`)];

    cb(null, url);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb
  },
  fileFilter: fileFilter,
}).array("images", 5); //aynı anda birden fazla dosya yüklemek için array kullanılır.

module.exports = upload;
