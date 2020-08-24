import {
  ADD_TO_CART,
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

type GeneralType = AddToCart | DeleteFromCart | UpdateInCart;

let defaultState: CartProd[] = [];

if (JSON.parse(localStorage.getItem("cart")!)) {
  defaultState = JSON.parse(localStorage.getItem("cart")!);
}

const reducer = (state = defaultState, actions: GeneralType) => {
  switch (actions.type) {
    case ADD_TO_CART: {
      if (
        state.some(
          (prod) =>
            prod.prodUuid === actions.prodUuid && prod.size === actions.size
        )
      ) {
        return state.map((prod) => {
          if (
            prod.prodUuid === actions.prodUuid &&
            prod.size === actions.size
          ) {
            return {
              prodUuid: actions.prodUuid,
              quantity: `${
                +prod.quantity + +actions.quantity > 4
                  ? 4
                  : +prod.quantity + +actions.quantity
              }`,
              size: actions.size,
            };
          }

          return prod;
        });
      } else {
        return [
          ...state,
          {
            prodUuid: actions.prodUuid,
            quantity: actions.quantity,
            size: actions.size,
          },
        ];
      }
    }
    case DELETE_FROM_CART: {
      return state.filter((prod) => prod.prodUuid + prod.size !== actions.prod);
    }

    case UPDATE_PRODUCT_IN_CART:
      return state.map((prod) => {
        if (prod.prodUuid === actions.prodUuid) {
          return {
            prodUuid: prod.prodUuid,
            quantity: prod.quantity,
            size: prod.size,
          };
        }

        return prod;
      });

    default:
      return state;
  }
};

export default reducer;
