import React, { useState } from "react";
import "./BackgroundMainImg.scss";
import cn from "classnames";
export const BackgroundMainImg = () => {
  const [showImg, setShowImg] = useState(false);

  return (
    <div className="BackgroundMainImg__ImgWrap">
      <img
        src="images/homepage/main.webp"
        alt="main"
        className={cn({
          BackgroundMainImg__Img: true,
          "BackgroundMainImg__Img--loaded": showImg,
        })}
        onLoad={() => setShowImg(true)}
      />
      {!showImg && <div className="BackgroundMainImg__Preload" />}
    </div>
  );
};
