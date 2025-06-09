const apiResponse = require("../../utils/apiResponse.helper");
const statisticsService = require("../../services/Statistics.service");

const UserStatisticsController = async (req, res) => {
  try {

    const data = await statisticsService.getUserStatistics();
    return apiResponse.successResponseWithData(res, "User statistics fetched successfully", data);
  } catch (err) {
    console.error("User Statistics Error:", err);
    return apiResponse.errorResponse(res, "Failed to fetch user statistics");
  }
};

module.exports = UserStatisticsController;
