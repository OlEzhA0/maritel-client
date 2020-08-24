import React from "react";
import "./ProductPageAddCart.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/actionCreators";

interface Props {
  choosenSize: string;
  quantity: string;
  prodUuid: string;
}

export const ProductPageAddCart: React.FC<Props> = ({
  choosenSize,
  quantity,
  prodUuid,
}) => {
  const disptach = useDispatch();

  return (
    <button
      type="button"
      className={cn({
        ProductPageAddCart__Button: true,
        "ProductPageAddCart__Button--dis": !choosenSize,
      })}
      disabled={!choosenSize}
      onClick={() => {
        disptach(addToCart(prodUuid, quantity, choosenSize));
      }}
    >
      добавить в корзину
    </button>
  );
};
