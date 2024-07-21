const { Router } = require("express");
const controller = require("../controllers/mail.controller");
const validateInput = require("../middlewares/validateInput");

const mailRouter = Router();

mailRouter.post("/", validateInput, controller.sendMail);

module.exports = mailRouter;
