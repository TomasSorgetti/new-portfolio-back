const { Router } = require("express")
const controller = require("../controllers/user.controller")


const userRouter = Router();

userRouter.get("/", controller.getAllUsersController)
userRouter.get("/:id", controller.getUserController)
userRouter.post("/", controller.createUserController)
userRouter.put("/:id", controller.updateUserController)
userRouter.delete("/:id", controller.deleteUserController)


module.exports = userRouter