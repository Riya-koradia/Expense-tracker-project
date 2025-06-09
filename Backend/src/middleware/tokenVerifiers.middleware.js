const UserModel = require("../models/User.model.js");
const TokenServices = require("../services/Token.service.js");
const apiResponseHelper = require("../utils/apiResponse.helper.js");
const { jwtErorr } = require("../utils/common.helper.js");
const _lang = require("../utils/lang/index.js");

const tokenVerifier = async (req, res, next) => {
  try {
    const Bearer = req.header("Authorization");
    if (!Bearer || !Bearer.startsWith("Bearer ")) {
      return apiResponseHelper.unauthorizedResponse(
        res,
        _lang("token_not_found", req.client_lang)
      );
    }
    const token = Bearer.replace("Bearer ", "");
    if (!token) {
      return apiResponseHelper.unauthorizedResponse(
        res,
        _lang("token_not_found", req.client_lang)
      );
    }
    const verified = new TokenServices("access").verify(token);
    if (verified) {
     
      const user = await UserModel.findUserById(verified.payload.id || verified.payload._id);
      if (!user || user.deleted === 1 || user.accessToken !== token) {
        return apiResponseHelper.forbiddenResponse(
          res,
          _lang("token_not_valid", req.client_lang)
        );
      }
      req.user = user;
      next();
    } else {
      return apiResponseHelper.unauthorizedResponse(
        res,
        _lang("token_not_found", req.client_lang)
      );
    }
  } catch (error) {
    return apiResponseHelper.unauthorizedResponse(
      res,
      jwtErorr(error.message, req)
    );
  }
};
module.exports = tokenVerifier;
