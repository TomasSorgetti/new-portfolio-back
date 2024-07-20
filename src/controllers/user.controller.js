
const getUsers = async(req, res, next) => {
  try {
    const payload = "Get Users";
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers };
