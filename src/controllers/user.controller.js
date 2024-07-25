const service = require("../services/user.service");



const getUserController = async(req, res, next) => {
  const { id } = req.user

  try {
    const payload = await service.getUserByIdService(id)
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const getAllUsersController = async (req, res, next) => {
  try {
    const payload = await service.getAllUsersService()
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const createUserController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const payload = await service.createUserService(email, password)
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const updateUserController = async(req, res, next) => {
  const { email, previousPassword , password } = req.body;

  try {
    const payload = await service.updateUserService( email, previousPassword, password)
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};
const deleteUserController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await service.deleteUserService(id)
    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserController, getAllUsersController, createUserController, updateUserController, deleteUserController };
