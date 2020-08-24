import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import { getColorsQuery, splitValue } from "../../helpers";
import {
  getCategories,
  getProducts,
  getQickViewUuid,
  getCart,
} from "../../store/actionsTypes";
import * as Prod from "../ProductPage";
import { SpinnerLoader } from "../SpinnerLoader";
import "./ProductPageQuickView.scss";
import {
  setQucikViewStatus,
  setQucikViewUuid,
} from "../../store/actionCreators";

export const ProductPageQuickView = () => {
  const dispatch = useDispatch();
  const uuid = useSelector(getQickViewUuid);
  const getColors = useQuery(getColorsQuery);
  const products = useSelector(getProducts);
  const categories = useSelector(getCategories);

  const [product, setProduct] = useState<Products>();
  const [relatedProds, setRelatedProds] = useState<Products[]>([]);
  const [colors, setColors] = useState<ColorTypes[]>([]);
  const [generalPhoto, setGeneralPhoto] = useState("");
  const [generalPhotoLoad, setGeneralPhotoLoad] = useState(false);
  const [choosenSize, setChoosenSize] = useState("");
  const [quantity, setQuantity] = useState("1");
  const cart = useSelector(getCart);

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
  }, [product, products]);

  useEffect(() => {
    if (products.length) {
      setProduct(products.find((prod) => prod.uuid === uuid));
      setGeneralPhoto(
        products.find((prod) => prod.uuid === uuid)?.previewPhoto || ""
      );
      setChoosenSize("");
      setQuantity("1");
    }
  }, [uuid, products]);

  useEffect(() => {
    if (getColors && getColors.data) {
      setColors(getColors.data.colors);
    }
  }, [getColors, setColors]);

  const handleSetGeneralPhoto = (ph: string) => {
    setGeneralPhoto(ph);
  };

  useEffect(() => {
    setQuantity("1");
    setChoosenSize("");
  }, [cart]);

  return product && colors.length ? (
    <div className="ProductPageQuickView">
      <label className="ProductPageQuickView__CloseLabel">
        <button
          className="ProductPageQuickView__Close"
          type="button"
          onClick={() => {
            dispatch(setQucikViewStatus(false));
            dispatch(setQucikViewUuid(""));
          }}
        >
          <img
            src="/images/productPage/closeX2x.png"
            alt="close"
            className="ProductPageQuickView__Img"
          />
        </button>
      </label>
      <Prod.ProductPagePhotos
        product={product}
        generalPhoto={generalPhoto}
        handleSetGeneralPhoto={handleSetGeneralPhoto}
        generalPhotoLoad={generalPhotoLoad}
        setGeneralPhotoLoad={setGeneralPhotoLoad}
      />
      <div className="ProductPageQuickView__Info">
        <Prod.ProductPageProdInfo product={product} />
        <div className="ProductPageQuickView__ProdGeneralInfo">
          <Prod.ProductPageColor colors={colors} product={product} />
          <Prod.ProductPageRelated
            colors={colors}
            relatedProds={relatedProds}
            product={product}
            generalPathName={""}
            popup={true}
          />
          <div className="ProductPageQuickView__SizesWrap">
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
            <Prod.ProductPageAddCart
              choosenSize={choosenSize}
              prodUuid={product.uuid}
              quantity={quantity}
            />
          </div>
          <div className="ProductPageQuickView__Descr">
            <p className="ProductPageQuickView__DescrText">{product.descr}</p>
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
          <Prod.ProductShareProd />
        </div>
      </div>
    </div>
  ) : (
    <div className="ProductPageQuickView">
      <SpinnerLoader />
    </div>
  );
};
