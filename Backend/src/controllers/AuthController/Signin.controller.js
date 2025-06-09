const Users = require("../../models/User.model");
const { body } = require("express-validator");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");
const TokenServices = require("../../services/Token.service");
const { generateValidationError } = require("../../utils/common.helper");
const { comparePass } = require("../../utils/passEncDec.helper");
const pool = require("../../config/db.config");

const SignInController = [
  body("email")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("email_required")
    .bail()
    .isEmail()
    .withMessage("email_invalid")
    .trim()
    .escape(),

  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("password_required")
    .trim()
    .escape(),

  PayloadValidatorMiddleware,

  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findUserByEmail(email.toLowerCase());
      if (!user) {
        return apiResponseHelper.validationErrorWithData(
          res,
          _lang("validation_error", req.client_lang),
          generateValidationError(
            _lang("user_not_found", req.client_lang),
            "email"
          )
        );
      } else {
        const passwordMatch = await comparePass(password, user.password);
        if (!passwordMatch) {
          return apiResponseHelper.validationErrorWithData(
            res,
            _lang("validation_error", req.client_lang),
            generateValidationError(
              _lang("password_wrong", req.client_lang),
              "password"
            )
          );
        }
      
        delete user.password;
        delete user.accessToken;
        delete user.refreshToken;

        const refreshToken = new TokenServices("refresh").generate({
          id: user.id,
        });
        const accessToken = new TokenServices("access").generate({
          id: user.id,
        });


        await pool.promise().execute(
          `UPDATE users SET accessToken = ?, refreshToken = ? WHERE id = ?`,
          [accessToken, refreshToken, user.id]
        );

        return apiResponseHelper.successResponseWithData(
          res,
          _lang("signed_in"),
          { ...user, accessToken, refreshToken }
        );
      }
    } catch (e) {
      console.log(e);
      return apiResponseHelper.errorResponse(res, e.message);
    }
  },
];

module.exports = SignInController;
