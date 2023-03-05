const multer = require("multer"); //dosya yükleme için kullanılır.
const fs = require("fs"); //dosya işlemleri için kullanılır.
const path = require("path");

const fileFilter = (request, file, cb) => {
  let alloedImageTypes = ["image/jpeg", "image/png", "image/jpg", "images/gif"];

  //reject a file
  if (!alloedImageTypes.includes(file.mimetype)) {
    //dosya tipi kontrolü yapıyoruz.
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
  }
  cb(null, true);
};

// Set up multer storage options
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("🚀 ~ file: upload.ts:11 ~ file", process.cwd());
//     cb(null, `${process.cwd()}/src/Images`);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const rootDir = path.dirname(require.main.filename); //main dosyasının bulunduğu dizini verir.
    //console.log("rootDir : ", rootDir);

    // fs.mkdirSync(path.join(rootDir, "/public/uploads"))({
    //   recursive: true,
    // }); //uploads dizini yoksa oluşturuyoruz.

    console.log("🚀 ~ file: upload.js:11 ~ file", process.cwd());
    cb(null, `${process.cwd()}/public/uploads`);
  }, //dosyaların kaydedileceği yer.

  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];

    if (!req.savedImages) {
      req.savedImages = [];
    }

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let url = `image_${uniqueSuffix}.${fileType}`;

    req.savedImages = [...req.savedImages, path.join(url)];

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
