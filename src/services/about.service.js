const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");

const getAboutService = async () => {
  const about = await models.about.findOne();
  if (about) {
    return { error: false, message: "About found", about };
  }
  throw new HttpError(404, "About not found or does not exists");
};
const createAboutService = async (
  location,
  description,
  description2,
  sistem,
  ide,
  hobby,
  music
) => {
  const about = await models.about.findOne();
  if (about) throw new HttpError(400, "About already exists");
  const createAbout = await models.about.create({
    location,
    description,
    description2,
    sistem,
    ide,
    hobby,
    music,
  });
  return { error: false, message: "About created successfully", createAbout };
};
const updateAboutService = async (
  location,
  description,
  description2,
  sistem,
  ide,
  hobby,
  music
) => {
  const about = await models.about.findOne();
  if (!about) throw new HttpError(400, "About does not exists");
  about.location = location || about.location;
  about.description = description || about.description;
  about.description2 = description2 || about.description2;
  about.sistem = sistem || about.sistem;
  about.ide = ide || about.ide;
  about.hobby = hobby || about.hobby;
  about.music = music || about.music;
  await about.save();
  return { error: false, message: "About updated successfully", about };
};

module.exports = {
  getAboutService,
  createAboutService,
  updateAboutService,
};
