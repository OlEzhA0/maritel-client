import React, { useState, useEffect, useMemo } from "react";
import "./ProductPage.scss";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "react-apollo";
import { productQuery, getColorsQuery, splitValue } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import { useSelector } from "react-redux";
import {
  getProducts,
  getCategories,
  getIsTablet,
} from "../../store/actionsTypes";
import * as Prod from "../../components/ProductPage";
import { handleDecode, handleTranslit } from "../../helpers/links";

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
  const isTablet = useSelector(getIsTablet);

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

  const handleCreateMobileInfo = useMemo(() => {
    if (isTablet) {
      const category = handleDecode(
        location.pathname.split("/")[2].split(/\+|-/g).join(" ")
      );

      if (category === "ВСЕ ТОВАРИ") {
        return "ВСЕ ТОВАРЫ";
      } else if (category === "СПЕCИАЛНОЕ") {
        return "СПЕЦИАЛЬНОЕ";
      } else {
        return categories.find(
          (cat) =>
            handleTranslit(cat.category) === location.pathname.split("/")[2]
        )?.category;
      }
    }
  }, [categories, location.pathname, isTablet]);

  console.log();

  return product && colors.length ? (
    <div className="ProductPage Page__Wrap">
      <Link
        className="ProductPage__MobileInfo"
        to={`/${location.pathname.split("/").slice(1, 3).join("/")}`}
      >
        <img
          src="images/productPage/arrowback.svg"
          alt="arrow"
          className="ProductPage__MobileInfoBack"
        />
        <p className="ProductPage__MobileInfoCateg">
          {handleCreateMobileInfo?.toLocaleUpperCase()}
        </p>
      </Link>
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
