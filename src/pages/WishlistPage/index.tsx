import React, { useEffect, useState } from "react";
import "./WishlistPage.scss";

import { AccountMenu } from "../../components/AccountMenu";
import { ProductsList } from "../../components/ProductsList";
import { useQuery } from "react-apollo";
import { getCustomer } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import { getIsLogged, getWishList } from "../../store/actionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { sortWishlist } from "../../store/actionCreators";

export const WishlistPage = () => {
    const dispatch = useDispatch();

    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer);

    const isLogged = useSelector(getIsLogged);

    const wishlist = useSelector(getWishList);

    const [sort, setSort] = useState<"ASC" | "DESC">("ASC");

    useEffect(() => {
        dispatch(sortWishlist());
    }, [sort, dispatch]);


    if (loading && isLogged) {
        return (
            <div className="Page__Wrap">
                <SpinnerLoader />
            </div>
        );
    }

    return (
        <div className="WishlistPage Page__Wrap">
            <AccountMenu selected="wishlist" disabled={!isLogged} />
            <div className="WishlistPage__ProductListContainer">
                <div className="Account__Greetings">
                    {isLogged &&
                        `Добро пожаловать, ${data?.customer.firstName}`}
                </div>
                <div className="Account__PageTitle">
                    Список желаний
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
                {wishlist.length ? (
                    <ProductsList isWishlist={true} />
                ) : (
                    <div
                        style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textAlign: "center",
                        }}
                    >
                        Ничего не найдено.
                    </div>
                )}
            </div>
        </div>
    );
};
