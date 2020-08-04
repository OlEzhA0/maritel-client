import { SET_CATEGORIES, SET_SPEC_CATEGORIES, SET_BACKGROUND } from "./actions";

export const setCategories = (categories: CategoriesTypes[]) => ({
  type: SET_CATEGORIES,
  categories,
});

export const setSpecCategories = (categories: SpecProdsCategory[]) => ({
  type: SET_SPEC_CATEGORIES,
  categories,
});

export const setMenuStatus = (status: boolean) => ({
  type: SET_BACKGROUND,
  status,
});
