import React, { useEffect, useRef, useState } from "react";
import "./ProductPagePhotos.scss";
import { ProductPageImg } from "../ProductPageImg";
import cn from "classnames";
import { SpinnerLoader } from "../../SpinnerLoader";
import { useSelector } from "react-redux";
import { getQickViewStatus, getIsTablet } from "../../../store/actionsTypes";

interface Props {
  product: Products;
  generalPhoto: string;
  handleSetGeneralPhoto: (ph: string) => void;
  generalPhotoLoad: boolean;
  setGeneralPhotoLoad: (st: boolean) => void;
  currentPath?: number;
  handleSlider?: (path: number) => void;
}

export const ProductPagePhotos: React.FC<Props> = ({
  product,
  generalPhoto,
  handleSetGeneralPhoto,
  generalPhotoLoad,
  setGeneralPhotoLoad,
  handleSlider,
  currentPath,
}) => {
  const quickStatus = useSelector(getQickViewStatus);
  const isTablet = useSelector(getIsTablet);
  const myRef = useRef<HTMLImageElement>(null);
  const [height, setHeight] = useState(300);

  useEffect(() => {
    setGeneralPhotoLoad(false);
  }, [currentPath, setGeneralPhotoLoad, generalPhoto]);

  useEffect(() => {
    setHeight(myRef.current?.offsetHeight || 300);
  }, [myRef, setHeight, generalPhoto]);

  return (
    <div className="ProductPagePhotos__PhotosWrap">
      <div className="ProductPagePhotos__Photos">
        {product?.photos.map((ph, i) => (
          <ProductPageImg
            key={ph}
            ph={ph}
            generalPhoto={generalPhoto}
            handleSetGeneralPhoto={handleSetGeneralPhoto}
            width={74}
            height={100}
            handleSlider={handleSlider}
            i={i}
          />
        ))}
      </div>
      <div
        className="ProductPagePhotos__GeneralContainer"
        style={{ minHeight: height }}
      >
        {product.photos.length > 1 && isTablet && handleSlider && (
          <button
            className="ProductPagePhotos__Slider ProductPagePhotos__SliderBack"
            onClick={() => handleSlider(-1)}
          >
            <img
              src="images/productPage/arrowSlider.svg"
              alt="arrow"
              className="ProductPagePhotos__SliderImg ProductPagePhotos__SliderImgBack"
            />
          </button>
        )}
        <img
          src={
            isTablet && product.photos.length > 1 && currentPath !== undefined
              ? product.photos[currentPath]
              : generalPhoto
          }
          alt="general model"
          className={cn({
            ProductPagePhotos__GeneralImg: true,
            "ProductPagePhotos__GeneralImg--loaded": generalPhotoLoad,
            "ProductPagePhotos__GeneralImg--popup": quickStatus,
          })}
          onLoad={() => setGeneralPhotoLoad(true)}
          ref={myRef}
        />
        {product.photos.length > 1 && isTablet && handleSlider && (
          <button
            className="ProductPagePhotos__Slider ProductPagePhotos__SliderNext"
            onClick={() => handleSlider(1)}
          >
            <img
              src="images/productPage/arrowSlider.svg"
              alt="arrow"
              className="ProductPagePhotos__SliderImg ProductPagePhotos__SliderImgNext"
            />
          </button>
        )}
        {!generalPhotoLoad && <SpinnerLoader />}
      </div>
    </div>
  );
};
