import React from "react";
import "./ProductPageSizes.scss";
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
        {product.sizes.map(
          (size) =>
            +size.stock >= 1 && (
              <li
                key={size.size}
                className={cn({
                  ProductPageSizes__Size: true,
                  "ProductPageSizes__Size--choosen": size.size === choosenSize,
                })}
                onClick={() => {
                  setChoosenSize(size.size);
                }}
              >
                {size.size}
              </li>
            )
        )}
      </ul>
    </div>
  </div>
);
