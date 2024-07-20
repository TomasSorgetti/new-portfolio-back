require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const { MAIL_SERVICE, MAIL_USER, MAIL_PASS } = process.env;

module.exports = {
  service: MAIL_SERVICE,
  user: MAIL_USER,
  pass: MAIL_PASS,
};
