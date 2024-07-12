const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const morgan = require("morgan");
require("./cronJob");

const { createServer } = require("http");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan("tiny")); // setup the logger
app.use(express.json({ limit: "30kb" })); // Parse incoming requests with JSON payloads.

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Hello World!",
    data: {
      link: "https://github.com/endeavourmonk/cors-proxy/blob/master/README.md",
    },
    timestamp: new Date().toLocaleString(),
  });
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Route not found",
    code: 500,
    data: {
      link: "https://github.com/endeavourmonk/cors-proxy/blob/master/README.md",
    },
    timestamp: new Date().toLocaleString(),
  });
});

// Global error Handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    code: err.status || 500,
    timestamp: new Date().toLocaleString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
