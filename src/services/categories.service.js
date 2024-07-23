const HttpError = require("../errors/HttpError");
const { models } = require("../models/index.db");

const getAllCategories = async () => {
  const categories = await models.category.findAll();
  if (categories.length > 0) {
    return { error: false, message: "Categories found", categories };
  }
  throw new HttpError(404, "Categories not found or does not exists");
};

const createCategories = async (name) => {
  const category = await models.category.create({ name });
  if (category) {
    return { error: false, message: "Category created successfully", category };
  }
  throw new HttpError(400, "Category already exists or invalid name");
};
const deleteCategories = async (id) => {
  const category = await models.category.destroy({ where: { id } });
  if (category) {
    return { error: false, message: "Category deleted successfully" };
  }
  throw new HttpError(400, "Error deleting category");
};
const updateCategories = async (name, id) => {
  const category = await models.category.findOne({ where: { id } });
  if (!category) throw new HttpError(400, "Category does not exists");
  category.name = name;
  await category.save();
  return { error: false, message: "Category updated successfully", category };
};

module.exports = {
  getAllCategories,
  createCategories,
  deleteCategories,
  updateCategories,
};
