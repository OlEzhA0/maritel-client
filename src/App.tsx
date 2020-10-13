import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import { Header } from "./components/common/Header";
import { ProductsList } from "./components/ProductsList";
import * as helpers from "./helpers";
import { HomePage } from "./pages";
import { CategoryPage } from "./pages/CategoryPage";
import * as aCreator from "./store/actionCreators";
import {
    getMenuStatus,
    getQickViewStatus,
    getIsTablet,
    getBackgroundSearchCover,
    getWishList,
    getCart,
} from "./store/actionsTypes";
import "./styles/index.scss";
import { ProductPage } from "./pages/ProductPage";
import { ProductPageQuickView } from "./components/ProductPageQuickView";
import { CartPage } from "./pages/CartPage";
import OrderStatusPage from "./pages/OrderStatusPage/OrderStatusPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { WishlistPage } from "./pages/WishlistPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { SearchPage } from "./pages/SearchPage";
import { AboutUsPage } from "./staticPages/AboutUsPage/AboutUsPage";

function App() {
    const location = useLocation();
    const products = useQuery(helpers.productsQuery);
    const { data } = useQuery(helpers.getCategoriesQuery);
    const specCategs = useQuery(helpers.getSpecCategQuery);
    const dispatch = useDispatch();
    const backgroundStatus = useSelector(getMenuStatus);
    const [scrollPos, setScrollPos] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(true);
    const quickViewSt = useSelector(getQickViewStatus);
    const isTablet = useSelector(getIsTablet);
    const searchBackground = useSelector(getBackgroundSearchCover);
    const wishList = useSelector(getWishList);
    const cart = useSelector(getCart);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("query");
        if (query) {
            aCreator.setSearchQuery(query);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = useCallback(() => {
        const scrollInfo = document.documentElement.getBoundingClientRect();
        setScrollPos(scrollInfo.top);

        if (scrollInfo.top < scrollPos && scrollInfo.top <= -100) {
            setHeaderVisible(false);
        } else {
            setHeaderVisible(true);
        }
    }, [scrollPos]);

    useEffect(() => {
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        localStorage.setItem("wishList", JSON.stringify(wishList));
    }, [wishList]);

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
    }, [scrollPos, handleScroll]);

    useEffect(() => {
        if (data && data.categories && products && products.data) {
            const goods: Products[] = products.data.products
                .filter((prod: Products) => !prod.title.includes("копия"))
                .filter((prod: Products) => prod.photos.length !== 0)
                .map((prod: LocalProduct) => ({
                    ...prod,
                    sizes: JSON.parse(prod.sizes),
                }));

            const categories: CategoriesTypes[] = data.categories.map(
                (category: CategoriesFromDB) => ({
                    ...category,
                    subCategories: JSON.parse(category.subCategories),
                })
            );

            const preparedCategs = categories.filter((categ) =>
                goods.some(
                    (good) =>
                        good.type.split(helpers.splitValue)[0] === categ.id
                )
            );

            const subCategs = goods
                .map((good) => good.type.split(helpers.splitValue)[1])
                .filter((good) => good);

            const visibleSubCategs = preparedCategs.map((categ) => ({
                ...categ,
                subCategories: categ.subCategories.filter((subCateg) =>
                    subCategs.some((subs) => subs === subCateg.id)
                ),
            }));

            dispatch(aCreator.setProducts(goods));

            dispatch(
                aCreator.setCategories(
                    visibleSubCategs.sort((a, b) =>
                        a.category.localeCompare(b.category)
                    )
                )
            );
        }
    }, [data, dispatch, products]);

    useEffect(() => {
        if (specCategs.data && specCategs.data.getSpecCateg) {
            dispatch(
                aCreator.setSpecCategories(
                    specCategs.data.getSpecCateg.filter(
                        (categ: SpecProdsCategory) => !!categ.products.length
                    )
                )
            );
        }
    }, [specCategs, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        dispatch(aCreator.setQucikViewStatus(false));
        dispatch(aCreator.setQucikViewUuid(""));
    }, [isTablet, dispatch]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            <Header visible={headerVisible} />

            <Switch>
                <Route
                    path="/:category/:sub/:name/:id"
                    exact
                    component={ProductPage}
                />
                <Route
                    path="/:category/Vse-tovari"
                    exact
                    component={ProductsList}
                />
                <Route
                    path="/:category/Specialnoe"
                    exact
                    component={ProductsList}
                />
                <Route path="/about/:path" exact component={AboutUsPage} />
                <Route path="/:category/:sub" exact component={ProductsList} />
                <Route path="/wish-list" exact component={ProductsList} />
                <Route path="/cart" exact component={CartPage} />
                <Route path="/order-status" exact component={OrderStatusPage} />
                <Route path="/orders" exact component={OrderHistoryPage} />
                <Route path="/account" exact component={AccountPage} />
                <Route path="/wishlist" exact component={WishlistPage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegistrationPage} />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/:category" exact component={CategoryPage} />
                <Route path="/" exact component={HomePage} />
            </Switch>
            <Footer />
            {backgroundStatus && isTablet && (
                <div
                    className="cover"
                    onClick={() => dispatch(aCreator.setMenuStatus(false))}
                />
            )}
            {searchBackground && (
                <div
                    className="search__cover"
                    onClick={() =>
                        dispatch(aCreator.setBackgroundStatus(false))
                    }
                />
            )}
            {quickViewSt && !isTablet && (
                <>
                    <div
                        className="full__cover"
                        onClick={() => {
                            dispatch(aCreator.setQucikViewStatus(false));
                            dispatch(aCreator.setQucikViewUuid(""));
                        }}
                    />
                    <ProductPageQuickView />
                </>
            )}
        </>
    );
}

export default App;
