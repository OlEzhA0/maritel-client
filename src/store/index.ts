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

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  specCategories: SpecCategoriesReducer,
  background: BackgroundCoverReducer,
  products: ProductsReducer,
  isTablet: IsTabletReducer,
  qucikView: QuickViewReducer,
  searchBackground: SearchBackgroundReducer,
  wishList: WishListReducer,
  cart: CartReducer,
  cartPopupStatus: CartPopupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
