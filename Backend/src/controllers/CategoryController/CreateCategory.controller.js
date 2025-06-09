const { body, matchedData } = require("express-validator");
const apiResponse = require("../../utils/apiResponse.helper");
const CategoryModel = require("../../models/Category.model");
const PayloadValidator = require("../../middleware/PayloadValidator.middleware");

const CreateCategoryController = [
    body("name")
        .notEmpty({ ignore_whitespace: true })
        .withMessage("Category name is required"),

    PayloadValidator,

    async (req, res) => {
        try {
            const data = matchedData(req);
            const categoryId = await CategoryModel.createCategory(data);
            return apiResponse.successResponseWithData(res, "Category created", { id: categoryId, name: data.name });
        } catch (err) {
            console.error("CreateCategory Error:", err);
            return apiResponse.errorResponse(res, "Failed to create category");
        }
    }

    
]

module.exports = CreateCategoryController;
