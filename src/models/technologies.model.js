module.exports = (sequelize, Sequelize) => {
  const Technology = sequelize.define("technologies", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Technology;
};
