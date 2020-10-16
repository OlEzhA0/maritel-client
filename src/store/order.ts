import { Action } from "redux";
import { SET_ORDER_INFO } from "./actions";

export type SetOrder = Action<typeof SET_ORDER_INFO> & {
    payload: {
        shippingMethod?: "postOffice" | "courier";
        deliveryAddress: {
            street?: OptionType;
            houseNumber?: string;
            appartment?: string;
            value?: string;
            name?: string;
        };
        receiver: "payer" | "custom";
        city: OptionType;
        payer: {
            firstName: string;
            lastName: string;
            phone: string;
        };
        customReceiver?: {
            firstName: string;
            lastName: string;
            patronymic: string;
            phone: string;
        };
        paymentMethod: "card" | "cash" | "";
        paymentService: "wayforpay" | "liqpay" | "";
    };
};

type GeneralType = SetOrder;

const reducer = (
    state: SetOrder["payload"] = {} as SetOrder["payload"],
    action: GeneralType
) => {
    switch (action.type) {
        case SET_ORDER_INFO:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default reducer;
