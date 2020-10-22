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
export const getWishList = (state: RootState) => state.wishList.items;
export const getCart = (state: RootState) => state.cart.items;
export const getNewCartItem = (state: RootState) => state.cart.newItem;
export const getCartItemsTotal = (state: RootState) => {
    const products = getProducts(state);
    return getCart(state).reduce((accum, value) => {
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

    const promoDiscount = getPromo(state);
    if (promoDiscount.promoValue) {
        if (promoDiscount.promoDisc === "grn") {
            orderTotal += -promoDiscount.promoValue;
        } else {
            orderTotal += -Math.floor(
                (orderTotal * promoDiscount.promoValue) / 100
            );
        }
    }

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
export const getPromo = (state: RootState) => state.promo;
export const getSearchQuery = (state: RootState) => state.searchQuery;
export const getMainSettings = (state: RootState) => state.mainSettings;
export const getCarousel = (state: RootState) => state.carousel;
export const getShowAddedToCart = (state: RootState) => state.showAddedToCart