const createProject = (req, res, next) => {
  try {
    const payload = "Create Project";
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { createProject };
