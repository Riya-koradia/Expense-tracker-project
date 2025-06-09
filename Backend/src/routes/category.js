const express = require("express");
const CreateCategoryController = require("../controllers/CategoryController/CreateCategory.controller");
const FetchAllCategoriesController = require("../controllers/CategoryController/FetchCategories.controller");
const FetchCategoryByIdController = require("../controllers/CategoryController/FetchCategoryById.controller");
const UpdateCategoryController = require("../controllers/CategoryController/UpdateCategory.controller");
const DeleteCategoryController = require("../controllers/CategoryController/DeleteCategory.controller");



const categoryRoutes = express();

categoryRoutes.post("/create", CreateCategoryController);
categoryRoutes.get("/fetch", FetchAllCategoriesController);
categoryRoutes.get("/by-id", FetchCategoryByIdController);
categoryRoutes.patch("/update", UpdateCategoryController);
categoryRoutes.delete("/delete", DeleteCategoryController);

module.exports = categoryRoutes;