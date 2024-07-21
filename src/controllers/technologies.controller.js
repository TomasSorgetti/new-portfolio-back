const services = require("../services/technologies.service");

const getTechnologiesController = async (req, res, next) => {
  try {
    const payload = await services.getAllTechnologies();
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

const createTechnologyController = async (req, res, next) => {
  const { name } = req.body;
  try {
    const payload = await services.createTechnology(name);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const deleteTechnologyController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await services.deleteTechnology(id);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTechnologiesController,
  createTechnologyController,
  deleteTechnologyController,
};
