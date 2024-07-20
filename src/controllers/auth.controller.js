const signUp = async (req, res, next) => {
  try {
    const payload = "Sign Up";
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const signIn = async (req, res, next) => {
  try {
    const payload = "Sign In";
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
