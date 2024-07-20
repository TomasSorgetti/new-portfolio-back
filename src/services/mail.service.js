require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMailService = (name, subject, email, message) => {
  // Leer el template HTML
  const filePath = path.join(__dirname, "emailTemplate.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();

  // Compilar el template
  const template = handlebars.compile(source);
  const replacements = { name, subject, message };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: email,
    replyTo: email,
    to: process.env.MAIL_USER,
    subject: subject,
    text: message,
    html: htmlToSend,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error.message);
    }
    return info.response;
  });
};

module.exports = { sendMailService };
