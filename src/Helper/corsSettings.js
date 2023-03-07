const acceptList = ["http://localhost:3000"];

const corsSettings = (req, callBack) => {
  let corsOptions;

  if (acceptList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callBack(null, corsOptions);
};

module.exports = corsSettings;
