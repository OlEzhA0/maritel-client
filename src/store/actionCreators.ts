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
    SORT_WISH_LIST,
    ADD_TO_CART,
    DELETE_FROM_CART,
    UPDATE_PRODUCT_IN_CART,
    SET_CART_POPUP_STATUS,
    SET_ORDER_INFO,
    SET_ORDER_STATUS,
    CLEAR_CART,
    SET_CUSTOMER_INFO,
    CLEAR_CUSTOMER_INFO,
    SET_PROMO,
    SET_SEARCH_QUERY,
    SET_MAIN_SETTINGS,
} from "./actions";
import { Customer } from "./customer";

import { SetOrder } from "./order";
import { OrderStatus } from "./orderStatus";

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

export const clearCart = () => ({ type: CLEAR_CART });

export const SetPopupCartStatus = (status: boolean) => ({
    type: SET_CART_POPUP_STATUS,
    status,
});

export const setOrderInfo = (payload: SetOrder["payload"]) => ({
    type: SET_ORDER_INFO,
    payload,
});

export const setOrderStatus = (payload: OrderStatus["payload"]) => ({
    type: SET_ORDER_STATUS,
    payload,
});

export const setCustomerInfo = (
    payload: Customer
): { type: typeof SET_CUSTOMER_INFO; payload: Customer } => ({
    type: SET_CUSTOMER_INFO,
    payload,
});

export const clearCustomerInfo = (): { type: typeof CLEAR_CUSTOMER_INFO } => ({
    type: CLEAR_CUSTOMER_INFO,
});

export const sortWishlist = () => ({
    type: SORT_WISH_LIST,
});

export const setPromo = (payload: Promo) => ({
    type: SET_PROMO,
    payload,
});

export const setSearchQuery = (payload: string) => ({
    type: SET_SEARCH_QUERY,
    payload,
});

export const setMainSettings = (payload: MainSettings) => ({
    type: SET_MAIN_SETTINGS,
    payload,
});
