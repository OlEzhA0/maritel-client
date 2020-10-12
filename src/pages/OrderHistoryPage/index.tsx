import React, { useMemo, useState } from "react";

import "./OrderHistoryPage.scss";

import { AccountMenu } from "../../components/AccountMenu";
import { useQuery } from "react-apollo";
import { getCustomer, getOrders } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import { getIsLogged } from "../../store/actionsTypes";
import { useSelector } from "react-redux";
import { OrderItem } from "../../components/OrderItem/OrderItem";
import { Pagination } from "../../components/Pagination";

// import { Pagination } from "@material-ui/lab";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useLocation,  } from "react-router-dom";

export const OrderHistoryPage = () => {
    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer);

    const [sort, setSort] = useState<"DESC" | "ASC">("DESC");

    const pageLimit = 5;

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const currentPage = useMemo(() => searchParams.get("page") || "1", [
        searchParams,
    ]);

    const orders = useQuery<{
        orders: { orders: Order[]; orderCount: string };
    }>(getOrders, {
        variables: {
            limit: pageLimit.toString(),
            offset: ((+currentPage - 1) * pageLimit).toString(),
            sort: sort === "DESC" ? "-date" : "+date",
        },
    });

    const isLogged = useSelector(getIsLogged);

    const orderCount = useMemo(() => {
        if (orders.data?.orders.orderCount) {
            return parseInt(orders.data.orders.orderCount);
        }

        return 0;
    }, [orders]);

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
                <div className="Account__PageTitle">
                    мои заказы
                    <span
                        className="OrderHistoryPage__SortContainer"
                        onClick={() => setSort(sort === "ASC" ? "DESC" : "ASC")}
                    >
                        <span>сортировать по дате</span>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            style={{
                                transform:
                                    sort === "ASC" ? "rotate(180deg)" : "",
                            }}
                            className="OrderItem__Chevron"
                        />
                    </span>
                </div>
                <div className="Account__Content">
                    {orders.loading ? (
                        <div className="Account__ContentLoading">
                            <SpinnerLoader />
                        </div>
                    ) : (
                        !orderCount && (
                            <div
                                style={{
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                Заказы не найдены
                            </div>
                        )
                    )}
                    {orders.data?.orders.orders.map((order) => (
                        <OrderItem
                            key={order._id}
                            _id={order.orderId ? order.orderId : order._id}
                            date={order.date}
                            items={order.items}
                            amount={order.amount}
                        />
                    ))}
                </div>
                <Pagination
                    pagesCount={Math.ceil(orderCount / pageLimit)}
                    start={!!orders.data?.orders.orders.length}
                />
                {/* <Pagination
                    className="OrderHistoryPage__Pagination"
                    page={page + 1}
                    count={Math.floor(orderCount / pageLimit)}
                    onChange={(_e, newPage) => setPage(newPage - 1)}
                /> */}
            </div>
        </div>
    );
};
