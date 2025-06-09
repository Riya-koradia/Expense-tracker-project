const apiResponseHelper = require("../../utils/apiResponse.helper");
const ResponseGenratorService = require("../../services/ResponseGenrator.service");

const FetchUserController = async (req, res) => {
  try {
    const responseService = new ResponseGenratorService(req);
    const data = await responseService.getPaginatedResponse({
      tableName: "users",
      searchColumns: ["name", "email"],
      selectedColumns: ["id", "name", "email", "status"],
    });

    return apiResponseHelper.successResponseWithData(res, "user_fetched", data);
  } catch (err) {
    console.error("FetchUser Error:", err);
    return apiResponseHelper.errorResponse(res, "Server error");
  }
};

module.exports = FetchUserController;
