import React, { useEffect } from "react";
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
      {backgroundStatus && (
        <div className="cover" onClick={() => dispatch(setMenuStatus(false))} />
      )}
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
