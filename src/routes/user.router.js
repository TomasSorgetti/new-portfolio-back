const { Router } = require("express")
const controller = require("../controllers/user.controller")


const userRouter = Router();

userRouter.get("/", controller.getUsers)


module.exports = userRouter