const express = require("express");
const ResetTokenController = require("../controllers/AuthController/ResetToken.controller.js");

const SignInController = require("../controllers/AuthController/Signin.controller.js");

const authRoutes = express();

authRoutes.post("/login", SignInController);
authRoutes.post("/resetToken", ResetTokenController);

module.exports = authRoutes;
