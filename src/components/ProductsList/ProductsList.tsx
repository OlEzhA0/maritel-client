import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleTranslit } from "../../helpers/links";
import { prodListGoods } from "../../helpers/prodsListGoods";
import {
  getCategories,
  getProducts,
  getSpecCateg,
} from "../../store/actionsTypes";
import { ProductCard } from "../ProductCard";
import "./ProductsList.scss";

export const ProductsList = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Products[]>([]);
  const [category, setCategory] = useState<CategoriesTypes>();
  const [specCategory, setSpecCategory] = useState<SpecProdsCategory>();
  const [subsName, setSubsName] = useState("");
  const goods = useSelector(getProducts);
  const categories = useSelector(getCategories);
  const specCategs = useSelector(getSpecCateg);

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

  const handleCreateTitle = () => {
    if (category && subsName) {
      return `${category.category} - ${subsName}`;
    } else if (category) {
      return category.category;
    } else {
      return specCategory?.name || "";
    }
  };

  return (
    <div className="ProductsList Page__Wrap">
      <div className="ProductsList__Wrap">
        <h1 className="ProductsList__Title">{handleCreateTitle()}</h1>
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
