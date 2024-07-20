const { Router } = require ("express");
const userRouter = require("./user.router");
const projectRouter = require("./project.router");
const authRouter = require("./auth.router");
const mailRouter = require("./mail.router");


const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/mail", mailRouter);


module.exports = router