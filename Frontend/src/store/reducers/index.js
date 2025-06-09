import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import snackBarReducer from "./snackbarReducer";
import modalReducer from "./modalReducer";
import expenseCategoryReducer from "./expenseCategoryReducer";

const rootReducer = combineReducers({
    user: userReducer,
    snackBar: snackBarReducer,
    modal: modalReducer,
    expenseCategory: expenseCategoryReducer,

});
export default rootReducer;