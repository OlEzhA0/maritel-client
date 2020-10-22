import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import CategoriesReducer from "./categories";
import SpecCategoriesReducer from "./specCategories";
import BackgroundCoverReducer from "./mobileMenu";
import ProductsReducer from "./products";
import IsTabletReducer from "./isTablet";
import QuickViewReducer from "./quickView";
import SearchBackgroundReducer from "./backgroundCover";
import WishListReducer from "./wishList";
import CartReducer from "./cart";
import CartPopupReducer from "./cartPopup";
import OrderStateReducer from "./order";
import OrderStatusReducer from "./orderStatus";
import CustomerReducer from "./customer";
import PromoReducer from "./promo";
import SearchQueryReducer from "./searchQuery";
import MainSettingsReducer from "./mainSettings";
import CarouselReducer from "./carousel";
import ShowAddedToCartReducer from "./showAddedToCart";

const rootReducer = combineReducers({
    categories: CategoriesReducer,
    specCategories: SpecCategoriesReducer,
    background: BackgroundCoverReducer,
    products: ProductsReducer,
    isTablet: IsTabletReducer,
    qucikView: QuickViewReducer,
    searchBackground: SearchBackgroundReducer,
    cart: CartReducer,
    cartPopupStatus: CartPopupReducer,
    order: OrderStateReducer,
    orderStatus: OrderStatusReducer,
    customer: CustomerReducer,
    wishList: WishListReducer,
    promo: PromoReducer,
    searchQuery: SearchQueryReducer,
    mainSettings: MainSettingsReducer,
    carousel: CarouselReducer,
    showAddedToCart: ShowAddedToCartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const initializeStore = (parameters?: RootState) =>
    createStore(
        rootReducer,
        parameters,
        composeWithDevTools(applyMiddleware(thunk))
    );
