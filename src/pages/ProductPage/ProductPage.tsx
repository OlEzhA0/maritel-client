import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-apollo";
import { productQuery } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import cn from "classnames";

export const ProductPage = () => {
  const location = useLocation();
  const prodUuid = location.pathname.split("/").filter((p) => p)[3];
  const getProduct = useQuery(productQuery, { variables: { uuid: prodUuid } });
  const [product, setProduct] = useState<Products>();
  const [generalPhoto, setGeneralPhoto] = useState("");

  useEffect(() => {
    if (getProduct && getProduct.data) {
      setProduct(getProduct.data.product);
      setGeneralPhoto(getProduct.data.product.previewPhoto);
    }
  }, [getProduct]);

  const handleSetGeneralPhoto = (ph: string) => {
    setGeneralPhoto(ph);
  };

  return product ? (
    <div className="ProductPage Page__Wrap">
      <div className="ProductPage__PhotosWrap">
        <div className="ProductPage__Photos">
          {product?.photos.map((ph) => (
            <img
              key={ph}
              src={ph}
              alt="model"
              className={cn({
                ProductPage__Photo: true,
                "ProductPage__Photo--current": ph === generalPhoto,
              })}
              onClick={() => handleSetGeneralPhoto(ph)}
            />
          ))}
        </div>
        <div className="ProductPage__GeneralContainer">
          <img
            src={generalPhoto}
            alt="general model"
            className="ProductPage__GeneralImg"
          />
        </div>
      </div>
      <div className="ProductPage__Info">
        <h2 className="ProductPage__ShopTitle">MARITEL’</h2>
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
};
