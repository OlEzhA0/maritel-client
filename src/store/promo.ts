import { Action } from "redux";
import { SET_PROMO } from "./actions";

const defaultState: Promo = {
    promoName: "",
    promoDisc: "grn",
    promoValue: 0,
};

type ActionType = Action<typeof SET_PROMO> & {
    payload: Promo;
};

const reducer = (state = defaultState, action: ActionType) => {
    switch (action.type) {
        case SET_PROMO:
            return { ...action.payload };
        default:
            return state;
    }
};

export default reducer;
