import React, { useMemo } from "react";
import "./AccountPage.scss";
import { useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getCustomer } from "../../helpers";
import { getIsLogged } from "../../store/actionsTypes";
import { AccountMenu } from "../../components/AccountMenu";
import { SpinnerLoader } from "../../components/SpinnerLoader";

export const AccountPage = () => {
    const isLogged = useSelector(getIsLogged);

    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer, {
        skip: !isLogged,
    });

    const shippingInformation = useMemo(() => {
        if (
            !loading &&
            data?.customer.shippingAddress &&
            data?.customer.shippingMethod?.value &&
            data?.customer.city.name
        ) {
            const { shippingAddress, shippingMethod, city } = data.customer;
            let result = `${city.name.split(" ")[0]}, `;

            if (shippingMethod?.value === "postOffice") {
                result += "Новая Почта ";
                result += "(";
                if (shippingAddress.name?.includes("Пункт приема-выдачи")) {
                    result += shippingAddress.name.match(
                        /(ул|бул|просп|пер|площадь)[^)]+/
                    )![0];
                } else if (
                    shippingAddress.name?.includes("Отделение") ||
                    shippingAddress.name?.includes("Почтомат")
                ) {
                    result += shippingAddress.name?.match(/[^:]+/)![0];
                } else {
                    result += shippingAddress.name;
                }
                result += ")";
            } else {
                result += `${shippingAddress.street?.name} ${
                    shippingAddress.houseNumber
                }, ${
                    shippingAddress.appartment &&
                    `кв. ${shippingAddress.appartment}`
                }`;
            }
            return result;
        }
        return "";
    }, [loading, data]);

    if (loading) {
        return (
            <div className="Page__Wrap">
                <SpinnerLoader />
            </div>
        );
    }

    if (!isLogged) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="AccountPage Page__Wrap">
            <AccountMenu selected="account" />

            <div className="AccountPage__RightContent">
                <div className="Account__Greetings">
                    Добро пожаловать, {data?.customer.firstName}
                </div>

                <div className="Account__PageTitle">
                    Персональная информация
                    <div className="AccountPage__Change hide-mobile">
                        <Link to="/register">
                            <span>ИЗМЕНИТЬ</span>
                        </Link>
                    </div>
                </div>

                <div className="AccountPage__InformationList">
                    <div className="AccountPage__InformationItem">
                        <div className="AccountPage__InformationItem__Label">
                            ИМЯ
                        </div>
                        <div>
                            {`${data?.customer.firstName} ${data?.customer.lastName}`}
                        </div>
                    </div>
                    <div className="AccountPage__InformationItem">
                        <div className="AccountPage__InformationItem__Label">
                            E-MAIL
                        </div>
                        <div>{data?.customer.email}</div>
                    </div>

                    <div className="AccountPage__InformationItem">
                        <div className="AccountPage__InformationItem__Label">
                            ПАРОЛЬ
                        </div>
                        <div>*********</div>
                    </div>

                    <div className="AccountPage__InformationItem AccountPage__InformationItem__ClubID">
                        <div className="AccountPage__InformationItem__Label">
                            Maritel' Club Member ID
                        </div>
                        <div>{data?.customer._id}</div>
                    </div>

                    {data?.customer.shippingAddress && (
                        <div className="AccountPage__InformationItem">
                            <div className="AccountPage__InformationItem__Label">
                                АДРЕС ДОСТАВКИ
                            </div>
                            <div>
                                {data?.customer.shippingMethod?.value &&
                                    shippingInformation}
                            </div>
                        </div>
                    )}
                </div>
                <div className="hide-desktop">
                    <Link to="/register">
                        <button className="LoginForm__Submit">ИЗМЕНИТЬ</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
