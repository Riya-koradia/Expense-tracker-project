const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");

const UserFetchByTokenController = [
  async (req, res) => {
    try {
      const userData = { ...req.user };

      return apiResponseHelper.successResponseWithData(
        res,
        "user info fetched",
        {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
       
        
        }
      );
    } catch (e) {
      console.log(e);
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = UserFetchByTokenController;
