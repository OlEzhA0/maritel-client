import {
  SET_CATEGORIES,
  SET_SPEC_CATEGORIES,
  SET_BACKGROUND,
  SET_PRODUCTS,
  SET_TABLET,
  SET_QUICK_VIEW,
  SET_CURRENT_UUID_QUICK_VIEW,
  SET_BACKGROUND_COVER,
  SET_TO_WISH_LIST,
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_PRODUCT_IN_CART,
  SET_CART_POPUP_STATUS,
} from "./actions";

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

export const setProducts = (products: Products[]) => ({
  type: SET_PRODUCTS,
  products,
});

export const setDeviceStatus = (status: boolean) => ({
  type: SET_TABLET,
  status,
});

export const setQucikViewStatus = (status: boolean) => ({
  type: SET_QUICK_VIEW,
  status,
});

export const setQucikViewUuid = (uuid: string) => ({
  type: SET_CURRENT_UUID_QUICK_VIEW,
  uuid,
});

export const setBackgroundStatus = (status: boolean) => ({
  type: SET_BACKGROUND_COVER,
  status,
});

export const setWishList = (prodId: string) => ({
  type: SET_TO_WISH_LIST,
  prodId,
});

export const addToCart = (
  prodUuid: string,
  quantity: string,
  size: string
) => ({
  type: ADD_TO_CART,
  prodUuid,
  quantity,
  size,
});

export const delFromCart = (prod: string) => ({
  type: DELETE_FROM_CART,
  prod,
});

export const updateInCart = (
  prodUuid: string,
  quantity: string,
  size: string
) => ({
  type: UPDATE_PRODUCT_IN_CART,
  prodUuid,
  quantity,
  size,
});

export const SetPopupCartStatus = (status: boolean) => ({
  type: SET_CART_POPUP_STATUS,
  status,
});
