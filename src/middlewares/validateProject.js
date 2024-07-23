const { models } = require("../models/index.db");
const { HttpError } = require("../errors/HttpError");

const searchProject = async (req, res, next) => {
  const { title } = req.body;
  const project = await models.project.findOne({ where: { title } });
  if (project) throw new HttpError(404, "Project already exists");
  next();
};

module.exports = { searchProject };
