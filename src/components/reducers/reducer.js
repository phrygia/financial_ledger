import { SET_USER_NAME } from './types';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                user_name: action.user_name,
            };
        default:
            return state;
    }
};

export default reducer;
