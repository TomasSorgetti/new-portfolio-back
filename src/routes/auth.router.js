const { Router } = require("express")
const controller = require("../controllers/auth.controller")

const authRouter = Router();

authRouter.post("/signup", controller.signUp)
authRouter.post("/signin", controller.signIn)


module.exports = authRouter