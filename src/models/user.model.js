module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    verifyCode: {
      type: Sequelize.INTEGER,
    },
    userVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    adminVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
