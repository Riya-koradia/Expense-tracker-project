const { body, matchedData } = require('express-validator');
const apiResponse = require('../../utils/apiResponse.helper');
const CategoryModel = require('../../models/Category.model');
const PayloadValidator = require('../../middleware/PayloadValidator.middleware');

const UpdateCategoryController = [
    body('id')
        .notEmpty()
        .withMessage('Category id is required'),

    body('name')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('Category name is required'),

    PayloadValidator,

    async (req, res) => {
        try {
            const data = matchedData(req);
            const updated = await CategoryModel.updateCategory(data.id, data);
            if (updated) {
                return apiResponse.successResponse(res, "Category updated");
            }
            return apiResponse.errorResponse(res, "Failed to update category");
        } catch (err) {
            console.error("UpdateCategory Error:", err);
            return apiResponse.errorResponse(res, "Failed to update category");
        }
    }
]

module.exports = UpdateCategoryController;
