const { Sequelize } = require("sequelize");
const { dbConfig } = require("./config/config");

// postgres
// const sequelize = new Sequelize({
//   dialect: dbConfig.dialect,
//   host: dbConfig.host,
//   port: parseInt(dbConfig.port, 10),
//   username: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database,
// });
const sequelize = new Sequelize(
  `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
  { logging: false }
);

// mysql

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.user,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     port: dbConfig.port,
//     dialect: dbConfig.dialect,
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle,
//     },
//   }
// );

module.exports = { sequelize };
