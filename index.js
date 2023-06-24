const { connectToMongoDB } = require("./src/db/connection");
const colors = require("colors");
const express = require("express");
const morgan = require("morgan");
const UserRoutes = require("./src/routes/user.routes");
require("dotenv").config({ path: "./.env" });

const {
  handleRouteNotFound,
  errorHandler,
} = require("./src/middlewares/error-handler");
const app = express();

// for Cross-Origin Resource Sharing (CORS)

const cors = require("cors");
app.use(cors());
app.options("*", cors());

// for Parsing incoming JSON data

app.use(express.json());

// to Log HTTP requests in the console

app.use(morgan("dev"));
app.use("/v1", UserRoutes);

app.use(handleRouteNotFound);
app.use(errorHandler);

// for Starting the server

app.listen(process.env.PORT, async () => {
  // Connect to MongoDB
  await connectToMongoDB();
  console.log(`Server is listening on port ${process.env.PORT}`.bgBlue.white);
});

