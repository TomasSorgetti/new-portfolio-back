const getCategories = async (req, res, next) => {
  try {
    const payload = "Get Categories";
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };
