import { Action } from "redux";
import { CLEAR_CUSTOMER_INFO, SET_CUSTOMER_INFO } from "./actions";

export interface Customer {
    email?: string;
    accessToken?: string;
}

type SetCustomer = Action<typeof SET_CUSTOMER_INFO> & { payload: Customer };

type ClearCustomer = Action<typeof CLEAR_CUSTOMER_INFO>;

type GeneralType = SetCustomer | ClearCustomer;

const reducer = (state = {} as Customer, action: GeneralType) => {
    switch (action.type) {
        case SET_CUSTOMER_INFO:
            return { ...state, ...action.payload };
        case CLEAR_CUSTOMER_INFO:
            return {} as Customer;
        default:
            return { ...state };
    }
};

export default reducer;
