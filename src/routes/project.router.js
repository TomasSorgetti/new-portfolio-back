const { Router } = require("express");
const controller = require("../controllers/project.controller");

const projectRouter = Router();

//! ToDO - Add Admin Middleware
projectRouter.post("/", controller.createProject);

module.exports = projectRouter;
