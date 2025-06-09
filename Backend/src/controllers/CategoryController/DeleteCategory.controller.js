const { matchedData, body} = require("express-validator");
const apiResponse = require("../../utils/apiResponse.helper");
const CategoryModel = require("../../models/Category.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");


const DeleteCategoryController =[
   body("id").notEmpty().withMessage("Category ID is required"),
    PayloadValidator,
    async (req, res) => {
        try {
            const { id } = matchedData(req);
            const deleted = await CategoryModel.deleteCategoryById(id);
            if (deleted) {
                return apiResponse.successResponse(res, "Category deleted");
            }
            return apiResponse.errorResponse(res, "Failed to delete category");
        } catch (error) {
            console.error("DeleteCategory Error:", error);
            return apiResponse.errorResponse(res, "Failed to delete category");
        }
    }
]

module.exports = DeleteCategoryController;
