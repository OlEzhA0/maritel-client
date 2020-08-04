import { SET_SPEC_CATEGORIES } from "./actions";
import { Action } from "redux";

type Category = Action<typeof SET_SPEC_CATEGORIES> & {
  categories: SpecProdsCategory[];
};

const reducer = (specCategories = [] as SpecProdsCategory[], actions: Category) => {
  switch (actions.type) {
    case SET_SPEC_CATEGORIES:
      return actions.categories;

    default:
      return specCategories;
  }
};

export default reducer;
