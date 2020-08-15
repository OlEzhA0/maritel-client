import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-apollo";
import { productQuery, getColorsQuery, splitValue } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import { useSelector } from "react-redux";
import { getProducts, getCategories } from "../../store/actionsTypes";
import * as Prod from "../../components/ProductPage";

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
      <Prod.ProductPagePhotos
        product={product}
        generalPhoto={generalPhoto}
        handleSetGeneralPhoto={handleSetGeneralPhoto}
        generalPhotoLoad={generalPhotoLoad}
        setGeneralPhotoLoad={setGeneralPhotoLoad}
      />
      <div className="ProductPage__Info">
        <Prod.ProductPageProdInfo product={product} />
        <div className="ProductPage__ProdGeneralInfo">
          <Prod.ProductPageColor colors={colors} product={product} />
          <Prod.ProductPageRelated
            colors={colors}
            relatedProds={relatedProds}
            product={product}
            generalPathName={generalPathName}
          />
          <Prod.ProductPageSizes
            prodType={
              categories.find(
                (categ) => categ.id === product.type.split(splitValue)[0]
              )?.category!
            }
            product={product}
            choosenSize={choosenSize}
            setChoosenSize={setChoosenSize}
          />
          <Prod.ProductPageQuantity
            quantity={quantity}
            setQuantity={setQuantity}
            choosenSize={choosenSize}
            product={product}
          />
          <Prod.ProductPageAddCart choosenSize={choosenSize} />
        </div>
        <div className="ProductPage__Descr">
          <p className="ProductPage__DescrText">{product.descr}</p>
        </div>
        <Prod.ProductPageInfoCard
          title="Параметры модели"
          text={product.modelParam}
        />
        <Prod.ProductPageInfoCard
          title="Уход за изделием"
          text={product.care}
        />
        <Prod.ProductPageInfoCard title="Состав" text={product.composition} />
      </div>
    </div>
  ) : (
    <div className="Page__Wrap">
      <SpinnerLoader />
    </div>
  );
};
