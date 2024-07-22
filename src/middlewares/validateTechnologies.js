const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");
const { body, validationResult } = require("express-validator");

const validateTechnology = [
  // Validaciones generales
  body("name").isString().withMessage("Invalid technology name"),

  // Middleware de validación
  async (req, res, next) => {
    const errors = validationResult(req);

    // Si hay errores de validación, devolver una respuesta de error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const { id } = req.params;

    try {
      switch (req.method) {
        case "POST":
          // Validar si el nombre de la tecnología ya existe
          const existingTechnology = await models.technology.findOne({
            where: { name },
          });
          if (existingTechnology) {
            return next(new HttpError(400, "Technology already exists"));
          }
          break;

        case "DELETE":
          // Validar si la tecnología existe antes de eliminarla
          if (!id) {
            return next(new HttpError(400, "ID is required"));
          }
          const technology = await models.technology.findByPk(id);
          if (!technology) {
            return next(new HttpError(404, "Technology not found"));
          }
          break;

        default:
          // Manejo de métodos HTTP no permitidos
          return next(new HttpError(405, "Method Not Allowed"));
      }

      next();
    } catch (error) {
      next(error);
    }
  },
];

module.exports = validateTechnology;
