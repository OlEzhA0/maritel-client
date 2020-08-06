import { SET_PRODUCTS } from "./actions";
import { Action } from "redux";

type Prods = Action<typeof SET_PRODUCTS> & {
  products: Products[];
};

const reducer = (products = [] as Products[], actions: Prods) => {
  switch (actions.type) {
    case SET_PRODUCTS:
      return actions.products;

    default:
      return products;
  }
};

export default reducer;
