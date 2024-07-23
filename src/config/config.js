// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV || "development"}`,
// });
require("dotenv").config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const mailConfig = {
  service: process.env.MAIL_SERVICE,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};

const port = process.env.PORT || 8000;
const secret = process.env.SECRET;
const apiUrl = process.env.API_URL;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

module.exports = {
  dbConfig,
  mailConfig,
  port,
  secret,
  apiUrl,
  adminEmail,
  adminPassword,
};
