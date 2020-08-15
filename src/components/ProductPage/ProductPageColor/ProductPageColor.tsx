import React from "react";
import "./ProductPageColor.scss";

interface Props {
  colors: ColorTypes[];
  product: Products;
}

export const ProductPageColor: React.FC<Props> = ({ colors, product }) => (
  <p className="ProductPageColor__ColorName">
    Цвет:{" "}
    <span className="ProductPageColor__ColorNameSpan">
      {colors.find((col) => product.color === col.id)?.name}
    </span>
  </p>
);
