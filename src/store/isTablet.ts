import { SET_TABLET } from "./actions";
import { Action } from "redux";

type Background = Action<typeof SET_TABLET> & {
  status: boolean;
};

const reducer = (status = false, actions: Background) => {
  switch (actions.type) {
    case SET_TABLET:
      return actions.status;

    default:
      return status;
  }
};

export default reducer;
