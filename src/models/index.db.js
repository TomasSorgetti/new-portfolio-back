const sequelize = require("../db");
const { Sequelize } = require("sequelize");

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

authenticate();
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// models.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
