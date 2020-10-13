import cn from "classnames";
import React, { useState } from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";

interface Props {
  imgLink: string;
  text: string;
  link: string;
  buttonText: string;
}

export const Banner: React.FC<Props> = ({
  imgLink,
  text,
  link,
  buttonText,
}) => {
  const [showImg, setShowImg] = useState(false);

  return (
    <div className="Banner__ImgWrap">
      <img
        src={imgLink}
        alt="main"
        className={cn({
          Banner__Img: true,
          "Banner__Img--loaded": showImg,
        })}
        onLoad={() => setShowImg(true)}
      />
      <div className="Banner__Settings">
        <p className="Banner__Text">{text}</p>
        <Link to={link} className="Banner__Link">
          {buttonText}
        </Link>
      </div>
      {!showImg && <div className="Banner__Preload" />}
    </div>
  );
};
