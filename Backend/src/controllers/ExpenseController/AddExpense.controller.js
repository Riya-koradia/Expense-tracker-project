const { body, matchedData } = require("express-validator");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const ExpenseModel = require("../../models/Expense.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");
const moment = require("moment");

const AddExpenseController = [

  body("user_id")
  .notEmpty()
  .withMessage("user_id is required"),

  body("category")
  .notEmpty()
  .withMessage("category is required"),

  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("amount must be a number greater than 0"),

  body("date")
    .notEmpty()
    .withMessage("date is required")
    .isISO8601()
    .withMessage("invalid date"),
    
  body("description")
    .optional()
    .isString()
    .withMessage("description must be text"),

  PayloadValidator,

  async (req, res) => {
    try {
      const data = matchedData(req);

       if (data.date) {
        data.date = moment(data.date).format("YYYY-MM-DD");
      }
      const expenseId = await ExpenseModel.addExpense(data);

      return apiResponseHelper.successResponseWithData(res, "Expense added", {
        id: expenseId,
        ...data,
      });
    } catch (err) {
      console.error("AddExpense Error:", err);
      return apiResponseHelper.errorResponse(res, "Failed to add expense");
    }
  }
];

module.exports = AddExpenseController;
