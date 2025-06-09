const { USER_ROLES } = require("./constants/common.constants");
// const { MODULES } = require("./constants/modules.constants");
const _lang = require("./lang");

const jwtErorr = (message, req) => {
  let errMessage = "";
  switch (message) {
    case "jwt expired":
      errMessage = _lang("token_expired", req.client_lang);
      break;
    case "jwt malformed":
      errMessage = _lang("token_malformed", req.client_lang);
      break;
    case "invalid token":
    default:
      errMessage = _lang("token_invalid", req.client_lang);
      break;
  }
  return errMessage;
};
const generateValidationError = (msg, param = "field") => {
  return [{
    msg,
    param,
  }];
};
const validateEmail = (email) => {
  var re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};

const setZeroPrefixs = (val, length = 3) => {
  let temp = val.toString();
  while (temp.length < length) {
    temp = `0${temp}`;
  }
  return temp;
};
const titleCase = (s) => {
  if (s)
    return s
      ?.toString()
      ?.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());

  return null;
};
const findObjectKeyByValue = (value, object) => {
  for (let val in object) {
    if (object[val] == value) {
      return titleCase(val);
      break;
    }
  }
  return undefined;
};

const escapeTheStr = (str) => {
  if (str) return str.replace(/([\/,!?_])/g, "$1");
  return str;
};

module.exports = {
  generateValidationError,
  findObjectKeyByValue,
  escapeTheStr,
  titleCase,
  jwtErorr,
  setZeroPrefixs,
  validateEmail,
};
