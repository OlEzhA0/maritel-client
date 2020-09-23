import React, { useMemo, useState } from "react";
import { timestampToString } from "../../helpers/timestampToString";
import "./OrderItem.scss";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getProducts } from "../../store/actionsTypes";
import { SpinnerLoader } from "../SpinnerLoader";
import { useQuery } from "react-apollo";
import { getColorsQuery } from "../../helpers";
type Props = {
    _id: string;
    date: string;
    items: [
        {
            prodUuid: string;
            name: string;
            size: string;
            quantity: string;
            price: string;
        }
    ];
    amount: string;
};

export const OrderItem = (props: Props) => {
    const { _id, date, items, amount } = props;

    const [isOpen, setIsOpen] = useState(false);

    const orderProductList = useMemo(() => {
        return (
            <div className="OrderProductList">
                {items.map((item) => (
                    <OrderProduct
                        productUuid={item.prodUuid}
                        price={item.price}
                        quantity={item.quantity}
                        size={item.size}
                    />
                ))}
            </div>
        );
    }, [items]);

    console.log(items);

    return (
        <div className="OrderItem">
            <div className="OrderItem__Date">{`№${_id} от ${timestampToString(
                date
            )}`}</div>
            <div className="OrderItem__Amount">
                <p className="hide-mobile">Сумма заказа</p>
                <p className="OrderItem__Amount__Sum">{amount} грн</p>
            </div>
            <div
                className="OrderItem__IconContainer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "",
                    }}
                    className="OrderItem__Chevron"
                />
            </div>
            <div style={{ flexBasis: "100%", height: "0" }}></div>
            {isOpen && orderProductList}
        </div>
    );
};

type OrderProductProps = {
    productUuid: string;
    price: string;
    quantity: string;
    size: string;
};

const OrderProduct = (props: OrderProductProps) => {
    const { productUuid, price, quantity, size } = props;

    const getColors = useQuery<{ colors: ColorTypes[] }>(getColorsQuery);

    const productList = useSelector(getProducts);
    const [showImg, setShowImg] = useState(false);

    const product = useMemo(() => {
        return productList.find((prod) => prod.uuid === productUuid);
    }, [productList, productUuid]);

    const color = useMemo(() => {
        if (!getColors.loading && getColors.data && getColors.data.colors) {
            return getColors.data.colors.find(
                (color) => color.id === product?.color
            )?.name;
        }
        return "";
    }, [getColors, product]);

    return (
        <div className="OrderProduct">
            <div className="OrderProduct__Left">
                <div className="OrderProduct__ImageContainer">
                    <img
                        src={product?.previewPhoto}
                        alt="preview ph"
                        className={cn({
                            ProductCard__Img: true,
                            "ProductCard__Img--loaded": showImg,
                        })}
                        onLoad={() => setShowImg(true)}
                    />
                    {!showImg && <SpinnerLoader />}
                </div>
                <div className="OrderProduct__InfoContainer">
                    <p className="OrderProduct__Title">{product?.title}</p>
                    <p className="OrderProduct__Options">
                        {color} | {size}
                    </p>
                </div>
            </div>
            <div className="OrderProduct__Price">
                {quantity} x {price} грн.
            </div>
        </div>
    );
};
