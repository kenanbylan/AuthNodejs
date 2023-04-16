require("express-async-errors");
const express = require("express");
require("dotenv").config(); //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("./src/db/DBConnection"); //DBConnection.js
const router = require("./src/routers/index");
const app = express();
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize"); //mongoDb güvenlik açığı için kullanılır.
const momentTimezone = require("moment-timezone"); //Tarih ve saat işlemleri için kullanılır.
const port = process.env.PORT || 8080;
// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API description",
    },
  },

  // apis: ["./routes/*.js"], // API yollarınızın yolunu belirtin
  apis: ["./routers/*.js", "./routers/**/*.js"],
};

//saat dilimi ayarları tam olarak 3 saat geriden geliyor. Bu yüzden 3 saat ekledim.
momentTimezone.tz.setDefault("Europe/Istanbul"); //Tarih ve saat işlemleri için kullanılır.

//Cors İmplementing
const cors = require("cors");
const corsSettings = require("./src/Helper/corsSettings");

const errorHandlerMiddleware = require("./src/middleware/errorHandler");

//Rate Limiting Implementing
const rateLimit = require("./src/middleware/ApiRateLimit/rateLimit");

app.use(express.json()); //Used to parse JSON bodies
app.use(express.json({ limit: "50mb" })); //Used to parse JSON bodies
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 })); //Parse URL-encoded bodies

//Middleware
app.use(express.static(path.dirname(__dirname, "/public")));
app.use("/public", express.static(__dirname));

//Cors ayarları implemente edildi.
app.use(cors(corsSettings)); //Cors ayarları implemente edildi.
app.use(cors()); //Cors ayarları implemente edildi. (Bu şekilde de kullanılabilir.

//Rate Limiting
app.use("/api", rateLimit);

//Error Handler Middleware
app.use(errorHandlerMiddleware);

//MongoDB Sanitize
// app.use(
//   mongoSanitize({
//     allowDots: true,
//     replaceWith: "_",
//   })
// );

app.use("/api", router);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("Hello World! My Api");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
