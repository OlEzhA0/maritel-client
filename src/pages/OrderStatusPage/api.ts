export const fetchOrderStatus = (
    orderId: string
): Promise<{ orderStatus: string }> => {
    return fetch(
        `${process.env.REACT_APP_SERVER}/orderStatus/${orderId}`
    ).then((res) => res.json());
};
