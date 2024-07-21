const { models } = require("../models/index.db");

const getAllTechnologies = async () => {
  return await models.technology.findAll();
};

const createTechnology = async (name) => {
  const condition = await models.technology.create({ name });
  if (condition) {
    return { message: "Technology created successfully" };
  }
};

const deleteTechnology = async (id) => {
  const condition = await models.technology.destroy({ where: { id } });
  return { message: "Technology deleted successfully" };
};

module.exports = { createTechnology, getAllTechnologies, deleteTechnology };
