const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/router");
const config = require("./config/config");
const db = require("./models/index.db");

const server = express();
const port = config.port || 8000;

// Middlewares
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
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


db.sequelize
  .sync({ force: false })
  .then(() => {
    server.listen(port, () => {
      console.log(`- - - - - - - - - - - - - - -`);
      console.log(`Server listening on port ${port}`);
      console.log(`- - - - - - - - - - - - - - -`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
