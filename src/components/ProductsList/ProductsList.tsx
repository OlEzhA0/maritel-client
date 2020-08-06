import React, { useState, useEffect } from "react";
import "./ProductsList.scss";
import { useSelector } from "react-redux";
import { getProducts, getCategories } from "../../store/actionsTypes";
import { useLocation } from "react-router-dom";
import translit from "cyrillic-to-translit-js";
import { splitValue } from "../../helpers";
import { ProductCard } from "../ProductCard";

export const ProductsList = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<CategoriesTypes>();
  const goods = useSelector(getProducts);
  const categories = useSelector(getCategories);
  useEffect(() => {
    const category = location.pathname.split("/").filter((c) => c)[0];
    const currentCategory = categories.find(
      (categ) =>
        new translit().transform(categ.category.toLocaleLowerCase(), "+") ===
        category
    );
    setCategory(currentCategory);

    if (location.pathname.includes("/Vse-tovari")) {
      const filteredGoods = goods.filter(
        (good) => good.type.split(splitValue)[0] === currentCategory?.id
      );

      setProducts(filteredGoods);
    }
  }, [goods, location, categories]);
  return (
    <div className="ProductsList Page__Wrap">
      <div className="ProductsList__Wrap">
        <h1 className="ProductsList__Title">{category?.category}</h1>
        <div className="ProductsList__ProductsWrap">
          <div className="ProductsList__Filters"></div>
          <ul className="ProductsList__Prods">
            {products.map((prod) => (
              <ProductCard prod={prod} key={prod.id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
