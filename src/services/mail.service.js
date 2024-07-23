const config = require("../config/config");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { models } = require("../models/index.db");

const transporter = nodemailer.createTransport({
  service: config.mailConfig.service,
  auth: {
    user: config.mailConfig.user,
    pass: config.mailConfig.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//! Send the Email from Form /
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
      to: config.mailConfig.user,
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
      from: config.mailConfig.user,
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

//! Send the Confirmation Email /
const sendConfirmationMail = async (email, code) => {
  const filePath = path.join(
    __dirname,
    "../templates/confirmationTemplate.html"
  );
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = { email, code };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: config.mailConfig.user,
    to: email,
    subject: "Confirm your email address",
    html: htmlToSend,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error("Error sending confirmation email: " + error.message);
    }
    console.log("Email sent: " + info.response);
  });
};

//! Admin Notification Email /
const sendConfirmationAdminMail = async (email) => {
  try {
    const filePath = path.join(
      __dirname,
      "../templates/adminNotificationTemplate.html"
    );
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
;

    const replacements = { email };
    const htmlToSend = template(replacements);

    const mailOptions = {
      from: config.mailConfig.user,
      to: config.adminEmail,
      subject: "New User Registration Awaiting Approval",
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Error sending confirmation email: " + error.message);
      }
      console.log("Email sent: " + info.response);
    });

    return { message: "Notification email sent to admin successfully" };
  } catch (error) {
    throw new Error(
      "Error sending notification email to admin: " + error.message
    );
  }
};

module.exports = {
  sendMailService,
  sendConfirmationMail,
  sendConfirmationAdminMail,
};
