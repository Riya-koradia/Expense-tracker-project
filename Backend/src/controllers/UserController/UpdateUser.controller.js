const { body } = require("express-validator");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const UserModel = require("../../models/User.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const UpdateUserController =[
    body("id")
        .notEmpty()
        .withMessage("User ID is required"),
    body("name")
        .notEmpty({ ignore_whitespace: true })
        .withMessage("User name is required"),
    body("email")
        .optional()
        .isEmail()
        .withMessage("email is required"),
async (req, res) => {
    try {
      const { id, name } = req.body;

      const updated = await UserModel.updateUser(id, { name });
      if (updated) {
        return apiResponseHelper.successResponse(res, "User updated");
      }
      return apiResponseHelper.errorResponse(res, "Failed to update user");
    } catch (err) {
      console.error("UpdateUser Error:", err);
      return apiResponseHelper.errorResponse(res, "Failed to update user");
    }
  }
]

module.exports = UpdateUserController;