import React, { useState } from "react";
import "./CartPopupItem.scss";
import { splitValue } from "../../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../store/actionsTypes";
import cn from "classnames";
import { SpinnerLoader } from "../../SpinnerLoader";
import { Link } from "react-router-dom";
import { handleCreateLink } from "../../../helpers/createLink";
import { SetPopupCartStatus } from "../../../store/actionCreators";

interface Props {
  previewPhoto: string;
  title: string;
  type: string;
  price: string;
  size: string;
  prod: Products;
}

export const CartPopupItem: React.FC<Props> = ({
  previewPhoto,
  title,
  type,
  price,
  size,
  prod,
}) => {
  const categories = useSelector(getCategories);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const disptach = useDispatch();
  return (
    <li className="CartPopup__Item">
      <Link
        className="CartPopup__Link"
        to={handleCreateLink(prod, categories)}
        onClick={() => disptach(SetPopupCartStatus(false))}
      >
        <div className="CartPopup__ItemPhWrap">
          <img
            src={previewPhoto}
            alt={title}
            className={cn({
              CartPopup__ProdImg: true,
              "CartPopup__ProdImg--loaded": photoLoaded,
            })}
            onLoad={() => setPhotoLoaded(true)}
          />

          {!photoLoaded && <SpinnerLoader />}
        </div>
        <div className="CartPopup__TextInfo">
          <p className="CartPopup__ProdTitle">{title}</p>
          <p className="CartPopup__Info">
            {categories.find((categ) => categ.id === type.split(splitValue)[0])
              ?.category || ""}
            <span className="CartPopup__Span">|</span>
            {size}
          </p>
          <p className="CartPopup__Price">{price} грн.</p>
        </div>
      </Link>
    </li>
  );
};
