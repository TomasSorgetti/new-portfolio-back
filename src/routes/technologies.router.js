const { Router } = require("express");
const controller = require("../controllers/technologies.controller");

const technologiesRouter = Router();

technologiesRouter.get("/", controller.getTechnologies);

module.exports = technologiesRouter;
