const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/routers/authRouter.js", "./src/routers/youtubeRouter.js", "./src/routers/index.js"];

swaggerAutogen(outputFile, endpointsFiles);
