import React, { useState, useEffect } from "react";
import "./ProductShareProd.scss";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../../../store/actionCreators";
import { getWishList, getQickViewUuid } from "../../../store/actionsTypes";
import cn from "classnames";

import { FacebookShareButton, PinterestShareButton } from "react-share";

type Props = {
    name: string;
    img: string;
};

export const ProductShareProd: React.FC<Props> = ({ name, img }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const wishList = useSelector(getWishList);
    const [uuid, setUuid] = useState(
        location.pathname.split("/")[location.pathname.split("/").length - 1]
    );

    const isPopup = useSelector(getQickViewUuid);

    useEffect(() => {
        if (isPopup) {
            setUuid(isPopup);
        } else {
            setUuid(
                location.pathname.split("/")[
                    location.pathname.split("/").length - 1
                ]
            );
        }
    }, [isPopup, location.pathname]);

    return (
        <div className="ProductShareProd">
            <p className="ProductShareProd__Text">поделитесь товаром</p>
            <div className="ProductShareProd__Share">
                <FacebookShareButton
                    url={window.location.href}
                    title={name}
                    className="ProductShareProd__Item"
                >
                    <img
                        src="images/productPage/shareFB.svg"
                        alt="facebook share"
                        className="ProductShareProd__Img"
                    />
                </FacebookShareButton>
                <PinterestShareButton
                    url={window.location.href}
                    media={img}
                    className="ProductShareProd__Item"
                >
                    <img
                        src="images/productPage/shareP.svg"
                        alt="pinterest share"
                        className="ProductShareProd__Img"
                    />
                </PinterestShareButton>
                <button
                    className={cn({
                        ProductShareProd__AddWish: true,
                    })}
                    onClick={() => dispatch(setWishList(uuid))}
                >
                    <img
                        src={
                            wishList.some((item) => item.prodId === uuid)
                                ? "images/productPage/wishAdded.svg"
                                : "images/productPage/wish.svg"
                        }
                        alt="wish"
                        className={cn({
                            ProductShareProd__WishImg: true,
                        })}
                    />{" "}
                    Список желаний
                </button>
            </div>
        </div>
    );
};
