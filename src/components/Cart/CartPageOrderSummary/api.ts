import { RootState } from "../../../store";

export const fetchOrderInfo = (
    order: RootState["order"],
    cart: RootState["cart"]
) => {
    let deliveryAddress = `${order.city.name}, `;
    if (order.shippingMethod === "postOffice") {
        deliveryAddress += `${order.deliveryAddress.name}`;
    } else {
        deliveryAddress += `${order.deliveryAddress.street}, дом ${order.deliveryAddress.houseNumber}, кв. ${order.deliveryAddress.appartment}`;
    }

    return fetch(`${process.env.REACT_APP_SERVER}/order`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ ...order, items: cart, deliveryAddress }),
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
