const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");
const { body, validationResult } = require("express-validator");

const validateSignUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Verificar si el usuario ya existe
    const user = await models.user.findOne({ where: { email } });
    if (user) {
      // Manejar el error de manera adecuada
      return next(new HttpError(400, "User already exists"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateUserValues = [
  // Validaciones
  // body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  // .matches(/\d/)
  // .withMessage("Password must contain a number")
  // .matches(/[a-z]/)
  // .withMessage("Password must contain a lowercase letter")
  // .matches(/[A-Z]/)
  // .withMessage("Password must contain an uppercase letter")
  // .matches(/[\W_]/)
  // .withMessage("Password must contain a special character"),

  // Middleware para manejar validaciones
  async (req, res, next) => {
    // Obtener resultados de validación
    const errors = validationResult(req);

    // Si hay errores de validación, devolver una respuesta de error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateSignIn = [
  // body("email")
  //   .exists()
  //   .withMessage("Email is required"),
  // .isEmail()
  // .withMessage("Invalid email format"),
  // body("password").exists().withMessage("Password is required"),

  async (req, res, next) => {
    // Obtener resultados de validación
    const errors = validationResult(req);

    // Si hay errores de validación, devolver una respuesta de error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = { validateSignUp, validateUserValues, validateSignIn };
