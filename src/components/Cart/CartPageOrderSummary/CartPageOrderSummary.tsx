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
    getShippingCost,
} from "../../../store/actionsTypes";
import { orderSchema } from "../../../helpers/validationSchemas";
import { fetchOrderInfo } from "./api";
import { clearCart, setOrderStatus } from "../../../store/actionCreators";

export const CartPageOrderSummary = () => {
    const dispatch = useDispatch();

    const cartItemsTotal = useSelector(getCartItemsTotal);
    const orderInfo = useSelector(getOrderInfo);
    const shippingCost = useSelector(getShippingCost);
    const orderTotal = useSelector(getOrderTotal);
    const cart = useSelector(getCart);
    const accessToken = useSelector(getAccessToken);

    const orderCommision = useSelector(getOrderCommision);

    const [active, setActive] = useState(false);

    const formRef = useRef(null as null | HTMLFormElement);

    const [orderData, setOrderData] = useState(
        null as null | { [x: string]: any }
    );

    useEffect(() => {
        console.log(orderSchema.validate(orderInfo).error);
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

    return (
        <div className="CartPageOrderSummary">
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
                onClick={() => {
                    if (active) {
                        fetchOrderInfo(orderInfo, cart, accessToken).then(
                            (data) => {
                                setOrderData(data);
                                setTimeout(() => {
                                    localStorage.setItem(
                                        "orderStatus",
                                        JSON.stringify({
                                            orderId: orderData?.orderId,
                                            status:
                                                orderInfo.paymentMethod ===
                                                "cash"
                                                    ? "accepted"
                                                    : "pending",
                                        })
                                    );
                                    dispatch(
                                        setOrderStatus({
                                            orderId: orderData?.orderId,
                                            status:
                                                orderInfo.paymentMethod ===
                                                "cash"
                                                    ? "accepted"
                                                    : "pending",
                                        })
                                    );
                                    dispatch(clearCart());
                                    if (data?.action) {
                                        formRef?.current?.submit();
                                    }

                                    window.location.href = "/#order-status";
                                }, 0);
                            }
                        );
                    }
                }}
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
