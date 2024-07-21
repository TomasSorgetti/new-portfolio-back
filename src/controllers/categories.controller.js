const services = require("../services/categories.service");

const getCategoriesController = async (req, res, next) => {
  try {
    const payload = await services.getAllCategories();
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const createCategoriesController = async (req, res, next) => {
  const { name } = req.body;

  try {
    const payload = await services.createCategories(name);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const updateCategoriesController = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  try {
    const payload = await services.updateCategories(name, id);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const deleteCategoriesController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await services.deleteCategories(id);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategoriesController,
  createCategoriesController,
  updateCategoriesController,
  deleteCategoriesController,
};
