const { Router } = require("express")
const controller = require("../controllers/mail.controller")


const mailRouter = Router();

mailRouter.post("/", controller.sendMail)


module.exports = mailRouter