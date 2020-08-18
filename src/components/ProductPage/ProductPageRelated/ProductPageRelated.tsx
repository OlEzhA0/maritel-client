import React from "react";
import "./ProductPageRelated.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQucikViewUuid } from "../../../store/actionCreators";
import { getCategories } from "../../../store/actionsTypes";
import { handleCreateLink } from "../../../helpers/createLink";

interface Props {
  colors: ColorTypes[];
  relatedProds: Products[];
  product: Products;
  generalPathName: string;
  popup?: true;
}

export const ProductPageRelated: React.FC<Props> = ({
  colors,
  relatedProds,
  product,
  generalPathName,
  popup,
}) => {
  const disptach = useDispatch();
  const categories = useSelector(getCategories);

  return (
    <div className="ProductPageRelated__Related">
      <ul className="ProductPageRelated__RelatedList">
        {[
          ...relatedProds.sort((a, b) =>
            colors
              .find((col) => col.id === a.color)!
              .name.localeCompare(
                colors.find((col) => col.id === b.color)!.name
              )
          ),
        ].map((prod) =>
          prod.id === product.id ? (
            <li
              key={prod.id}
              className="ProductPageRelated__RelatedItem ProductPageRelated__RelatedItem--choosen"
            >
              <img
                src={colors.find((col) => col.id === product.color)?.link}
                alt="color ph"
                className="ProductPageRelated__RelatedImg"
              />
              <div className="ProductPageRelated__Gasket" />
              <img
                src={colors.find((col) => col.id === product.color)?.link}
                alt="color ph"
                className="ProductPageRelated__RelatedImg--top"
              />
            </li>
          ) : (
            <li
              key={prod.id}
              className="ProductPageRelated__RelatedItem"
              onClick={() => {
                if (popup) {
                  disptach(setQucikViewUuid(prod.uuid));
                }
              }}
            >
              {popup ? (
                <img
                  src={colors.find((col) => col.id === prod.color)?.link}
                  alt="color ph"
                  className="ProductPageRelated__RelatedImg"
                />
              ) : (
                <Link
                  to={() => handleCreateLink(prod, categories)}
                  className="ProductPageRelated__RelLink"
                >
                  <img
                    src={colors.find((col) => col.id === prod.color)?.link}
                    alt="color ph"
                    className="ProductPageRelated__RelatedImg"
                  />
                </Link>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};
