import cn from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getColorsQuery, sortBy } from "../../helpers";
import { handleTranslit } from "../../helpers/links";
import { prodListGoods } from "../../helpers/prodsListGoods";
import * as prodsSettings from "../../helpers/prodSort";
import * as types from "../../store/actionsTypes";
import { FilterBy } from "../FilterBy";
import { ProductCard } from "../ProductCard";
import { SelectDropDown } from "../SelectDropDown";
import "./ProductsList.scss";
import { Pagination } from "../Pagination";

export const ProductsList = () => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const [products, setProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<CategoriesTypes>();
  const [specCategory, setSpecCategory] = useState<SpecProdsCategory>();
  const [colors, setColors] = useState<ColorTypes[]>([]);
  const [subsName, setSubsName] = useState("");
  const perPage = 18;
  const [isOpen, setIsOpen] = useState(false);

  const goods = useSelector(types.getProducts);
  const categories = useSelector(types.getCategories);
  const specCategs = useSelector(types.getSpecCateg);
  const getColors = useQuery(getColorsQuery);

  const sortedValue = useMemo(() => searchParams.get(sortBy), [searchParams]);
  const currentPage = useMemo(() => searchParams.get("page"), [searchParams]);
  const filterPrice = useMemo(() => searchParams.get("Цена"), [searchParams]);
  const filterColor = useMemo(() => searchParams.get("Цвет"), [searchParams]);
  const filterSizes = useMemo(() => searchParams.get("Размер"), [searchParams]);

  const openFilters = () => {
    setIsOpen(!isOpen);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!currentPage && products.length) {
      console.log("in");
      searchParams.set("page", "1");

      history.push({
        search: searchParams.toString(),
      });
    }
  }, [currentPage, searchParams, products, history]);

  useEffect(() => {
    const category = location.pathname.split("/").filter((c) => c)[0];
    const currentCategory = categories.find(
      (categ) => handleTranslit(categ.category) === category
    );

    prodListGoods(
      currentCategory,
      setCategory,
      goods,
      setProducts,
      specCategs,
      category,
      setSpecCategory,
      location.pathname,
      setSubsName
    );
  }, [goods, location, categories, specCategs]);

  useEffect(() => {
    if (getColors.data && getColors.data.colors) {
      setColors(getColors.data.colors);
    }
  }, [getColors]);

  const clearAll = () => {
    history.push({
      search: "",
    });
  };

  useEffect(() => {
    searchParams.delete("Цвет");

    history.push({
      search: searchParams.toString(),
    });
    // eslint-disable-next-line
  }, [filterPrice]);

  const handleCreateTitle = () => {
    if (category && subsName) {
      return `${category.category} - ${subsName}`;
    } else if (category) {
      return category.category;
    } else {
      return specCategory?.name || "";
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const handleGetPrices = useMemo(() => prodsSettings.gPrices(products), [
    products,
  ]);

  const sortedProducts = useMemo(
    () => prodsSettings.sortByDropDown(sortedValue || "", products),
    [products, sortedValue]
  );

  const filterByPrice = useMemo(
    () => prodsSettings.fPrice(filterPrice || "", sortedProducts),
    [filterPrice, sortedProducts]
  );

  const handleGetColors = useMemo(
    () => prodsSettings.gColors(filterByPrice, colors),
    [filterByPrice, colors]
  );

  const filterByColor = useMemo(
    () => prodsSettings.fColors(filterColor || "", filterByPrice, colors),
    [filterColor, colors, filterByPrice]
  );

  const handleGetSizes = useMemo(
    () => prodsSettings.gSizes(filterByColor, products),
    [filterByColor, products]
  );

  const filterBySize = useMemo(
    () => prodsSettings.fSizes(filterSizes || "", filterByColor),
    [filterSizes, filterByColor]
  );

  const pagProducts = useMemo(
    () =>
      filterBySize.slice(
        perPage * (((currentPage && +currentPage) || 0) - 1),
        perPage * ((currentPage && +currentPage) || 1)
      ),
    [filterBySize, currentPage]
  );

  return (
    <div className="ProductsList Page__Wrap">
      <div className="ProductsList__Wrap">
        <h1 className="ProductsList__Title">{handleCreateTitle()}</h1>
        <div className="ProductsList__Info">
          <div
            className="ProductsList__FilterName ProductsList__FilterName--tablet"
            onClick={openFilters}
          >
            ФИЛЬТР
          </div>
          <p className="ProductsList__InfoCount">{`${
            currentPage && +currentPage * perPage > products.length
              ? products.length
              : currentPage && +currentPage * perPage
          } из ${products.length}`}</p>
          <div className="ProductsList__SelectWrap">
            <SelectDropDown
              values={[
                "Новизне",
                "От дешевых к дорогим",
                "От дорогих к дешевым",
              ]}
            />
          </div>
        </div>
        <div className="ProductsList__ProductsWrap">
          <div
            className={cn({
              ProductsList__Filters: true,
              "ProductsList__Filters--open": isOpen,
            })}
          >
            <div className="ProductsList__TabletFilter">
              <p className="ProductsList__TabletText">ФИЛЬТР</p>
              <div className="ProductsList__TabletX" onClick={openFilters} />
            </div>
            <div className="ProductsList__FilterName">ФИЛЬТР</div>
            <div className="ProductsList__FilterTabletWrap">
              <FilterBy name="Цена" options={handleGetPrices} />
              <FilterBy name="Цвет" options={handleGetColors} />
              <FilterBy name="Размер" options={handleGetSizes} />
            </div>
            <p onClick={clearAll} className="ProductsList__ClearFilters">
              Очистить все
            </p>
            <div className="ProductsList__ClearTabl">
              <p onClick={clearAll} className="ProductsList__ClearTabl--clear">
                Очистить все
              </p>
              <p
                onClick={() => setIsOpen(!isOpen)}
                className="ProductsList__ClearTabl--clear"
              >
                Ок
              </p>
            </div>
          </div>
          <div className="ProductsList__ProdsWrap">
            <ul
              className="ProductsList__Prods"
              style={{
                gridTemplateRows: `repeat(${Math.ceil(
                  isOpen ? 2 : pagProducts.length / 3
                )}, minmax(337px, 1fr))`,
              }}
            >
              {pagProducts.map((prod) => (
                <ProductCard prod={prod} key={prod.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Pagination
        pagesCount={Math.ceil(products.length / perPage)}
        start={!!products.length}
      />
    </div>
  );
};
