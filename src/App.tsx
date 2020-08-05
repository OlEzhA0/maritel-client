import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { getCategoriesQuery, getSpecCategQuery } from "./helpers";
import { HomePage } from "./pages";
import {
  setCategories,
  setMenuStatus,
  setSpecCategories,
} from "./store/actionCreators";
import { getMenuStatus } from "./store/actionsTypes";
import "./styles/index.scss";

function App() {
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
    if (data && data.categories) {
      const categories: CategoriesTypes[] = data.categories.map(
        (category: CategoriesFromDB) => ({
          ...category,
          subCategories: JSON.parse(category.subCategories),
        })
      );

      dispatch(
        setCategories(
          categories.sort((a, b) => a.category.localeCompare(b.category))
        )
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (specCategs.data && specCategs.data.getSpecCateg) {
      dispatch(setSpecCategories(specCategs.data.getSpecCateg));
    }
  }, [specCategs, dispatch]);

  return (
    <>
      <Header visible={headerVisible} />
      <Switch>
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
