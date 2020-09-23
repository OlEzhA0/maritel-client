import React from "react";
import "./WishlistPage.scss";

import { AccountMenu } from "../../components/AccountMenu";
import { ProductsList } from "../../components/ProductsList";
import { useQuery } from "react-apollo";
import { getCustomer } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";
import { getIsLogged, getWishList } from "../../store/actionsTypes";
import { useSelector } from "react-redux";

export const WishlistPage = () => {
    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer);

    const isLogged = useSelector(getIsLogged);

    const wishlist = useSelector(getWishList);

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
                <div className="Account__PageTitle">Список желаний</div>
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
