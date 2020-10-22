import { SET_CAROUSEL } from "./actions";
import { Action } from "redux";

type ActionTypes = Action<typeof SET_CAROUSEL> & {
    payload: string[];
};
const reducer = (state: string[] = [], action: ActionTypes) => {
    switch (action.type) {
        case SET_CAROUSEL:
            return [...action.payload];

        default:
            return state;
    }
};

export default reducer;
