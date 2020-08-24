import React from "react";
import "./CartPopup.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartPopupStatus,
  getCart,
  getProducts,
} from "../../../store/actionsTypes";
import { SetPopupCartStatus } from "../../../store/actionCreators";
import { CartPopupItem } from "../CartPopupItem";
import { Link } from "react-router-dom";

export const CartPopup = () => {
  const cartPopupStatus = useSelector(getCartPopupStatus);
  const disptach = useDispatch();
  const cart = useSelector(getCart);
  const goods = useSelector(getProducts);

  const handleGetAllPrice = () => {
    return cart.reduce((accum, value) => {
      const prod = goods.find((g) => g.uuid === value.prodUuid)!;
      const addPrice = +prod.price * +value.quantity;
      return accum + addPrice;
    }, 0);
  };

  return cartPopupStatus ? (
    cart.length > 0 ? (
      <div
        className="CartPopup"
        onMouseEnter={() => disptach(SetPopupCartStatus(true))}
        onMouseLeave={() => disptach(SetPopupCartStatus(false))}
      >
        <div className="CartPopup__Prods">
          <ul className="CartPopup__List">
            {cart.map((c) => {
              const prod = goods.find((good) => good.uuid === c.prodUuid)!;
              return (
                <CartPopupItem
                  key={prod.id + c.size}
                  previewPhoto={prod.previewPhoto}
                  title={prod.title}
                  type={prod.type}
                  price={prod.price}
                  size={c.size}
                  prod={prod}
                />
              );
            })}
          </ul>
        </div>
        <div className="CartPopup__Buttons">
          <p className="CartPopup__AllPrice">
            сумма заказа{" "}
            <span className="CartPopup__Price">{handleGetAllPrice()} грн.</span>
          </p>
          <Link to="/cart" className="CartPopup__LinkToOrder">
            оформить заказ
          </Link>
        </div>
      </div>
    ) : (
      <div
        className="CartPopup CartPopup__Empty"
        onMouseEnter={() => disptach(SetPopupCartStatus(true))}
        onMouseLeave={() => disptach(SetPopupCartStatus(false))}
      >
        корзина пустая.
      </div>
    )
  ) : (
    <div className="CartPopup__False" />
  );
};
