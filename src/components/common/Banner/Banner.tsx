import cn from "classnames";
import React, { useState } from "react";
import "./Banner.scss";
import { Link } from "react-router-dom";

interface Props {
    imgLink?: string;
    text?: string;
    link?: string;
    buttonText?: string;
}

export const Banner: React.FC<Props> = ({
    imgLink = "images/homepage/main.jpg",
    text = "Влюбитесь с первого взгляда",
    link = "",
    buttonText = "Перейти к летним новинкам",
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
                {!link ? (
                    <Link to={link} className="Banner__Link">
                        {buttonText}
                    </Link>
                ) : (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Banner__Link"
                    >
                        {buttonText}
                    </a>
                )}
            </div>
            {!showImg && <div className="Banner__Preload" />}
        </div>
    );
};
