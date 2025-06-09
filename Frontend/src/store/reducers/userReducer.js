import { actions } from "../../utils/constants"
import { refreshToken ,accessToken} from "../../utils/main";

const initialState = {
  data: {},

  isLoggedIn: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { 
        ...state, 
        data: { 
          ...action.value, 
          modules: Array.isArray(action.value.modules) ? action.value.modules : [] 
        }, 
        isLoggedIn: true 
      };
    case actions.SIGN_IN: {
      accessToken.set(action.value.accessToken);
      refreshToken.set(action.value.refreshToken);
      return { 
        ...state, 
        data: { 
          ...action.value, 
          modules: Array.isArray(action.value.modules) ? action.value.modules : [] 
        }, 
        isLoggedIn: true 
      };
    }
    case actions.SIGN_OUT:
      return { ...state, data: {}, isLoggedIn: false };
    default:
      return { ...state };
  }
};
export default userReducer;
