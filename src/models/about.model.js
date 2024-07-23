module.exports = (sequelize, Sequelize) => {
  const About = sequelize.define("about", {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description2: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    sistem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ide: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hobby: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    music: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return About;
};
