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
import { SpinnerLoader } from "../SpinnerLoader";

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
  const [lastCurrentProds, setLastCurrentProds] = useState<Products[]>([]);

  const goods = useSelector(types.getProducts);
  const categories = useSelector(types.getCategories);
  const specCategs = useSelector(types.getSpecCateg);
  const getColors = useQuery(getColorsQuery);
  const wishList = useSelector(types.getWishList);

  const sortedValue = useMemo(() => searchParams.get(sortBy), [searchParams]);
  const currentPage = useMemo(() => searchParams.get("page") || "1", [
    searchParams,
  ]);
  const filterPrice = useMemo(() => searchParams.get("Цена"), [searchParams]);
  const filterColor = useMemo(() => searchParams.get("Цвет"), [searchParams]);
  const filterSizes = useMemo(() => searchParams.get("Размер"), [searchParams]);

  const isTablet = useSelector(types.getIsTablet);

  useEffect(() => {
    setSubsName("");
  }, [location]);

  const openFilters = () => {
    setIsOpen(!isOpen);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (products.length && !lastCurrentProds.length) {
      setLastCurrentProds(products);
    }

    // eslint-disable-next-line
  }, [products]);

  useEffect(() => {
    if (
      location.pathname.includes("wish-list") &&
      goods.length &&
      wishList.length
    ) {
      setProducts(
        wishList
          .map((id) => goods.find((prod) => prod.uuid === id)!)
          .filter((g) => g)
      );

      return;
    }
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
  }, [goods, location.pathname, categories, specCategs, wishList]);

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

  const handleGetPrices = useMemo(
    () => prodsSettings.gPrices(lastCurrentProds),
    [lastCurrentProds]
  );

  const sortedProducts = useMemo(
    () => prodsSettings.sortByDropDown(sortedValue || "", products),
    [products, sortedValue]
  );

  const filterByPrice = useMemo(
    () => prodsSettings.fPrice(filterPrice || "", sortedProducts),
    [filterPrice, sortedProducts]
  );

  const handleGetColors = useMemo(
    () => prodsSettings.gColors(lastCurrentProds, colors),
    [lastCurrentProds, colors]
  );

  const filterByColor = useMemo(
    () => prodsSettings.fColors(filterColor || "", filterByPrice, colors),
    [filterColor, colors, filterByPrice]
  );

  const handleGetSizes = useMemo(
    () => prodsSettings.gSizes(lastCurrentProds, products),
    [lastCurrentProds, products]
  );

  const filterBySize = useMemo(
    () => prodsSettings.fSizes(filterSizes || "", filterByColor),
    [filterSizes, filterByColor]
  );

  const pagProducts = useMemo(() => {
    setLastCurrentProds(filterBySize);

    return filterBySize.slice(
      perPage * (((currentPage && +currentPage) || 0) - 1),
      perPage * ((currentPage && +currentPage) || 1)
    );
    // eslint-disable-next-line
  }, [filterBySize, currentPage]);

  const makeTitle = () => {
    if (
      +currentPage &&
      +currentPage > 1 &&
      +currentPage < Math.ceil(filterBySize.length / perPage)
    ) {
      return `${perPage * +currentPage}`;
    } else if (
      +currentPage &&
      +currentPage > 1 &&
      +currentPage * perPage > products.length
    ) {
      if (
        (filterColor || filterSizes || filterPrice) &&
        +currentPage === Math.ceil(filterBySize.length / perPage)
      ) {
        return `${filterBySize.length}`;
      }
      return `${products.length}`;
    } else {
      if (+currentPage === Math.ceil(filterBySize.length / perPage)) {
        return `${filterBySize.length}`;
      }
      return `${pagProducts.length}`;
    }
  };

  return products.length > 0 ? (
    <div className="ProductsList Page__Wrap">
      <div className="ProductsList__Wrap">
        <h1 className="ProductsList__Title">
          {handleCreateTitle() || "список желаний"}
        </h1>
        <div className="ProductsList__Info">
          <div
            className="ProductsList__FilterName ProductsList__FilterName--tablet"
            onClick={openFilters}
          >
            ФИЛЬТР
          </div>
          <p className="ProductsList__InfoCount">{`${makeTitle()} из ${
            filterColor || filterPrice || filterSizes
              ? filterBySize.length
              : products.length
          }`}</p>
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
              <p
                onClick={() => setIsOpen(!isOpen)}
                className="ProductsList__ClearTabl--clear ProductsList__ClearTabl--accept"
              >
                Применить
              </p>
              <p onClick={clearAll} className="ProductsList__ClearTabl--clear">
                Очистить все
              </p>
            </div>
          </div>
          <div className="ProductsList__ProdsWrap">
            <ul
              className="ProductsList__Prods"
              style={{
                gridTemplateRows: `repeat(${Math.ceil(
                  isTablet && !isOpen
                    ? pagProducts.length / 2
                    : isOpen
                    ? 2
                    : pagProducts.length / 3
                )}, minmax(${isTablet ? 210 : 337}px, 1fr))`,
              }}
            >
              {pagProducts.map((prod) => (
                <ProductCard prod={prod} key={prod.id} products={pagProducts} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Pagination
        pagesCount={
          filterColor || filterSizes || filterPrice
            ? Math.ceil(filterBySize.length / perPage)
            : Math.ceil(products.length / perPage)
        }
        start={!!products.length}
      />
    </div>
  ) : location.pathname.includes("wish-list") ? (
    <div className="ProductsList  Page__Wrap">
      <p className="ProductsList__NoProd">Нет товаров :(</p>
    </div>
  ) : (
    <div className="Page__Wrap">
      <SpinnerLoader />
    </div>
  );
};
