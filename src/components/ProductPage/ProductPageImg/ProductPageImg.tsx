import React, { useState } from "react";
import "./ProductPageImg.scss";
import cn from "classnames";
import { SpinnerLoader } from "../../SpinnerLoader";

interface Props {
  ph: string;
  generalPhoto: string;
  handleSetGeneralPhoto: (ph: string) => void;
  width: number;
  height: number;
  handleSlider?: (path: number) => void;
  i?: number;
}

export const ProductPageImg: React.FC<Props> = ({
  ph,
  generalPhoto,
  handleSetGeneralPhoto,
  width,
  height,
}) => {
  const [showImg, setShowImg] = useState(false);

  return (
    <div className="ProductPageImg__Wrap" style={{ width, height }}>
      <img
        src={ph}
        alt="model"
        className={cn({
          ProductPageImg__Photo: true,
          "ProductPageImg__Photo--current": ph === generalPhoto,
          "ProductPageImg__Photo--loaded": showImg,
        })}
        onClick={() => handleSetGeneralPhoto(ph)}
        onLoad={() => setShowImg(true)}
      />
      {!showImg && <SpinnerLoader />}
    </div>
  );
};
