const { Router } = require("express");
const controllers = require("../controllers/about.controller");
const aboutRouter = Router();

aboutRouter.get("/", controllers.getAboutController);
aboutRouter.post("/", controllers.createAboutController);
aboutRouter.put("/", controllers.updateAboutController);

module.exports = aboutRouter;
