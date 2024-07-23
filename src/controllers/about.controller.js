const services = require("../services/about.service");

const getAboutController = async (req, res, next) => {
  try {
    const payload = await services.getAboutService();
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const createAboutController = async (req, res, next) => {
  const { location, description, description2, sistem, ide, hobby, music } =
    req.body;
  try {
    const payload = await services.createAboutService(
      location,
      description,
      description2,
      sistem,
      ide,
      hobby,
      music
    );
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const updateAboutController = async (req, res, next) => {
  const { location, description, description2, sistem, ide, hobby, music } =
    req.body;

  try {
    const payload = await services.updateAboutService(
      location,
      description,
      description2,
      sistem,
      ide,
      hobby,
      music
    );
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAboutController,
  createAboutController,
  updateAboutController,
};
