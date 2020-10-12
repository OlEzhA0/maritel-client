import { Action } from "redux"
import { SET_SEARCH_QUERY } from "./actions"

type ActionType = Action<typeof SET_SEARCH_QUERY> & {payload: string}

const reducer = (state = "", action: ActionType) => {
    switch(action.type) {
        case SET_SEARCH_QUERY: 
            return action.payload
        default :
            return state
    }
}

export default reducer