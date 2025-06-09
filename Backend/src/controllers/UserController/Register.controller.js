const { body, matchedData } = require("express-validator");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const UserModel = require("../../models/User.model");

const RegisterController = [
  body("name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name_required"),
  body("email")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("email_required")
    .bail()
    .isEmail()
    .withMessage("email_invalid!"),
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("password_required!"),

  async (req, res) => {
    try {
      
      const data = matchedData(req);
      const user = await UserModel.findUserByEmail(data.email);
      if (user) {
        return apiResponseHelper.errorResponse(res, "Email already exists");
      }
      const userId = await UserModel.createUser(data);
      return apiResponseHelper.successResponseWithData(res, "User created", { id: userId, name: data.name, email: data.email });
    } catch (e) {
      console.log("error", e);
      return apiResponseHelper.errorResponse(res, "Server error");
    }
  },
];

module.exports = RegisterController;
