import cn from "classnames";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { useDispatch, useSelector } from "react-redux";
import { getColorsQuery } from "../../../helpers";
import { delFromCart } from "../../../store/actionCreators";
import { getProducts } from "../../../store/actionsTypes";
import { CartProdItemSelect } from "../../CartProdItemSelect";
import { SpinnerLoader } from "../../SpinnerLoader";
import "./CartProdItem.scss";

interface Props {
  uuid: string;
  size: string;
  quantity: string;
}

export const CartProdItem: React.FC<Props> = ({ uuid, size, quantity }) => {
  const dispatch = useDispatch();
  const goods = useSelector(getProducts);
  const getColors = useQuery(getColorsQuery);

  const [product, setProduct] = useState<Products>();
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [colors, setColros] = useState<ColorTypes[]>([]);

  useEffect(() => setProduct(goods.find((g) => g.uuid === uuid)), [
    goods,
    uuid,
  ]);

  useEffect(() => {
    if (getColors && getColors.data && getColors.data.colors) {
      setColros(getColors.data.colors);
    }
  }, [getColors]);

  return (
    <li className="CartProdItem__Item">
      <div className="CartProdItem__Wrap">
        <div className="CartProdItem__LeftSide">
          <div className="CartProdItem__ImgWrap">
            <img
              src={goods.find((prod) => prod.uuid === uuid)?.previewPhoto}
              className={cn({
                CartProdItem__PrImg: true,
                "CartProdItem__PrImg--loaded": photoLoaded,
              })}
              alt="preview ph"
              onLoad={() => setPhotoLoaded(true)}
            />
            {!photoLoaded && <SpinnerLoader />}
          </div>
          <div className="CartProdItem__Inf">
            <p className="CartProdItem__Title">{product?.title}</p>
            <p className="CartProdItem__SmallInfo">
              {colors.find((c) => product?.color === c.id)?.name}{" "}
              <span className="CartProdItem__SmallInfSpan">|</span>
              {size}
              <span className="CartProdItem__Change">изменить</span>
            </p>
          </div>
        </div>
        <div className="CartProdItem__RightSide">
          <p className="CartProdItem__Price">{product?.price} грн.</p>
          {product?.lastPrice && (
            <p className="CartProdItem__LastPrice">{product.lastPrice} грн.</p>
          )}
          <CartProdItemSelect
            quantity={quantity}
            maxQ={product!.sizes.find((s) => s.size === size)!.stock}
          />
        </div>
      </div>

      <p
        className="CartProdItem__Del"
        onClick={() => dispatch(delFromCart(uuid + size))}
      >
        Удалить
      </p>
    </li>
  );
};
