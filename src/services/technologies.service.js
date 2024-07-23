const HttpError = require("../errors/HttpError");
const { models } = require("../models/index.db");

const getAllTechnologies = async () => {
  const technologies = await models.technology.findAll();
  if (technologies.length > 0) {
    return { error: false, message: "Technologies found", technologies };
  }
  throw new HttpError(404, "Technologies not found or does not exists");
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
