const { models } = require("../models/index.db");

const getAllCategories = async () => {
  return await models.category.findAll();
};

const createCategories = async (name) => {
  const condition = await models.category.create({ name });
  if (condition) {
    return { message: "Category created successfully" };
  }
};
const deleteCategories = async (id) => {
  const condition = await models.category.destroy({ where: { id } });
  if (condition) {
    return { message: "Category deleted successfully" };
  }
};
const updateCategories = async (name, id) => {
  const condition = await models.category.update({ name }, { where: { id } });
  if (condition) {
    return { message: "Category updated successfully" };
  }
};

module.exports = {
  getAllCategories,
  createCategories,
  deleteCategories,
  updateCategories,
};
