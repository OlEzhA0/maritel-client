import { RootState } from "../../../store";

export const fetchOrderInfo = (
    order: RootState["order"],
    cart: RootState["cart"],
    accessToken?: string
) => {
    return fetch(`${process.env.REACT_APP_SERVER}/order`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ ...order, items: cart }),
        headers: {
            "Content-type": "application/json",
            authorization: `bearer ${accessToken}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
