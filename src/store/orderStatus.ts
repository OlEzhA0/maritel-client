import { SET_ORDER_STATUS } from "./actions";
import { Action } from "redux";

export type OrderStatus = Action<typeof SET_ORDER_STATUS> & {
    payload: { orderId: string; status: string };
};

const reducer = (
    orderStatus = {} as OrderStatus["payload"],
    actions: OrderStatus
) => {
    switch (actions.type) {
        case SET_ORDER_STATUS:
            return { ...actions.payload };

        default:
            return orderStatus;
    }
};

export default reducer;
