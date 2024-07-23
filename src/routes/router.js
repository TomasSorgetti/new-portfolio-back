const { Router } = require("express");
const userRouter = require("./user.router");
const projectRouter = require("./project.router");
const authRouter = require("./auth.router");
const mailRouter = require("./mail.router");
const categoriesRouter = require("./categories.router");
const technologiesRouter = require("./technologies.router");
const aboutRouter = require("./about.router");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/projects", projectRouter);
router.use("/categories", categoriesRouter);
router.use("/technologies", technologiesRouter);
router.use("/mail", mailRouter);
router.use("/about", aboutRouter);

module.exports = router;
