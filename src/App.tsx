import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  getCategoriesQuery,
  getSpecCategQuery,
  productsQuery,
  splitValue,
} from "./helpers";
import { HomePage } from "./pages";
import {
  setCategories,
  setMenuStatus,
  setSpecCategories,
  setProducts,
} from "./store/actionCreators";
import { getMenuStatus } from "./store/actionsTypes";
import "./styles/index.scss";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductsList } from "./components/ProductsList";

function App() {
  const location = useLocation();
  const products = useQuery(productsQuery);
  const { data } = useQuery(getCategoriesQuery);
  const specCategs = useQuery(getSpecCategQuery);
  const dispatch = useDispatch();
  const backgroundStatus = useSelector(getMenuStatus);
  const [scrollPos, setScrollPos] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

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
    document.addEventListener("scroll", handleScroll);
  }, [scrollPos, handleScroll]);

  useEffect(() => {
    if (data && data.categories && products && products.data) {
      const goods: Products[] = products.data.products;
      const categories: CategoriesTypes[] = data.categories.map(
        (category: CategoriesFromDB) => ({
          ...category,
          subCategories: JSON.parse(category.subCategories),
        })
      );

      const preparedCategs = categories.filter((categ) =>
        goods.some((good) => good.type.split(splitValue)[0] === categ.id)
      );

      const subCategs = goods
        .map((good) => good.type.split(splitValue)[1])
        .filter((good) => good);

      const visibleSubCategs = preparedCategs.map((categ) => ({
        ...categ,
        subCategories: categ.subCategories.filter((subCateg) =>
          subCategs.some((subs) => subs === subCateg.id)
        ),
      }));

      dispatch(setProducts(goods));

      dispatch(
        setCategories(
          visibleSubCategs.sort((a, b) => a.category.localeCompare(b.category))
        )
      );
    }
  }, [data, dispatch, products]);

  useEffect(() => {
    if (specCategs.data && specCategs.data.getSpecCateg) {
      dispatch(setSpecCategories(specCategs.data.getSpecCateg));
    }
  }, [specCategs, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header visible={headerVisible} />
      <Switch>
        <Route path="/:category/Vse-tovari" exact component={ProductsList} />
        <Route path="/:category" exact component={CategoryPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
      <Footer />
      {backgroundStatus && (
        <div className="cover" onClick={() => dispatch(setMenuStatus(false))} />
      )}
    </>
  );
}

export default App;
