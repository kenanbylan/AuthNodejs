const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to Database : ", err);
  });

module.exports = mongoose;

// Path: src/db/DBConnection.js
