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
export const getCartItemsTotal = (state: RootState) => {
    const products = getProducts(state);
    return state.cart.reduce((accum, value) => {
        const prod = products.find((g) => g.uuid === value.prodUuid)!;
        if (prod) {
            const addPrice = +prod.price * +value.quantity;
            return accum + addPrice;
        }
        return accum;
    }, 0);
};

export const getOrderCommision = (state: RootState) => {
    if (state.order.paymentMethod === "card") {
        const cartItemsTotal = getCartItemsTotal(state);
        return Math.ceil(cartItemsTotal * 0.025);
    } else {
        return 0;
    }
};

export const getOrderTotal = (state: RootState) => {
    let orderTotal = 0;

    const cartItemsTotal = getCartItemsTotal(state);
    orderTotal += cartItemsTotal;

    const orderCommision = getOrderCommision(state);
    orderTotal += orderCommision;

    return orderTotal;
};
export const getShippingCost = (state: RootState) => {
    const shippingMethod = state.order.shippingMethod;

    return shippingMethod ? "По тарифам перевозчика" : 0;
};
export const getCartPopupStatus = (state: RootState) => state.cartPopupStatus;
export const getOrderInfo = (state: RootState) => state.order;
export const getOrderStatus = (state: RootState) => state.orderStatus;
export const getCustomerInfo = (state: RootState) => state.customer;
export const getAccessToken = (state: RootState) => state.customer.accessToken;
export const getIsLogged = (state: RootState) =>
    state.customer.accessToken ? true : false;
