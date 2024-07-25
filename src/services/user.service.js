const {models} = require("../models/index.db");
const HttpError = require("../errors/HttpError");
const bcrypt = require("bcrypt");



const getUserByIdService = async (id) => {
    const user = await models.user.findOne({ where: { id } });
    if (!user) throw new HttpError(400, "User does not exists");
    return { error: false, message: "User found", user };
};


const getAllUsersService = async () => {
    const users = await models.user.findAll();
    if (users.length == 0) throw new HttpError(404, "Users not found or does not exists");
    return { error: false, message: "Users found", users };
};


const createUserService = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await models.user.create({ email, password: hashedPassword });
    if (!user) throw new HttpError(400, "Error creating user");
    return { error: false, message: "User created successfully" };
};


const updateUserService = async (email, previousPassword, password) => {
    const user = await models.user.findOne({ where: { email } });
    if (!user) throw new HttpError(400, "User does not exists");

    const match = await bcrypt.compare(previousPassword, user.password);
    if (!match) throw new HttpError(400, "Invalid password");
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    return { error: false, message: "Password updated successfully" };
};


const deleteUserService = async (id) => {
    const user = await models.user.findOne({ where: { id } });
    if (!user) throw new HttpError(400, "User does not exists");
    await user.destroy();
    return { error: false, message: "User deleted successfully" };
};


module.exports = {
    getUserByIdService,
    getAllUsersService,
    createUserService,
    updateUserService,
    deleteUserService,
}