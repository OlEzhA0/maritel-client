import React, { useState, useEffect } from "react";
import "./ProductCard.scss";
import { useSelector } from "react-redux";
import { getSpecCateg } from "../../store/actionsTypes";
import { SpinnerLoader } from "../SpinnerLoader";
import cn from "classnames";
import { getColorsQuery } from "../../helpers";
import { useQuery } from "react-apollo";

interface Props {
  prod: Products;
  products: Products[];
}

export const ProductCard: React.FC<Props> = ({ prod, products }) => {
  const specCateg = useSelector(getSpecCateg);
  const [showImg, setShowImg] = useState(false);
  const getColors = useQuery(getColorsQuery);
  const [colors, setColors] = useState<ColorTypes[]>([]);
  const [relatedColors, setRelatedColors] = useState<string[]>([]);
  useEffect(() => {
    if (getColors && getColors.data && getColors.data.colors) {
      setColors(getColors.data.colors);
    }
  }, [setColors, getColors]);

  useEffect(() => {
    const relPr = products.filter((pr) => pr.title === prod.title);
    const names = new Set();
    const stringsNames: string[] = [];

    relPr.forEach((pr) => {
      if (colors.find((col) => col.id === pr.color)) {
        names.add(colors.find((col) => col.id === pr.color)?.name!);
      }
    });
    names.forEach((name) => stringsNames.push(name as string));
    setRelatedColors(
      stringsNames.map((name) => colors.find((c) => c.name === name)?.link!)
    );
  }, [prod, products, colors]);

  return (
    <li className="ProductCard">
      <div className="ProductCard__ImgWrap">
        <img
          src={prod.previewPhoto}
          alt="preview ph"
          className={cn({
            ProductCard__Img: true,
            "ProductCard__Img--loaded": showImg,
          })}
          onLoad={() => setShowImg(true)}
        />
        {!showImg && <SpinnerLoader />}
        {specCateg.find((spec) =>
          spec.products.some((specProd) => specProd === prod.id)
        )?.name && (
          <div className="ProductCard__SpecCateg">
            {
              specCateg.find((spec) =>
                spec.products.some((specProd) => specProd === prod.id)
              )?.name
            }
          </div>
        )}
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
      <div className="ProductCard__RelatedProducts">
        {relatedColors.length > 1 && (
          <ul className="ProductCard__RelatedList">
            {relatedColors.map((rel) => (
              <li
                key={rel}
                className="ProductCard__RelatedItem"
              >
                <img
                  src={rel}
                  alt="color"
                  className="ProductCard__RelatedColor"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};
