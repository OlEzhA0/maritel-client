import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderStatus } from "../../store/actionCreators";
import { getOrderStatus } from "../../store/actionsTypes";
import { fetchOrderStatus } from "./api";

const OrderStatusPage = () => {
    const dispatch = useDispatch();
    const orderStatus = useSelector(getOrderStatus);

    useEffect(() => {
        dispatch(
            setOrderStatus(
                JSON.parse(
                    localStorage.getItem("orderStatus") !== null
                        ? (localStorage.getItem("orderStatus") as string)
                        : "{}"
                )
            )
        );
        let interval = setInterval(() => {}, 1000000);
        if (orderStatus.orderId) {
            interval = setInterval(() => {
                fetchOrderStatus(orderStatus.orderId).then((data) => {
                    localStorage.setItem(
                        "orderStatus",
                        JSON.stringify({
                            status: data.orderStatus,
                            orderId: orderStatus.orderId,
                        })
                    );
                    dispatch(
                        setOrderStatus({
                            status: data.orderStatus,
                            orderId: orderStatus.orderId,
                        })
                    );
                });
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let orderText = "";

    switch (orderStatus.status?.toLowerCase()) {
        case "pending":
            orderText = "Выполняйте инструкции по оплате товара";
            break;
        case "success":
        case "approved":
        case "accepted":
            orderText =
                "ВЫ УСПЕШНО ОФОРМИЛИ ЗАКАЗ. ОЖИДАЙТЕ ЗВОНКА ДЛЯ ПОДТВЕРЖДЕНИЯ ДЕТАЛЕЙ";
            break;
        case "failure":
        case "declined":
        case "expired":
        case "error":
            orderText = "Произошла ошибка во время обработки заказа.";
            break;
        default:
            orderText = "У вас нет активного заказа.";
    }

    return (
        <div className="ProductsList Page__Wrap">
            <div className="ProductsList__Wrap">
                <p className="ProductsList__NoProd">{orderText}</p>
            </div>
        </div>
    );
};

export default OrderStatusPage;
