const { body, matchedData } = require("express-validator");
const apiResponse = require("../../utils/apiResponse.helper");
const UserModel = require("../../models/User.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const DeleteUserController = [
  body("id").notEmpty().withMessage("id_required"),
  PayloadValidator,
  async (req, res) => {
    try {
      const { id } = matchedData(req);
      const deleted = await UserModel.deleteUserById(id);

      if (!deleted) {
        return apiResponse.notFoundResponse(res, "User not found");
      }

      return apiResponse.successResponse(res, "User deleted successfully");
    } catch (error) {
      console.error("DeleteUser Error:", error);
      return apiResponse.errorResponse(res, "Error deleting user");
    }
  }
];

module.exports = DeleteUserController;
