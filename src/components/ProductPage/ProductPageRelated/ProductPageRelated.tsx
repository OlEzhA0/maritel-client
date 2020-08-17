import React from "react";
import "./ProductPageRelated.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQucikViewUuid } from "../../../store/actionCreators";
import { getCategories } from "../../../store/actionsTypes";
import { splitValue } from "../../../helpers";
import { handleTranslit } from "../../../helpers/links";

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

  const handleCreateLink = (prod: Products) => {
    const categ = handleTranslit(
      categories.find((c) => c.id === prod.type.split(splitValue)[0])
        ?.category || ""
    );
    const currentCateg = categories.find(
      (cat) => cat.id === prod.type.split(splitValue)[0]
    );
    let subCat = "Vse-tovari";
    if (currentCateg?.subCategories.length) {
      subCat = handleTranslit(
        currentCateg.subCategories.find(
          (sub) => sub.id === prod.type.split(splitValue)[1]
        )?.subs || ""
      );
    }

    return `/${categ}/${subCat}/${handleTranslit(prod.title)}/${prod.uuid}`;
  };

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
                  to={() => handleCreateLink(prod)}
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
