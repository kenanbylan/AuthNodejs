const acceptList = ["http://localhost:3000"];

const corsSettings = (req, callBack) => {
  //  console.log("cors header :", req.header("Origin"));

  let corsOptions;

  if (acceptList.indexOf(req.header("Origin")) !== -1) {
    console.log("if corsSettings.js içindeyim");
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
    console.log("else corsSettings.js içindeyim");
  }

  callBack(null, corsOptions);
};

module.exports = corsSettings;
