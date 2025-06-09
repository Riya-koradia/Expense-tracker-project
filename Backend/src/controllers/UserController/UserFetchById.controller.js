const { query, matchedData } = require("express-validator");
const apiResponse = require("../../utils/apiResponse.helper");
const UserModel = require("../../models/User.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const UserFetchByIdController = [
  query("id").notEmpty().withMessage("id_required"),
  PayloadValidator,
  async (req, res) => {
    try {
      const { id } = matchedData(req);
      const user = await UserModel.findUserById(id);

      if (!user) {
        return apiResponse.notFoundResponse(res, "User not found");
      }

      delete user.password;
      delete user.accessToken;
      delete user.refreshToken;

      return apiResponse.successResponseWithData(
        res,
        "User info fetched",
        user
      );
    } catch (error) {
      console.error("UserFetchById Error:", error);
      return apiResponse.errorResponse(res, "Server error");
    }
  }
];

module.exports = UserFetchByIdController;
