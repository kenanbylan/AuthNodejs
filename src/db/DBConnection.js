require("dotenv").config;

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/StockBackendAPI?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to Database : ", err);
  });

module.exports = mongoose;
