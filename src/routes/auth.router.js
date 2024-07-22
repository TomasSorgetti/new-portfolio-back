const { Router } = require("express");
const controller = require("../controllers/auth.controller");
const validation = require("../middlewares/validateAuth");
const authRouter = Router();

authRouter.post(
  "/signup",
  validation.validateSignUp,
  validation.validateUserValues,
  controller.signUp
);
authRouter.post("/signin", controller.signIn);

module.exports = authRouter;
