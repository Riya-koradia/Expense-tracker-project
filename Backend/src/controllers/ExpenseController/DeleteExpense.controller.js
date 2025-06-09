const { body, matchedData } = require("express-validator");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const ExpenseModel = require("../../models/Expense.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const DeleteExpenseController = [
 body("id").notEmpty().withMessage("Expense ID is required"),
  PayloadValidator,

  async (req, res) => {
    try {
      const { id } = matchedData(req);
      const deleted = await ExpenseModel.deleteExpenseById(id);

      if (!deleted) {
        return apiResponseHelper.notFoundResponse(res, "Expense not found");
      }

      return apiResponseHelper.successResponse(res, "Expense deleted");
    } catch (err) {
      console.error("DeleteExpense Error:", err);
      return apiResponseHelper.errorResponse(res, "Failed to delete expense");
    }
  }
];

module.exports = DeleteExpenseController;
