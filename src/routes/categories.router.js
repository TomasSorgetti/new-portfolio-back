const { Router } = require("express");
const controller = require("../controllers/categories.controller");
const validateTechnology = require("../middlewares/validateCategory");
const categoriesRouter = Router();

categoriesRouter.get("/", controller.getCategoriesController);

categoriesRouter.post(
  "/",
  validateTechnology,
  controller.createCategoriesController
);

categoriesRouter.put(
  "/:id",
  validateTechnology,
  controller.updateCategoriesController
);

categoriesRouter.delete(
  "/:id",
  validateTechnology,
  controller.deleteCategoriesController
);

module.exports = categoriesRouter;
