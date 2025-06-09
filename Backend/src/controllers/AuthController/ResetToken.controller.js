const UserModel = require("../../models/User.model.js");
const TokenServices = require("../../services/Token.service.js");
const apiResponseHelper = require("../../utils/apiResponse.helper.js");
const _lang = require("../../utils/lang/index.js");
const pool = require("../../config/db.config");

const ResetTokenController = async (req, res) => {
  try {
    const token = req.body.refreshToken;
    let verified;
    try {
      verified = new TokenServices("refresh").verify(token);
    } catch (e) {
      return apiResponseHelper.unauthorizedResponse(
        res,
        _lang("token_expired", req.client_lang)
      );
    }
    if (verified) {
      const user = new TokenServices("refresh").decode(token);
      if (user.id) {
        const userResponse = await UserModel.findUserById(user.id);
        if (userResponse) {
          const refreshToken = new TokenServices("refresh").generate({
            id: userResponse.id,
          });
          const accessToken = new TokenServices("access").generate({
            id: userResponse.id,
          });
          await pool.promise().execute(
            `UPDATE users SET accessToken = ?, refreshToken = ? WHERE id = ?`,
            [accessToken, refreshToken, userResponse.id]
          );
          return apiResponseHelper.successResponseWithData(
            res,
            _lang("token_refreshed", req.client_lang),
            {
              refreshToken,
              accessToken,
            }
          );
        } else {
          return apiResponseHelper.unauthorizedResponse(
            res,
            _lang("token_not_valid", req.client_lang)
          );
        }
      } else {
        return apiResponseHelper.unauthorizedResponse(
          res,
          _lang("token_not_valid", req.client_lang)
        );
      }
    } else {
      return apiResponseHelper.unauthorizedResponse(
        res,
        _lang("token_expired", req.client_lang)
      );
    }
  } catch (error) {
    return apiResponseHelper.unauthorizedResponse(res, error.message || error);
  }
};

module.exports = ResetTokenController;
