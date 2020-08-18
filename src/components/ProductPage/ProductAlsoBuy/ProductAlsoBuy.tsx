import React, { useState, useEffect } from "react";
import "./ProductAlsoBuy.scss";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts, getCategories } from "../../../store/actionsTypes";
import { splitValue } from "../../../helpers";
import { handleCreateLink } from "../../../helpers/createLink";

export const ProductAlsoBuy = () => {
  const location = useLocation();

  const [products, setProducts] = useState<Products[]>([]);

  const goods = useSelector(getProducts);
  const categories = useSelector(getCategories);

  useEffect(() => {
    const uuid = location.pathname.split("/")[
      location.pathname.split("/").length - 1
    ];

    const currentProd = goods.find((good) => good.uuid === uuid);
    const prods = goods.filter(
      (good) =>
        good.type === currentProd?.type ||
        good.type.split(splitValue)[0] ===
          currentProd?.type.split(splitValue)[0]
    );

    if (prods.length < 4) {
      setProducts(
        [...prods, ...goods.sort((a, b) => +b.price - +a.price)]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
      );
    } else {
      setProducts(prods.sort(() => Math.random() - 0.5).slice(0, 4));
    }
  }, [goods, location.pathname, categories]);

  const withDots = (title: string) => {
    return `${title.slice(0, 22)}...`;
  };

  return (
    <div className="ProductAlsoBuy">
      <div className="ProductAlsoBuy__Wrap">
        <p className="ProductAlsoBuy__Title">также покупают</p>
        <ul className="ProductAlsoBuy__List">
          {products.map((prod) => (
            <li className="ProductAlsoBuy__Item" key={prod.id}>
              <Link
                to={() => handleCreateLink(prod, categories)}
                className="ProductAlsoBuy__Link"
              >
                <div className="ProductAlsoBuy__ImgWrap">
                  <img
                    src={prod.previewPhoto}
                    alt="preview model ph"
                    className="ProductAlsoBuy__PreviewPh"
                  />
                </div>
                <div className="ProductAlsoBuy__Info">
                  <p className="ProductAlsoBuy__ProdTitle">{prod.title}</p>
                  <p className="ProductAlsoBuy__ProdTitle ProductAlsoBuy__ProdTitle--mobile">
                    {prod.title.length > 22 ? withDots(prod.title) : prod.title}
                  </p>
                  <p className="ProductAlsoBuy__ProdPrice">{prod.price} грн.</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
