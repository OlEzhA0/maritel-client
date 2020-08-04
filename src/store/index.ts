import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import CategoriesReducer from "./categories";
import SpecCategoriesReducer from "./specCategories";
import BackgroundCoverReducer from "./mobileMenu";

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  specCategories: SpecCategoriesReducer,
  background: BackgroundCoverReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
