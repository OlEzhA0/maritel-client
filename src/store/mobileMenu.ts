import { SET_BACKGROUND } from "./actions";
import { Action } from "redux";

type Background = Action<typeof SET_BACKGROUND> & {
  status: boolean;
};

const reducer = (status = false, actions: Background) => {
  switch (actions.type) {
    case SET_BACKGROUND:
      return actions.status;

    default:
      return status;
  }
};

export default reducer;
