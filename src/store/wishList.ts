import { SET_TO_WISH_LIST } from "./actions";
import { Action } from "redux";

type Wish = Action<typeof SET_TO_WISH_LIST> & {
  prodId: string;
};

let defaultState: string[] = [];

if (JSON.parse(localStorage.getItem("wishList")!)) {
  defaultState = JSON.parse(localStorage.getItem("wishList")!);
}

const reducer = (state = defaultState, actions: Wish) => {
  switch (actions.type) {
    case SET_TO_WISH_LIST: {
      if (state.some((id) => id === actions.prodId)) {
        return state.filter((id) => id !== actions.prodId);
      } else {
        return [...state, actions.prodId];
      }
    }

    default:
      return state;
  }
};

export default reducer;
