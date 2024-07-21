const { body, validationResult } = require("express-validator");

const validateInput = [
  // Validación y sanitización
  body("name")
    .isString()
    .withMessage("Input must be a string")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Input cannot be empty"),
  body("email")
    .isString()
    .withMessage("Input must be a string")
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("Input cannot be empty"),
  body("subject")
    .isString()
    .withMessage("Input must be a string")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Input cannot be empty"),
  body("message")
    .isString()
    .withMessage("Input must be a string")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Input cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateInput;
