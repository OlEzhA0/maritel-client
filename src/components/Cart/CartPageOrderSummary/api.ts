import { RootState } from "../../../store";

export const fetchOrderInfo = (
    order: RootState["order"],
    cart: RootState["cart"]
) => {
    return fetch(`${process.env.REACT_APP_SERVER}/order`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ ...order, items: cart }),
        headers: {
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
