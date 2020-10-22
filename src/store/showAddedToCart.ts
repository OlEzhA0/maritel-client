import { Action } from "redux";
import { SET_SHOW_ADDED_TO_CART } from "./actions";

type ActionType = Action<typeof SET_SHOW_ADDED_TO_CART> & { payload: boolean };

const reducer = (state = false, action: ActionType) => {
    switch (action.type) {
        case SET_SHOW_ADDED_TO_CART:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
