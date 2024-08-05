const service = require("../services/project.service");

const getAllProjectsController = async (req, res, next) => {
  try {
    const payload = await service.getAllProjectsService();
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const getProjectByIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payload = await service.getAlProjectByIdService(id);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const createProjectController = async (req, res, next) => {
  const { title, description, url, technologyIds, categoryIds } = req.body;
  const image = req.file ? req.file.filename : null;
  console.log(title, description, url, image);
  try {
    const payload = await service.createProjectService(
      title,
      description,
      image,
      url,
      technologyIds,
      categoryIds
    );
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const updateProjectController = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image, url, technologyIds, categoryIds } = req.body;

  try {
    const payload = await service.updateProjectService(
      id,
      title,
      description,
      image,
      url,
      technologyIds,
      categoryIds
    );
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const deleteProjectController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await service.deleteProjectService(id);
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjectsController,
  getProjectByIdController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
};
