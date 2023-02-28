require("express-async-errors");
const express = require("express");
require("dotenv").config(); //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("./src/db/DBConnection"); //DBConnection.js
const router = require("./src/routers/index");
const app = express();
const port = process.env.PORT || 3001;

const errorHandlerMiddleware = require("./src/middleware/errorHandler");

//Middleware
app.use(express.json()); //Used to parse JSON bodies
app.use(express.json({ limit: "50mb" })); //Used to parse JSON bodies
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 })
); //Parse URL-encoded bodies

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello  Fuck ssWorld!");
});

//Error Handler Middleware
app.use(errorHandlerMiddleware);

// Path: app.js
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
