import { SET_CART_POPUP_STATUS } from "./actions";
import { Action } from "redux";

type CartPopup = Action<typeof SET_CART_POPUP_STATUS> & {
  status: boolean;
};

const reducer = (status = false, actions: CartPopup) => {
  switch (actions.type) {
    case SET_CART_POPUP_STATUS:
      return actions.status;

    default:
      return status;
  }
};

export default reducer;
