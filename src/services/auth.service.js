const {
  secret,
  refreshSecret,
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
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: user.id }, refreshSecret, {
    expiresIn: "7d",
  });

  return { token, refreshToken };
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
    return { error: false, message: "Owner user created successfully" };
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
  await user.save();

  await mailService.sendConfirmationMail(email, code);
  await mailService.sendConfirmationAdminMail(email);

  return { error: false, message: "User created successfully" };
};

//! Refresh Token
const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) throw new HttpError(401, "No token provided");

  jwt.verify(refreshToken, refreshSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = jwt.sign({ id: user.id }, secret, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: user.id }, refreshSecret, { expiresIn: '7d' });

   return { token: newAccessToken, refreshToken: newRefreshToken };
  });

}


//! TODO Eliminar estas rutas y simplemente que el admin cree el usuario desde la dashboard
const confirmUserService = async (email, code) => {
  const user = await models.user.findOne({
    where: { email, code },
  });
  if (!user) throw new HttpError(400, "Wrong code or email");

  user.userVerified = true;
  user.verifyCode = null;
  await user.save();

  return { error: false, message: "User verified successfully" };
};
const confirmUserAdminService = async (email) => {
  const user = await models.user.findOne({
    where: { email },
  });
  if (!user) throw new HttpError(400, "Wrong email");

  user.adminVerified = true;
  await user.save();

  return { error: false, message: "User verified successfully" };
};

module.exports = {
  signUpService,
  signInService,
  refreshTokenService,
  confirmUserService,
  confirmUserAdminService,
};
