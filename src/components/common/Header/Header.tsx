import React, { useState, useEffect, useMemo } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { HambMenu } from "../../HambMenu";
import { DesktopMenu } from "../DesktopMenu";
import { useDispatch, useSelector } from "react-redux";
import {
    setMenuStatus,
    setBackgroundStatus,
    SetPopupCartStatus,
} from "../../../store/actionCreators";
import {
    getMenuStatus,
    getBackgroundSearchCover,
    getWishList,
    getCartPopupStatus,
    getAccessToken,
    getCart,
} from "../../../store/actionsTypes";
import { InfoSlider } from "../../InfoSlider";
import { CartPopup } from "../../Cart/CartPopup";
import { SearchBox } from "../../SearchBox";
import { SearchBoxMobile } from "../../SearchBox/mobile";

interface Props {
    visible: boolean;
}

export const Header: React.FC<Props> = ({ visible }) => {
    const [openSearch, setOpenSearch] = useState(false);

    const [isHover, setIsHover] = useState(false);
    const [hoveredItem, setHoveredItem] = useState("");

    const dispatch = useDispatch();
    const menuStatus = useSelector(getMenuStatus);
    const backgournd = useSelector(getBackgroundSearchCover);
    const wishList = useSelector(getWishList);
    const cartPopupStatus = useSelector(getCartPopupStatus);

    const customerLoggedIn = useSelector(getAccessToken);

    const cartItems = useSelector(getCart);

    const cartItemsCount = useMemo(
        () => cartItems.reduce((acc, item) => acc + parseInt(item.quantity), 0),
        [cartItems]
    );

    useEffect(() => {
        if (menuStatus) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [menuStatus]);

    return (
        <header
            className={cn({
                Header: true,
                "Header--desktopFull": visible,
            })}
        >
            <CartPopup />
            <div
                className={cn({
                    Header__PC: true,
                    "Header__PC--nonVisible": !visible,
                })}
            >
                <div className="Header__MainPC">
                    <div className="Header__MainPCWrap">
                        <Link className="Header__Title" to="/wishlist">
                            список желаний ({wishList.length})
                        </Link>
                        <div className="Header__Logo">
                            <Link to="/">
                                <img
                                    src="/images/logo.svg"
                                    alt="logo"
                                    className="Header__LogoImg"
                                />
                            </Link>
                        </div>
                        <div
                            className="Header__General"
                            onMouseLeave={() =>
                                dispatch(SetPopupCartStatus(false))
                            }
                        >
                            <SearchBox />
                            <Link to="/login" className="Header__Login">
                                {customerLoggedIn ? "аккаунт" : "войти"}
                            </Link>
                            <Link
                                to="/cart"
                                className="Header__CartWrap"
                                onClick={() => {
                                    dispatch(SetPopupCartStatus(true));
                                }}
                                onMouseEnter={() =>
                                    dispatch(SetPopupCartStatus(true))
                                }
                            >
                                <img
                                    src="/images/header/backet.svg"
                                    alt="backet"
                                    className={cn({
                                        Header__Cart: true,
                                    })}
                                />
                                <span>({cartItemsCount})</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <DesktopMenu
                    hoveredItem={hoveredItem}
                    isHover={isHover}
                    setHoveredItem={setHoveredItem}
                    setIsHover={setIsHover}
                    visible={visible}
                />
                <InfoSlider visible={visible} />
            </div>

            <div className="Header__Phone">
                <div className="Header__PhoneWrap">
                    <HambMenu />
                    <div className="Header__Logo">
                        <Link to="/">
                            <img
                                src="/images/logo.svg"
                                alt="logo"
                                className="Header__LogoImg"
                            />
                        </Link>
                    </div>
                    <div className="Header__General">
                        <img
                            src="/images/header/backet.svg"
                            alt="backet"
                            className="Header__Cart--mobile"
                            onTouchStart={() => {
                                dispatch(SetPopupCartStatus(!cartPopupStatus));
                            }}
                        />
                        <span className="Header__CartItemCount">{cartItemsCount && `(${cartItemsCount})`}</span>
                        <img
                            src="/images/header/zoom.svg"
                            alt="zoom"
                            onClick={() => {
                                setOpenSearch(!openSearch);
                                dispatch(setMenuStatus(false));
                                dispatch(setBackgroundStatus(!backgournd));
                            }}
                            className="Header__SearchIcon"
                        />
                        <SearchBoxMobile
                            open={backgournd}
                            setOpen={setBackgroundStatus}
                        />
                    </div>
                </div>
                <InfoSlider />
            </div>
        </header>
    );
};
