import { SET_USER_NAME, ADD_MONEY_IFNO } from './types';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                user_name: action.user_name,
            };
        case ADD_MONEY_IFNO:
            return {
                money_list: [...state.money_list, action.data],
            };
        default:
            return state;
    }
};

export default reducer;
