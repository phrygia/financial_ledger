import { SET_USER_NAME, ADD_MONEY_IFNO, EDIT_MONEY_IFNO } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        user_name: action.user_name,
      };
    case ADD_MONEY_IFNO:
      return {
        ...state,
        money_list: action.money_list,
      };
    case EDIT_MONEY_IFNO:
      return {
        ...state,
        edit_info: action.edit_info,
      };
    default:
      return state;
  }
};

export default reducer;
