const { Router } = require("express");
const controllers = require("../controllers/about.controller");
const middlewares = require("../middlewares/authToken");

const aboutRouter = Router();

aboutRouter.get("/", controllers.getAboutController);
aboutRouter.post("/", middlewares.authToken, controllers.createAboutController);
aboutRouter.put("/", middlewares.authToken, controllers.updateAboutController);

module.exports = aboutRouter;
