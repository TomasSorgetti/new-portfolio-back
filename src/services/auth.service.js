const {
  secret,
  apiUrl,
  adminEmail,
  adminPassword,
} = require("../config/config");
const HttpError = require("../errors/HttpError");
const { models } = require("../models/index.db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailService = require("./mail.service");

const signInService = async (email, password) => {
  // Verificar si el usuario existe
  const user = await models.user.findOne({
    where: { email, userVerified: true, adminVerified: true },
  });
  if (!user) throw new HttpError(400, "User do not exist");

  // Verificar la contraseña
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new HttpError(400, "Invalid password");

  // Generar token JWT
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: "1d",
  });

  return { error: false, message: "Login successfully", token };
};

const signUpService = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  //! owner user
  if (email === adminEmail && password === adminPassword) {
    const owner = await models.user.create({
      email,
      password: hashedPassword,
      userVerified: true,
      adminVerified: true,
    });
    if (!owner) {
      throw new HttpError(400, "Error creating owner user");
    }
  }

  //! user registration
  const user = await models.user.create({
    email,
    password: hashedPassword,
  });
  if (!user) {
    throw new HttpError(400, "Error creating user");
  }
  const code = Math.floor(100000 + Math.random() * 900000);
  user.verifyCode = code;
  user.save();

  await mailService.sendConfirmationMail(email, code);
  await mailService.sendConfirmationAdminMail(hashedEmail);

  return { error: false, message: "User created successfully" };
};

const confirmUserService = async (email, code) => {
  const user = await models.user.findOne({
    where: { email, code },
  });
  if (!user) throw new HttpError(400, "Wrong code or email");

  user.userVerified = true;
  user.verifyCode = null;
  user.save();

  return { error: false, message: "User verified successfully" };
};
const confirmUserAdminService = async (email) => {
  const user = await models.user.findOne({
    where: { email },
  });
  if (!user) throw new HttpError(400, "Wrong email");

  user.adminVerified = true;
  user.save();

  return { error: false, message: "User verified successfully" };
};

module.exports = {
  signUpService,
  signInService,
  confirmUserService,
  confirmUserAdminService,
};
