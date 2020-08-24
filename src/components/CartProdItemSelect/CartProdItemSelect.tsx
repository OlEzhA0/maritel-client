import React from "react";
import "./CartProdItemSelect.scss";
import { useDispatch } from "react-redux";

interface Props {
  quantity: string;
  maxQ: string;
}

export const CartProdItemSelect: React.FC<Props> = ({ quantity, maxQ }) => {
  const dispatch = useDispatch();

  return (
    <div className="CartProdItemSelect">
      <p className="CartProdItemSelect__Main">
        {quantity} <img src="images/cart/selectArrow.svg" alt="arrow" />
      </p>
    </div>
  );
};
