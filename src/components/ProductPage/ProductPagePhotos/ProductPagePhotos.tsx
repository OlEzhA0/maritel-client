import React from "react";
import "./ProductPagePhotos.scss";
import { ProductPageImg } from "../ProductPageImg";
import cn from "classnames";
import { SpinnerLoader } from "../../SpinnerLoader";
import { useSelector } from "react-redux";
import { getQickViewStatus } from "../../../store/actionsTypes";

interface Props {
  product: Products;
  generalPhoto: string;
  handleSetGeneralPhoto: (ph: string) => void;
  generalPhotoLoad: boolean;
  setGeneralPhotoLoad: (st: boolean) => void;
}

export const ProductPagePhotos: React.FC<Props> = ({
  product,
  generalPhoto,
  handleSetGeneralPhoto,
  generalPhotoLoad,
  setGeneralPhotoLoad,
}) => {
  const quickStatus = useSelector(getQickViewStatus);
  return (
    <div className="ProductPagePhotos__PhotosWrap">
      <div className="ProductPagePhotos__Photos">
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
      <div className="ProductPagePhotos__GeneralContainer">
        <img
          src={generalPhoto}
          alt="general model"
          className={cn({
            ProductPagePhotos__GeneralImg: true,
            "ProductPagePhotos__GeneralImg--loaded": generalPhotoLoad,
            "ProductPagePhotos__GeneralImg--popup": quickStatus,
          })}
          onLoad={() => setGeneralPhotoLoad(true)}
        />
        {!generalPhotoLoad && <SpinnerLoader />}
      </div>
    </div>
  );
};
