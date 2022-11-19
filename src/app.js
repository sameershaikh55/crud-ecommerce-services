const express = require("express");
var cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const errorMiddleware = require("./middleware/error");

// ROUTE IMPORT
const auth = require("./routes/auth");

// CONTROLLERS
app.use("/api", auth);

// Middleware for Errors
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(`Port running on ${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
