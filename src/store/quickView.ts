import { SET_QUICK_VIEW, SET_CURRENT_UUID_QUICK_VIEW } from "./actions";
import { Action } from "redux";

type Background = Action<typeof SET_QUICK_VIEW> & {
  status: boolean;
};

type CurrentUUid = Action<typeof SET_CURRENT_UUID_QUICK_VIEW> & {
  uuid: string;
};

type GeneralType = Background | CurrentUUid;

interface State {
  status: boolean;
  uuid: string;
}

const current: State = {
  status: false,
  uuid: "",
};

const reducer = (state = current, actions: GeneralType) => {
  switch (actions.type) {
    case SET_QUICK_VIEW:
      return { ...state, status: actions.status };

    case SET_CURRENT_UUID_QUICK_VIEW: {
      return { ...state, uuid: actions.uuid };
    }

    default:
      return state;
  }
};

export default reducer;
