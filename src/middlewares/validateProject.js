const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");
const fs = require("fs");
const path = require("path");

const searchProject = async (req, res, next) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!title || typeof title !== "string") {
      throw new HttpError(400, "Invalid Project name");
    }

    const project = await models.project.findOne({ where: { title } });

    if (project) {
      if (image) {
        const filePath = path.join("uploads", image);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error al eliminar el archivo:", err);
          }
        });
      }
      throw new HttpError(404, "Project already exists");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { searchProject };
