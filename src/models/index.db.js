const { sequelize } = require("../db");
const { Sequelize } = require("sequelize");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

const models = {};

models.Sequelize = Sequelize;
models.sequelize = sequelize;

models.user = require("./user.model.js")(sequelize, Sequelize);
models.technology = require("./technologies.model.js")(sequelize, Sequelize);
models.category = require("./categories.model.js")(sequelize, Sequelize);
models.project = require("./project.model.js")(sequelize, Sequelize);
models.about = require("./about.model.js")(sequelize, Sequelize);

models.project.belongsToMany(models.category, {
  through: "category_project",
  foreignKey: "projectId",
  otherKey: "categoryId",
});
models.category.belongsToMany(models.project, {
  through: "category_project",
  foreignKey: "categoryId",
  otherKey: "projectId",
});

models.project.belongsToMany(models.technology, {
  through: "technology_project",
  foreignKey: "projectId",
  otherKey: "technologyId",
});
models.technology.belongsToMany(models.project, {
  through: "technology_project",
  foreignKey: "technologyId",
  otherKey: "projectId",
});

module.exports = { models };
