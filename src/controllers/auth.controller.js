const services = require("../services/auth.service");
const { serialize } = require('cookie')

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
    const tokens = await services.signInService(email, password)

    const serialized = serialize('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false, // Usa HTTPS en producción
      sameSite: 'lax', // O 'lax', segun tus necesidades
      maxAge: 60 * 60 * 24 * 30
      
    })
    
    res.setHeader('Set-Cookie', serialized); 

    res.status(200).json({ error: false, message: "Login successfully", token: tokens.token })
  } catch (error) {
    next(error);
  }
};
const refreshTokenController = async (req, res, next) => {
  const { refreshToken } = req.cookie

  try {
    const tokens = await services.refreshTokenService(refreshToken)
    res.cookie('refreshToken', tokens.refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Usa HTTPS en producción
  sameSite: 'strict' // O 'lax', según tus necesidades
});
    res.status(200).json({ error: false, message: "Refresh successfully", token: tokens.token });
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

module.exports = { signUp, signIn, refreshTokenController, confirmUser, confirmUserAdmin };
