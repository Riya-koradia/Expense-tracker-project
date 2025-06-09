const express = require("express");
const AddExpenseController = require("../controllers/ExpenseController/AddExpense.controller");
const FetchAllExpensesController = require("../controllers/ExpenseController/FetchExpense.controller");
const GetExpenseByIdController = require("../controllers/ExpenseController/GetExpenseById.controller");
const UpdateExpenseController = require("../controllers/ExpenseController/UpdateExpense.controller");
const DeleteExpenseController = require("../controllers/ExpenseController/DeleteExpense.controller");
const UserStatisticsController = require("../controllers/ExpenseController/UserStatistics.controller");


const expenseRoutes = express();


expenseRoutes.post("/create", AddExpenseController);
expenseRoutes.get("/fetch", FetchAllExpensesController);
expenseRoutes.get("/fetch-by-id", GetExpenseByIdController);
expenseRoutes.patch("/update", UpdateExpenseController);
expenseRoutes.delete("/delete",DeleteExpenseController)
expenseRoutes.get("/user-statistics/", UserStatisticsController);

module.exports = expenseRoutes;