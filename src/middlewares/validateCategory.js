const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");

const validateTechnology = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  // Validacion post
  if (req.method === "POST" && (!name || typeof name !== "string")) {
    return next(new HttpError(400, "Invalid Category name"));
  }
  if (req.method === "POST") {
    const existingCategory = await models.category.findOne({
      where: { name },
    });
    if (existingCategory) {
      return next(new HttpError(400, "Category already exists"));
    }
  }

  // Validacion put
  if (req.method === "PUT" && (!name || typeof name !== "string")) {
    return next(new HttpError(400, "Invalid Category name"));
  }
  if (req.method === "PUT" && !id) {
    return next(new HttpError(400, "ID is required"));
  }
  if (req.method === "PUT") {
    const existingCategory = await models.category.findOne({
      where: { id },
    });
    if (!existingCategory) {
      return next(new HttpError(400, "Category does not exists"));
    }
  }

  // Validacion delete
  if (req.method === "DELETE") {
    const category = await models.category.findByPk(id);
    if (!category) {
      return next(new HttpError(404, "Category not found"));
    }
  }

  next();
};

module.exports = validateTechnology;
