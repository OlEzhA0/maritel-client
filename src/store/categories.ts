import { SET_CATEGORIES } from "./actions";
import { Action } from "redux";

type Category = Action<typeof SET_CATEGORIES> & {
  categories: CategoriesTypes[];
};

const reducer = (categories = [] as CategoriesTypes[], actions: Category) => {
  switch (actions.type) {
    case SET_CATEGORIES:
      return actions.categories;

    default:
      return categories;
  }
};

export default reducer;
