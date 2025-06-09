
import { actions } from "../../utils/constants";

const initialState = {
  expenseList: [],
  expenseLoading: false,
  categoryList: [],
  categoryLoading: false,
};

export default function expenseCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_EXPENSE_LIST:
      return { ...state, expenseLoading: true };
    case actions.SET_EXPENSE_LIST:
      return { ...state, expenseLoading: false, expenseList: action.payload };
    case actions.FETCH_CATEGORY_LIST:
      return { ...state, categoryLoading: true };
    case actions.SET_CATEGORY_LIST:
      return { ...state, categoryLoading: false, categoryList: action.payload };
    default:
      return state;
  }
}
