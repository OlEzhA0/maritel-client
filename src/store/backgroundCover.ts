import { SET_BACKGROUND_COVER } from "./actions";
import { Action } from "redux";

type Background = Action<typeof SET_BACKGROUND_COVER> & {
  status: boolean;
};

const reducer = (status = false, actions: Background) => {
  switch (actions.type) {
    case SET_BACKGROUND_COVER:
      return actions.status;

    default:
      return status;
  }
};

export default reducer;
