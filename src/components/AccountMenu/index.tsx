import React from "react";
import "./AccountMenu.scss";

import { Link } from "react-router-dom";

type Props = {
    selected: "account" | "wishlist" | "orders" | "bonuses";
    disabled?: boolean;
};
const menuItems = [
    { value: "account", name: "Аккаунт" },
    { value: "wishlist", name: "список желаний" },
    { value: "orders", name: "мои заказы" },
    // { value: "bonuses", name: "мой бонусный счет" },
];

export const AccountMenu = (props: Props) => {
    const { selected, disabled } = props;

    return (
        <div className="AccountMenu">
            <div className="hide-desktop AccountMenu__Title">
                Личный кабинет
            </div>
            {menuItems.map((item, i) => (
                <div key={i}>
                    {disabled ? (
                        <span
                            className={
                                selected === item.value
                                    ? "selected"
                                    : "AccountMenu__Disabled"
                            }
                        >
                            {item.name}
                        </span>
                    ) : (
                        <Link to={`/${item.value}`}>
                            <span
                                className={
                                    selected === item.value ? "selected" : ""
                                }
                            >
                                {item.name}
                            </span>
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
};
