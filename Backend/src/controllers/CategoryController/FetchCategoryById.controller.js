const { matchedData, query} = require("express-validator");
const apiResponse = require("../../utils/apiResponse.helper");
const CategoryModel = require("../../models/Category.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const FetchCategoryByIdController = [
    query("id").notEmpty().withMessage("Category ID is required"),
    PayloadValidator,
    async (req, res) => {
        try {
            const { id } = matchedData(req);
            const category = await CategoryModel.getCategoryById(id);

            if (!category) {
                return apiResponse.notFoundResponse(res, "Category not found");
            }

            return apiResponse.successResponseWithData(res, "Category fetched", category);
        } catch (error) {
            console.error("FetchCategoryById Error:", error);
            return apiResponse.errorResponse(res, "Server error");
        }
    }
]

module.exports = FetchCategoryByIdController;