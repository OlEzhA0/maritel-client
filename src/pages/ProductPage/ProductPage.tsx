import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-apollo";
import { productQuery, getColorsQuery, splitValue } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import cn from "classnames";
import { ProductPageImg } from "../../components/ProductPageImg";
import { useSelector } from "react-redux";
import { getProducts, getCategories } from "../../store/actionsTypes";
import { ProductPageRelated } from "../../components/ProductPageRelated";
import { ProductPageSizes } from "../../components/ProductPageSizes";
import { ProductPageQuantity } from "../../components/ProductPageQuantity";

export const ProductPage = () => {
  const location = useLocation();
  const prodUuid = location.pathname.split("/").filter((p) => p)[3];
  const getProduct = useQuery(productQuery, { variables: { uuid: prodUuid } });
  const generalPathName = location.pathname.slice(1, -7);

  const [product, setProduct] = useState<Products>();
  const [generalPhoto, setGeneralPhoto] = useState("");
  const [generalPhotoLoad, setGeneralPhotoLoad] = useState(false);
  const [colors, setColors] = useState<ColorTypes[]>([]);
  const [relatedProds, setRelatedProds] = useState<Products[]>([]);
  const [choosenSize, setChoosenSize] = useState("");
  const [quantity, setQuantity] = useState("1");
  const getColors = useQuery(getColorsQuery);
  const products = useSelector(getProducts);
  const categories = useSelector(getCategories);

  useEffect(() => {
    if (product && products.length) {
      setRelatedProds([
        ...products.filter(
          (prod) =>
            prod.title === product.title &&
            prod.id !== product.id &&
            prod.color !== product.color
        ),
        product,
      ]);
    }
  }, [products, product]);

  useEffect(() => {
    if (getProduct && getProduct.data) {
      setProduct({
        ...getProduct.data.product,
        sizes: JSON.parse(getProduct.data.product.sizes),
      });
      setGeneralPhoto(getProduct.data.product.previewPhoto);
    }
  }, [getProduct]);

  const handleSetGeneralPhoto = (ph: string) => {
    setGeneralPhoto(ph);
  };

  useEffect(() => {
    if (getColors && getColors.data && getColors.data.colors) {
      setColors(getColors.data.colors);
    }
  }, [getColors]);

  useEffect(() => {
    setChoosenSize("");
  }, [location]);

  return product && colors.length ? (
    <div className="ProductPage Page__Wrap">
      <div className="ProductPage__PhotosWrap">
        <div className="ProductPage__Photos">
          {product?.photos.map((ph) => (
            <ProductPageImg
              key={ph}
              ph={ph}
              generalPhoto={generalPhoto}
              handleSetGeneralPhoto={handleSetGeneralPhoto}
              width={74}
              height={100}
            />
          ))}
        </div>
        <div className="ProductPage__GeneralContainer">
          <img
            src={generalPhoto}
            alt="general model"
            className={cn({
              ProductPage__GeneralImg: true,
              "ProductPage__GeneralImg--loaded": generalPhotoLoad,
            })}
            onLoad={() => setGeneralPhotoLoad(true)}
          />
          {!generalPhotoLoad && <SpinnerLoader />}
        </div>
      </div>
      <div className="ProductPage__Info">
        <h2 className="ProductPage__ShopTitle">MARITEL’</h2>
        <h1 className="ProductPage__ProdTitle">{product.title}</h1>
        <div className="ProductPage__Price">
          {product.lastPrice ? (
            <>
              <span className="ProductPage__LastPrice">
                {product.lastPrice} грн.
              </span>
              <span className="ProductPage__NewPrice">
                {product.price} грн.
              </span>
            </>
          ) : (
            <span className="ProductPage__OnePrice">{product.price} грн.</span>
          )}
        </div>
        <div className="ProductPage__ColorInfo">
          <p className="ProductPage__ColorName">
            Цвет:{" "}
            <span className="ProductPage__ColorNameSpan">
              {colors.find((col) => product.color === col.id)?.name}
            </span>
          </p>
          <ProductPageRelated
            colors={colors}
            relatedProds={relatedProds}
            product={product}
            generalPathName={generalPathName}
          />
        </div>
        <ProductPageSizes
          prodType={
            categories.find(
              (categ) => categ.id === product.type.split(splitValue)[0]
            )?.category!
          }
          product={product}
          choosenSize={choosenSize}
          setChoosenSize={setChoosenSize}
        />
        <ProductPageQuantity quantity={quantity} setQuantity={setQuantity} />
        <div className="ProductPage__AddCart">
          <button type="button" className="ProductPage__AddCartButton">
            добавить в корзину
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="Page__Wrap">
      <SpinnerLoader />
    </div>
  );
};
