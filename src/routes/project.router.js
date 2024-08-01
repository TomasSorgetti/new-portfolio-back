const { Router } = require("express");
const controller = require("../controllers/project.controller");
const validator = require("../middlewares/validateProject");
const {authToken} = require("../middlewares/authToken");
const projectRouter = Router();

//! ToDO - Add Admin Middleware
projectRouter.get("/", controller.getAllProjectsController);
projectRouter.get("/:id", controller.getProjectByIdController);
projectRouter.post(
  "/",authToken,
  validator.searchProject,
  controller.createProjectController
);
projectRouter.put("/:id", authToken, controller.updateProjectController);
projectRouter.delete("/:id", authToken, controller.deleteProjectController);

module.exports = projectRouter;
