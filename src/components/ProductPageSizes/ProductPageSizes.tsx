import React from "react";
import "./ProductPageSizes.scss";
import { SHOES_SIZES_CONFIG, SIZES_CONFIG } from "../../helpers";
import cn from "classnames";

interface Props {
  prodType: string;
  product: Products;
  choosenSize: string;
  setChoosenSize: (size: string) => void;
}

export const ProductPageSizes: React.FC<Props> = ({
  prodType,
  product,
  choosenSize,
  setChoosenSize,
}) => (
  <div className="ProductPageSizes">
    <div className="ProductPageSizes__Title">
      <p className="ProductPageSizes__Text">Размер:</p>
      <p className="ProductPageSizes__Sheets">РАЗМЕРНАЯ СЕТКА</p>
    </div>
    <div className="ProductPageSizes__Wrap">
      <ul className="ProductPageSizes__List">
        {prodType === "Обувь"
          ? SHOES_SIZES_CONFIG.map((size) => (
              <li
                key={size}
                className={cn({
                  ProductPageSizes__Size: true,
                  "ProductPageSizes__Size--choosen": size === choosenSize,
                  "ProductPageSizes__Size--active": product.sizes.some(
                    (prSize) =>
                      prSize.size === size &&
                      +product.sizes.find((size) => size.size === choosenSize)!
                        .stock > 0
                  ),
                })}
                onClick={() => {
                  if (product.sizes.some((pr) => pr.size === size)) {
                    setChoosenSize(size);
                  }
                }}
              >
                {size}
              </li>
            ))
          : SIZES_CONFIG.map((size) => (
              <li
                key={size}
                className={cn({
                  ProductPageSizes__Size: true,
                  "ProductPageSizes__Size--choosen": size === choosenSize,
                  "ProductPageSizes__Size--active": product.sizes.some(
                    (prSize) =>
                      prSize.size === size &&
                      +product.sizes.find((prSize) => prSize.size === size)!
                        .stock > 0
                  ),
                })}
                onClick={() => {
                  if (product.sizes.some((pr) => pr.size === size)) {
                    setChoosenSize(size);
                  }
                }}
              >
                {size}
              </li>
            ))}
      </ul>
    </div>
  </div>
);
