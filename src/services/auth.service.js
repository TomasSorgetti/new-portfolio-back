const { secret } = require("../config/config");
const HttpError = require("../errors/HttpError");
const { models } = require("../models/index.db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInService = async (email, password) => {
  // Verificar si el usuario existe
  const user = await models.user.findOne({ where: { email } });
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
  const user = await models.user.create({ email, password: hashedPassword });
  if (!user) {
    throw new HttpError(400, "Error creating user");
  }
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: "1d",
  });
  return { error: false, message: "User created successfully", token };
};

module.exports = { signUpService, signInService };
