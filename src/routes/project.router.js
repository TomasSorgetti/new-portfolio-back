const { Router } = require("express")
const controller = require("../controllers/project.controller")


const projectRouter = Router();

projectRouter.post("/", controller.createProject)


module.exports = projectRouter