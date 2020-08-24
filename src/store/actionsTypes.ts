import { RootState } from ".";

export const getCategories = (state: RootState) => state.categories;
export const getSpecCateg = (state: RootState) => state.specCategories;
export const getMenuStatus = (state: RootState) => state.background;
export const getProducts = (state: RootState) => state.products;
export const getIsTablet = (state: RootState) => state.isTablet;
export const getQickViewStatus = (state: RootState) => state.qucikView.status;
export const getQickViewUuid = (state: RootState) => state.qucikView.uuid;
export const getBackgroundSearchCover = (state: RootState) =>
  state.searchBackground;
export const getWishList = (state: RootState) => state.wishList;
export const getCart = (state: RootState) => state.cart;
export const getCartPopupStatus = (state: RootState) => state.cartPopupStatus
