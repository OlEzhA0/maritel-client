import React from "react";
import "./CartPage.scss";
import { useSelector } from "react-redux";
import { getCart } from "../../store/actionsTypes";
import { CartProdItem } from "../../components/Cart/CartProdItem";

export const CartPage = () => {
  const cart = useSelector(getCart);
  return (
    <div className="CartPage Page__Wrap">
      <div className="CartPage__RegisterOrder">
        <p className="CartPage__Hint">
          БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ НА СУММУ ОТ 1500 ГРН.
        </p>
        <div className="CartPage__InfoTitle">
          <h1 className="CartPage__TitlePage">корзина</h1>
          <p className="CartPage__CountProds">({cart.length} товара)</p>
        </div>
        <ul className="CartPage__ProdsList">
          {cart.map((prod) => (
            <CartProdItem
              key={prod.prodUuid + prod.size}
              uuid={prod.prodUuid}
              size={prod.size}
              quantity={prod.quantity}
            />
          ))}
        </ul>
      </div>

      <div className="CartPage__ConfirmOrder"></div>
    </div>
  );
};
