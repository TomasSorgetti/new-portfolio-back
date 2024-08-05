const { models } = require("../models/index.db");
const HttpError = require("../errors/HttpError");

//! Get All Projects
const getAllProjectsService = async () => {
  const projects = await models.project.findAll({
    attributes: ["id", "title", "description", "image", "url"],
    include: [
      {
        model: models.technology,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        model: models.category,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
  if (projects.length > 0) {
    return { error: false, message: "Projects found", projects };
  }
  throw new HttpError(404, "Projects not found or does not exists");
};
//! Get Project By Id
const getAlProjectByIdService = async (id) => {
  const project = await models.project.findOne({
    where: { id },
    attributes: ["id", "title", "description", "image", "url"],
    include: [
      {
        model: models.technology,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        model: models.category,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });
  if (project) {
    return { error: false, message: "Project found", project };
  }
  throw new HttpError(404, "Project not found or does not exists");
};

//! Create Project
const createProjectService = async (
  title,
  description,
  image,
  url,
  technologyIds = [],
  categoryIds = []
) => {
  
  const project = await models.project.create({
    title,
    description,
    image,
    url,
  });
  if (!project) {
    throw new HttpError(400, "Error creating project");
  }
  if (categoryIds.length > 0) {
    await project.addCategories(categoryIds);
  }
  if (technologyIds.length > 0) {
    await project.addTechnologies(technologyIds);
  }

  return { error: false, message: "Project created successfully", project };
};

//! Update Project
const updateProjectService = async (
  id,
  title,
  description,
  image,
  url,
  technologyIds = [],
  categoryIds = []
) => {
  const project = await models.project.findByPk(id);
  if (!project) throw new HttpError(400, "Project does not exists");

  project.title = title || project.title;
  project.description = description || project.description;
  project.image = image || project.image;
  project.url = url || project.url;
  await project.save();
  console.log(technologyIds, categoryIds);

  if (technologyIds.length > 0) {
    console.log("Setting technologies:", technologyIds);
    await project.setTechnologies(technologyIds);
  }
  if (categoryIds.length > 0) {
    console.log("Setting categories:", categoryIds);
    await project.setCategories(categoryIds);
  }
  const updatedProject = await models.project.findByPk(id, {
    attributes: ["id", "title", "description", "image", "url"],
    include: [
      {
        model: models.category,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        model: models.technology,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });

  return {
    error: false,
    message: "Project updated successfully",
    updatedProject,
  };
};

//! Delete Project
const deleteProjectService = async (id) => {
  const project = await models.project.findOne({ where: { id } });
  if (!project) throw new HttpError(400, "Project does not exists");
  await project.destroy();
  return { error: false, message: "Project deleted successfully" };
};

module.exports = {
  getAllProjectsService,
  getAlProjectByIdService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
};
