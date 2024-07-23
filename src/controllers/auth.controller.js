const services = require("../services/auth.service");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const payload = await services.signUpService(email, password);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const payload = await services.signInService(email, password);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

const confirmUser = async (req, res, next) => {
  const { email, code } = req.body;
  try {
    const payload = await services.confirmUserService(email, code);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const confirmUserAdmin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const payload = await services.confirmUserAdminService(email);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, confirmUser, confirmUserAdmin };
