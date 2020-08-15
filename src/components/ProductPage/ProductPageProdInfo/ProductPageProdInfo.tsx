import React from "react";
import "./ProductPageProdInfo.scss";

interface Props {
  product: Products;
}

export const ProductPageProdInfo: React.FC<Props> = ({ product }) => (
  <>
    <h2 className="ProductPageProdInfo__ShopTitle">MARITEL’</h2>
    <h1 className="ProductPageProdInfo__ProdTitle">{product.title}</h1>
    <div className="ProductPageProdInfo__Price">
      {product.lastPrice ? (
        <>
          <span className="ProductPageProdInfo__LastPrice">
            {product.lastPrice} грн.
          </span>
          <span className="ProductPageProdInfo__NewPrice">{product.price} грн.</span>
        </>
      ) : (
        <span className="ProductPageProdInfo__OnePrice">{product.price} грн.</span>
      )}
    </div>
  </>
);
