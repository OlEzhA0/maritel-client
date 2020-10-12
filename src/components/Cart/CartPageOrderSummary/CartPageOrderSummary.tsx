import React, { ReactElement, useEffect, useRef, useState } from "react";
import "./CartPageOrderSummary.scss";

import { useDispatch, useSelector } from "react-redux";
import {
    getAccessToken,
    getCart,
    getCartItemsTotal,
    getOrderCommision,
    getOrderInfo,
    getOrderTotal,
    getPromo,
    getShippingCost,
} from "../../../store/actionsTypes";
import { orderSchema } from "../../../helpers/validationSchemas";
import { fetchOrderInfo } from "./api";
import { clearCart, setOrderStatus } from "../../../store/actionCreators";
import { DeepMap, FieldError, UseFormMethods } from "react-hook-form";
import { CartFormType } from "../../../pages/CartPage/CartPage";
import { Promo } from "../../Promo";

type Props = {
    formMethods: UseFormMethods<CartFormType>;
};

export const CartPageOrderSummary = ({ formMethods }: Props) => {
    const dispatch = useDispatch();

    const cartItemsTotal = useSelector(getCartItemsTotal);
    const orderInfo = useSelector(getOrderInfo);
    const shippingCost = useSelector(getShippingCost);
    const orderTotal = useSelector(getOrderTotal);
    const cart = useSelector(getCart);
    const accessToken = useSelector(getAccessToken);
    const promo = useSelector(getPromo);

    const orderCommision = useSelector(getOrderCommision);

    const [active, setActive] = useState(false);

    const formRef = useRef(null as null | HTMLFormElement);

    const [orderData, setOrderData] = useState(
        null as null | { [x: string]: any }
    );

    useEffect(() => {
        setActive(!orderSchema.validate(orderInfo).error);
    }, [orderInfo]);

    const orderDataInputs: ReactElement[] = [];

    if (orderData) {
        const { fields } = orderData;
        for (const key in fields) {
            if (Array.isArray(fields[key])) {
                for (const el of fields[key]) {
                    orderDataInputs.push(
                        <input
                            type="hidden"
                            key={`${key}${el}`}
                            name={`${key}[]`}
                            value={el}
                        />
                    );
                }
            } else {
                orderDataInputs.push(
                    <input
                        type="hidden"
                        key={key}
                        name={key}
                        value={fields[key]}
                    />
                );
            }
        }
    }

    const submitOrder = () => {
        if (active) {
            fetchOrderInfo(orderInfo, cart, accessToken, promo.promoName).then(
                (data) => {
                    if (data.status === 400) {
                        alert("Упс! Что-то пошло не так.");
                        return;
                    }

                    setOrderData(data);
                    setTimeout(() => {
                        localStorage.setItem(
                            "orderStatus",
                            JSON.stringify({
                                orderId: orderData?.orderId,
                                status:
                                    orderInfo.paymentMethod === "cash"
                                        ? "accepted"
                                        : "pending",
                            })
                        );

                        dispatch(
                            setOrderStatus({
                                orderId: orderData?.orderId,
                                status:
                                    orderInfo.paymentMethod === "cash"
                                        ? "accepted"
                                        : "pending",
                            })
                        );

                        if (data?.action) {
                            formRef.current?.submit();
                        }

                        dispatch(clearCart());

                        window.location.href = "/#order-status";
                    }, 0);
                }
            );
        } else {
            formMethods.trigger().then(() => {
                if (formMethods.errors) {
                    console.log(formMethods.errors);

                    const errorRef = getErrorRef<CartFormType>(
                        formMethods.errors
                    );

                    if (errorRef) {
                        errorRef.focus();
                    }
                }
            });
        }
    };

    return (
        <div className="CartPageOrderSummary">
            <Promo />
            <div className="CartPageOrderSummary__Title">ВАШ ЗАКАЗ</div>
            <div className="CartPageOrderSummary__VertLine" />
            <div className="CartPageOrderSummary__Item">
                <span className="CartPageOrderSummary__ItemsTotal">
                    ТОВАРОВ НА СУММУ
                </span>
                <span>{cartItemsTotal} грн.</span>
            </div>
            <div className="CartPageOrderSummary__VertLine" />
            {orderInfo.shippingMethod && (
                <>
                    <div className="CartPageOrderSummary__Item">
                        <span>ДОСТАВКА</span>
                        <span>{shippingCost}</span>
                    </div>
                    <div className="CartPageOrderSummary__VertLine" />
                </>
            )}
            {promo.promoValue > 0 && (
                <>
                    <div className="CartPageOrderSummary__Item">
                        <span>ПРОМО-КОД</span>
                        <span>
                            {promo.promoValue}{" "}
                            {promo.promoDisc === "grn" ? "грн." : "%"}
                        </span>
                    </div>
                    <div className="CartPageOrderSummary__VertLine" />
                </>
            )}
            {orderInfo.paymentMethod === "card" && (
                <>
                    <div className="CartPageOrderSummary__Item">
                        <span>КОМИССИЯ (2,5%)</span>
                        <span>{orderCommision} грн.</span>
                    </div>
                    <div className="CartPageOrderSummary__VertLine" />
                </>
            )}
            <div className="CartPageOrderSummary__Title CartPageOrderSummary__Item">
                <span>ИТОГО К ОПЛАТЕ</span>
                <span>{orderTotal} грн.</span>
            </div>
            <div
                className={`CartPageOrderSummary__Submit ${
                    !active && "CartPageOrderSummary__Submit__Error"
                }`}
                onClick={submitOrder}
            >
                ПОДТВЕРДИТЬ ЗАКАЗ
            </div>
            <div>
                <form
                    method="post"
                    action={orderData?.action}
                    acceptCharset="utf-8"
                    ref={formRef}
                    target="_blank"
                >
                    {orderDataInputs}
                </form>
            </div>
        </div>
    );
};

const getErrorRef = <T extends unknown>(errors: DeepMap<T, FieldError>) => {
    const getFirstProp = (error: { [x: string]: any }) => {
        for (const prop in error) {
            return error[prop];
        }
    };

    let error = getFirstProp(errors);

    while (!error.hasOwnProperty("ref")) {
        try {
            error = getFirstProp(error);
        } catch {
            return null;
        }
    }

    return error.ref as HTMLInputElement;
};
