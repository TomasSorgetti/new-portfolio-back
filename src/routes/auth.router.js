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
authRouter.put("/confirm", controller.confirmUser);

//! ToDO - Add Admin Middleware
authRouter.put("/confirm-admin", controller.confirmUserAdmin);

module.exports = authRouter;
