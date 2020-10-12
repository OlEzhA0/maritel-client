import { SET_TO_WISH_LIST, SORT_WISH_LIST } from "./actions";
import { Action } from "redux";

type Wish = Action<typeof SET_TO_WISH_LIST> & {
    prodId: string;
};

type Sort = Action<typeof SORT_WISH_LIST> & {
    prodId?: string;
};

type ActionType = Sort | Wish;

type Wishlist = {
    items: { prodId: string; date: number }[];
    sort: "ASC" | "DESC";
};

let defaultState: Wishlist = { items: [], sort: "DESC" };

const storedWishlist: null | Wishlist['items'] | Wishlist = JSON.parse(localStorage.getItem("wishList")!);

if (storedWishlist) {
    if (Array.isArray(storedWishlist)) {
        defaultState = { items: storedWishlist.sort((a, b) => a.date - b.date), sort: "DESC" };
    } else {
        defaultState = storedWishlist;
    }
}

const reducer = (state = defaultState, actions: ActionType): Wishlist => {
    switch (actions.type) {
        case SET_TO_WISH_LIST:
            if (state.items.some((item) => item.prodId === actions.prodId)) {
                return {
                    items: state.items.filter(
                        (item) => item.prodId !== actions.prodId
                    ),
                    sort: state.sort,
                };
            } else {
                return {
                    items: [
                        ...state.items,
                        { prodId: actions.prodId, date: Date.now() },
                    ],
                    sort: state.sort,
                };
            }
        case SORT_WISH_LIST:
            const items = [...state.items];
            const sort = state.sort === "DESC" ? "ASC" : "DESC";

            items.sort((a, b) =>
                sort === "DESC" ? a.date - b.date : b.date - a.date
            );

            return { items, sort };
        default:
            return state;
    }
};

export default reducer;
