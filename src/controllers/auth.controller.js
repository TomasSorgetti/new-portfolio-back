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

module.exports = { signUp, signIn };
