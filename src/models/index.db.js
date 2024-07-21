const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

// models.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = { conn: models };
