const {  matchedData, query } = require("express-validator");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const ExpenseModel = require("../../models/Expense.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const GetExpenseByIdController = [
  query("id").notEmpty().withMessage("Expense ID is required"),
  PayloadValidator,

  async (req, res) => {
    try {
      const { id } = matchedData(req);
      const expense = await ExpenseModel.getExpenseById(id);

      if (!expense) {
        return apiResponseHelper.notFoundResponse(res, "Expense not found");
      }

      return apiResponseHelper.successResponseWithData(res, "Expense fetched", expense);
    } catch (err) {
      console.error("GetExpenseById Error:", err);
      return apiResponseHelper.errorResponse(res, "Failed to fetch expense");
    }
  }
];

module.exports = GetExpenseByIdController;
