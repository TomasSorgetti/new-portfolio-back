const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");

const validateTechnology = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  // Validacion post
  if (req.method === "POST" && (!name || typeof name !== "string")) {
    return next(new HttpError(400, "Invalid technology name"));
  }
  if (req.method === "POST") {
    const existingTechnology = await models.technology.findOne({
      where: { name },
    });
    if (existingTechnology) {
      return next(new HttpError(400, "Technology already exists"));
    }
  }

  // Validacion delete
  if (req.method === "DELETE") {
    const technology = await models.technology.findByPk(id);
    if (!technology) {
      return next(new HttpError(404, "Technology not found"));
    }
  }

  next();
};

module.exports = validateTechnology;
