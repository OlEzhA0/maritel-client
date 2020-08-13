import React, { useState, useEffect } from "react";
import "./ProductPageQuantity.scss";
import cn from "classnames";
interface Props {
  quantity: string;
  setQuantity: (q: string) => void;
}

const quantityConf = ["1", "2", "3", "4"];

export const ProductPageQuantity: React.FC<Props> = ({
  quantity,
  setQuantity,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeQuantity = (q: string) => {
    setQuantity(q);
    setIsOpen(false);
  };

  const clickSubscribe = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.removeEventListener("click", clickSubscribe);
    } else {
      document.documentElement.addEventListener("click", clickSubscribe);
    }
  }, [isOpen]);

  return (
    <div className="ProductPageQuantity">
      <span className="ProductPageQuantity__Name">Количество:</span>
      <div className="ProductPageQuantity__Select">
        <p
          className="ProductPageQuantity__Current"
          onClick={() => setIsOpen(!isOpen)}
        >
          {quantity}{" "}
          <img
            src="images/productPage/arrowSelect.svg"
            alt="arrow"
            className={cn({
              ProductPageQuantity__Arrow: true,
              "ProductPageQuantity__Arrow--up": !isOpen,
            })}
          />
          {isOpen && <label className="ProductPageQuantity--after" />}
        </p>
        <ul
          className={cn({
            ProductPageQuantity__List: true,
            "ProductPageQuantity__List--open": isOpen,
          })}
        >
          {quantityConf
            .filter((q) => q !== quantity)
            .map((q) => (
              <li
                key={q}
                className="ProductPageQuantity__Item"
                onClick={() => handleChangeQuantity(q)}
              >
                {q}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
