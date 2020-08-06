import React from "react";
import "./ProductCard.scss";
import { useSelector } from "react-redux";
import { getSpecCateg } from "../../store/actionsTypes";

interface Props {
  prod: Products;
}

export const ProductCard: React.FC<Props> = ({ prod }) => {
  const specCateg = useSelector(getSpecCateg);

  return (
    <li className="ProductCard">
      <div className="ProductCard__ImgWrap">
        <img
          src={prod.previewPhoto}
          alt="preview ph"
          className="ProductCard__Img"
        />
        <div className="ProductCard__SpecCateg">
          {
            specCateg.find((spec) =>
              spec.products.some((specProd) => specProd === prod.id)
            )?.name
          }
        </div>
      </div>
      <p className="ProductCard__Title">{prod.title}</p>
      <div className="ProductCard__Price">
        {prod.lastPrice ? (
          <>
            <span className="ProductCard__LastPrice">{prod.lastPrice} грн</span>
            <span className="ProductCard__CurrentPrice ProductCard__HotPrice">
              {prod.price} грн
            </span>
          </>
        ) : (
          <span className="ProductCard__CurrentPrice">{prod.price} грн</span>
        )}
      </div>
    </li>
  );
};
