const { Router } = require("express");
const controller = require("../controllers/project.controller");
const validator = require("../middlewares/validateProject");
const projectRouter = Router();

//! ToDO - Add Admin Middleware
projectRouter.get("/", controller.getAllProjectsController);
projectRouter.get("/:id", controller.getProjectByIdController);
projectRouter.post(
  "/",
  validator.searchProject,
  controller.createProjectController
);
projectRouter.put("/:id", controller.updateProjectController);
projectRouter.delete("/:id", controller.deleteProjectController);

module.exports = projectRouter;
