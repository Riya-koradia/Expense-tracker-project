const { body, matchedData, query } = require("express-validator");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const ExpenseModel = require("../../models/Expense.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");
const moment = require("moment");

const UpdateExpenseController = [
  body("id").notEmpty().withMessage("Expense ID is required"),

  body("user_id").notEmpty().withMessage("user_id is required"),
  body("category").notEmpty().withMessage("category is required"),
  body("amount")
    .notEmpty().withMessage("amount is required")
    .bail()
    .isFloat({ gt: 0 }).withMessage("amount must be greater than 0"),
  body("date").notEmpty().withMessage("date is required").isISO8601().withMessage("invalid date"),
  body("description").optional().isString().withMessage("description must be text"),

  PayloadValidator,

  async (req, res) => {
    try {
      const { id } = req.body;
      const data = matchedData(req);

      if (data.date) {
        data.date = moment(data.date).format("YYYY-MM-DD");
      }
      const updated = await ExpenseModel.updateExpense(id, data);

      if (!updated) {
        return apiResponseHelper.notFoundResponse(res, "Expense not found");
      }

      return apiResponseHelper.successResponse(res, "Expense updated", { ...data, date: data.date });
    } catch (err) {
      console.error("UpdateExpense Error:", err);
      return apiResponseHelper.errorResponse(res, "Failed to update expense");
    }
  }
];

module.exports = UpdateExpenseController;
