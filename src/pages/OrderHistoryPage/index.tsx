import React from "react";

import { AccountMenu } from "../../components/AccountMenu";
import { useQuery } from "react-apollo";
import { getCustomer } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import { getIsLogged } from "../../store/actionsTypes";
import { useSelector } from "react-redux";
import { OrderItem } from "../../components/OrderItem/OrderItem";

export const OrderHistoryPage = () => {
    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer);

    const isLogged = useSelector(getIsLogged);

    if (loading) {
        return (
            <div className="Page__Wrap">
                <SpinnerLoader />
            </div>
        );
    }

    return (
        <div className="WishlistPage Page__Wrap">
            <AccountMenu selected="orders" />
            <div className="WishlistPage__ProductListContainer">
                <div className="Account__Greetings">
                    {isLogged &&
                        `Добро пожаловать, ${data?.customer.firstName}`}
                </div>
                <div className="Account__PageTitle">мои заказы</div>
                <>
                    {data?.customer.orders.map((order) => (
                        <OrderItem
                            key={order._id}
                            _id={order._id}
                            date={order.date}
                            items={order.items}
                            amount={order.amount}
                        />
                    ))}
                </>
            </div>
        </div>
    );
};
