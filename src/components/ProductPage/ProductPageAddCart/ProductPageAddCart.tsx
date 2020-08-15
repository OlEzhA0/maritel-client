import React from "react";
import "./ProductPageAddCart.scss";

interface Props {
  choosenSize: string;
}

export const ProductPageAddCart: React.FC<Props> = ({ choosenSize }) => (
  <button
    type="button"
    className="ProductPageAddCart__Button"
    disabled={!choosenSize}
  >
    добавить в корзину
  </button>
);
