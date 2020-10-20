import { SET_MAIN_SETTINGS } from "./actions";
import { Action } from "redux";

type ActionTypes = Action<typeof SET_MAIN_SETTINGS> & {
    payload: MainSettings;
};

const reducer = (state: MainSettings | null = null, actions: ActionTypes) => {
    switch (actions.type) {
        case SET_MAIN_SETTINGS:
            return { ...actions.payload };
        default:
            return state;
    }
};

export default reducer;
