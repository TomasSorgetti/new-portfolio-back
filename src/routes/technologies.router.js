const { Router } = require("express");
const controller = require("../controllers/technologies.controller");
const validateTechnology = require("../middlewares/validateTechnologies");

const technologiesRouter = Router();

technologiesRouter.get("/", controller.getTechnologiesController);
technologiesRouter.post(
  "/",
  validateTechnology,
  controller.createTechnologyController
);
technologiesRouter.delete(
  "/:id",
  validateTechnology,
  controller.deleteTechnologyController
);

module.exports = technologiesRouter;
