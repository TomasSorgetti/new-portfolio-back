require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/router");

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api", router);
server.use("/api/health", (req, res) => res.sendStatus(200));

// Middleware para manejar los errores
server.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: "Something went wrong",
    status: statusCode,
    message: err.message,
  });
});

server.listen(port, () => {
  console.log(`- - - - - - - - - - - - - - -`);
  console.log(`Server listening on port ${port}`);
  console.log(`- - - - - - - - - - - - - - -`);
});
