import React, { useState, useRef } from "react";
import "./ProductPageInfoCard.scss";
import cn from "classnames";
interface Props {
  title: string;
  text: string;
}

export const ProductPageInfoCard: React.FC<Props> = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="ProductPageInfoCard">
      <h3
        className="ProductPageInfoCard__Title"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          paddingBottom: `${
            !isOpen ? 0 : (myRef.current?.clientHeight || 0) + 27
          }px`,
        }}
      >
        {title}{" "}
        <span
          className={cn({
            ProductPageInfoCard__Arrow: true,
            "ProductPageInfoCard__Arrow--close": !isOpen,
          })}
        />{" "}
      </h3>
      <p
        className={cn({
          ProductPageInfoCard__Text: true,
        })}
        ref={myRef}
      >
        {text}
      </p>
    </div>
  );
};
