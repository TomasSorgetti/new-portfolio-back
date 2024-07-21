require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
const mailConfig = {
  service: process.env.MAIL_SERVICE,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};

module.exports = {
  dbConfig,
  mailConfig,
};
