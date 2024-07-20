const config = require("../config/mailConfig");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: config.service,
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

const sendMailService = async (name, subject, email, message) => {
  try {
    const filePath = path.join(__dirname, "../templates/emailTemplate.html");
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = { name, subject, message };
    const htmlToSend = template(replacements);

    const mailOptions = {
      from: '"Portfolio" <' + email + ">",
      replyTo: email,
      to: config.user,
      subject: subject,
      text: message,
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);

    const filePathResend = path.join(
      __dirname,
      "../templates/graciasTemplate.html"
    );
    const sourceResend = fs.readFileSync(filePathResend, "utf-8").toString();
    const templateResend = handlebars.compile(sourceResend);
    const replacementsResend = { name, subject, message };
    const htmlToResend = templateResend(replacementsResend);
    await transporter.sendMail({
      from: config.user,
      to: email,
      subject: "Gracias por contactarte conmigo!",
      text: "Estaré revisando tu mensaje y te responderé a la brevedad.",
      html: htmlToResend,
    });

    return { message: "Correo enviado exitosamente" };
  } catch (error) {
    throw new Error("Error al enviar el correo: " + error.message);
  }
};

module.exports = { sendMailService };
