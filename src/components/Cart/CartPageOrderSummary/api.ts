import { RootState } from "../../../store";

export const fetchOrderInfo = (
    order: RootState["order"],
    cart: CartProd[],
    accessToken?: string,
    promoName?: string
) => {
    return fetch(`${process.env.REACT_APP_SERVER}/order`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ ...order, items: cart, promoName }),
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
