import {
    ADD_TO_CART,
    CLEAR_CART,
    DELETE_FROM_CART,
    UPDATE_PRODUCT_IN_CART,
} from "./actions";
import { Action } from "redux";

type AddToCart = Action<typeof ADD_TO_CART> & {
    prodUuid: string;
    quantity: string;
    size: string;
};

type DeleteFromCart = Action<typeof DELETE_FROM_CART> & {
    prod: string;
};

type UpdateInCart = Action<typeof UPDATE_PRODUCT_IN_CART> & {
    prodUuid: string;
    quantity: string;
    size: string;
};

type ClearCart = Action<typeof CLEAR_CART>;

type GeneralType = AddToCart | DeleteFromCart | UpdateInCart | ClearCart;

let defaultState: CartProd[] = [];

if (JSON.parse(localStorage.getItem("cart")!)) {
    defaultState = JSON.parse(localStorage.getItem("cart")!);
}

const reducer = (
    state = { items: defaultState },
    actions: GeneralType
): { items: CartProd[]; newItem?: CartProd } => {
    switch (actions.type) {
        case ADD_TO_CART: {
            const inCart = state.items.findIndex(
                (prod) =>
                    prod.prodUuid === actions.prodUuid &&
                    prod.size === actions.size
            );

            if (inCart !== -1) {
                state.items[inCart].quantity = (
                    +state.items[inCart].quantity + +actions.quantity
                ).toString();

                return {
                    items: [...state.items],
                    newItem: state.items[inCart],
                };
            } else {
                return {
                    items: [
                        ...state.items,

                        {
                            prodUuid: actions.prodUuid,
                            quantity: actions.quantity,
                            size: actions.size,
                        },
                    ],
                    newItem: {
                        prodUuid: actions.prodUuid,
                        size: actions.size,
                        quantity: actions.quantity,
                    },
                };
            }
        }
        case DELETE_FROM_CART: {
            return {
                items: state.items.filter(
                    (prod) => prod.prodUuid + prod.size !== actions.prod
                ),
            };
        }

        case UPDATE_PRODUCT_IN_CART:
            return {
                items: state.items.map((prod) => {
                    if (
                        prod.prodUuid + prod.size ===
                        actions.prodUuid + actions.size
                    ) {
                        return {
                            ...prod,
                            quantity: actions.quantity,
                            size: actions.size,
                        };
                    }

                    return prod;
                }),
            };

        case CLEAR_CART:
            return { items: [] };

        default:
            return state;
    }
};

export default reducer;
