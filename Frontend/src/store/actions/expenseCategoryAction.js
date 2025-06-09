import { getExpenseApi, addExpenseApi, expenseUpdateApi, deleteExpenseApi, fetchExpenseByIdApi } from '../../apis/expense.api';
import { fetchCategoryApi, createCategoryApi, updateCategoryApi, deleteCategoryApi, fetchCategoryByIdApi } from '../../apis/category.api';
import { actions } from '../../utils/constants';

export const fetchExpenseList = (params) => async (dispatch) => {
  dispatch({ type: actions.FETCH_EXPENSE_LIST });
  const response = await getExpenseApi(params);
  dispatch({ type: actions.SET_EXPENSE_LIST, payload: response });
};

export const fetchCategoryList = (params) => async (dispatch) => {
  dispatch({ type: actions.FETCH_CATEGORY_LIST });
  const response = await fetchCategoryApi(params);
  dispatch({ type: actions.SET_CATEGORY_LIST, payload: response });
};
