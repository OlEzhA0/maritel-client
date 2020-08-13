import React, { useState, useRef, useEffect } from "react";
import "./ProductPageInfoCard.scss";
import cn from "classnames";
interface Props {
  title: string;
  text: string;
}

export const ProductPageInfoCard: React.FC<Props> = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const myRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    console.log(myRef.current?.clientHeight);
    console.log(myRef.current?.offsetHeight);
  }, [myRef]);
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
          "ProductPageInfoCard__Text--visible": isOpen,
        })}
        ref={myRef}
      >
        {text}
      </p>
    </div>
  );
};
