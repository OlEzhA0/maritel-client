import React, { useState, useEffect } from "react";
import "./ProductPageQuantity.scss";
import cn from "classnames";
interface Props {
  quantity: string;
  setQuantity: (q: string) => void;
  choosenSize: string;
  product: Products;
}

export const ProductPageQuantity: React.FC<Props> = ({
  quantity,
  setQuantity,
  choosenSize,
  product,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantityConf, setQuantityConf] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  useEffect(() => {
    const size = product.sizes.find((s) => s.size === choosenSize);
    if (choosenSize && size && +size.stock! < 4) {
      setQuantityConf(new Array(+size.stock).fill(0).map((_, i) => `${i + 1}`));
    }
  }, [choosenSize, product]);

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
            src="/images/productPage/arrowSelect.svg"
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
