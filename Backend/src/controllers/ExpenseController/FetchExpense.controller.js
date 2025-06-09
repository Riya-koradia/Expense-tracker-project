const apiResponseHelper = require("../../utils/apiResponse.helper");
const ResponseGenratorService = require("../../services/ResponseGenrator.service");

const FetchAllExpensesController = async (req, res) => {
  try {
    const responseService = new ResponseGenratorService(req);

    const data = await responseService.getPaginatedResponse({
      customSelectSQL: `
        SELECT 
          e.id, 
          u.name AS user_name, 
          c.name AS category_name, 
          e.amount, 
          e.date, 
          e.description,
          e.created_at
        FROM expenses e
        LEFT JOIN users u ON u.id = e.user_id
        LEFT JOIN categories c ON c.id = e.category
      `,
      countFrom: "expenses e LEFT JOIN users u ON u.id = e.user_id LEFT JOIN categories c ON c.id = e.category",
      searchColumns: ["c.name", "e.description", "u.name"],
    });

    return apiResponseHelper.successResponseWithData(res, "expenses_fetched", data);
  } catch (err) {
    console.error("FetchAllExpenses Error:", err);
    return apiResponseHelper.errorResponse(res, "Server error");
  }
};

module.exports = FetchAllExpensesController;
