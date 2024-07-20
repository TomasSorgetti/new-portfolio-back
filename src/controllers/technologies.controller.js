const getTechnologies = async (req, res, next) => {
  try {
    const payload = "Get technologies";
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
module.exports = { getTechnologies };
