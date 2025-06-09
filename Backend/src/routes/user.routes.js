const express = require("express");
const DeleteUserController = require("../controllers/UserController/DeleteUser.controller");
const FetchUserController = require("../controllers/UserController/FetchUser.controller");
const RegisterController = require("../controllers/UserController/Register.controller");
const UserFetchByTokenController = require("../controllers/UserController/UserFetchByToken.controller");
const UserFetchByIdController = require("../controllers/UserController/UserFetchById.controller");
const tokenVerifier = require("../middleware/tokenVerifiers.middleware");
const UpdateUserController = require("../controllers/UserController/UpdateUser.controller");


const userRoutes = express();

userRoutes.post("/create", RegisterController);
userRoutes.get("/fetch",tokenVerifier, FetchUserController);
userRoutes.get("/fetch-by-token",tokenVerifier, UserFetchByTokenController);
userRoutes.get("/fetch-by-id",tokenVerifier, UserFetchByIdController);
userRoutes.delete("/delete",tokenVerifier, DeleteUserController);
userRoutes.patch("/update", tokenVerifier, UpdateUserController);

module.exports = userRoutes;
