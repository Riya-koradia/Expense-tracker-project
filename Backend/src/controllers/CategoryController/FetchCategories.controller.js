const ResponseGenratorService = require("../../services/ResponseGenrator.service");
const apiResponse = require("../../utils/apiResponse.helper");


const FetchAllCategoriesController = async (req, res) => {
    try {
         const responseService = new ResponseGenratorService(req);
        const data = await responseService.getPaginatedResponse({
            tableName: "categories",
            searchColumns: ["name"],
            selectedColumns: ["id", "name"],
        });
        return apiResponse.successResponseWithData(res, "Categories fetched", data);
    } catch (err) {
        console.error("FetchAllCategories Error:", err);
        return apiResponse.errorResponse(res, "Failed to fetch categories");
    }
}

module.exports = FetchAllCategoriesController;
