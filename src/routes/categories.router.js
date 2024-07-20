const { Router } = require("express");
const controller = require("../controllers/categories.controller");

const categoriesRouter = Router();

categoriesRouter.get("/", controller.getCategories);

module.exports = categoriesRouter;
