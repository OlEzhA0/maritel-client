import React, { useEffect, useMemo, useRef } from "react";
import "./CartPopup.scss";
import { useSelector, useDispatch } from "react-redux";
import {
    getCartPopupStatus,
    getCart,
    getProducts,
    getIsTablet,
    getNewCartItem,
    getShowAddedToCart,
} from "../../../store/actionsTypes";
import {
    SetPopupCartStatus,
    setShowAddedToCart,
} from "../../../store/actionCreators";
import { CartPopupItem } from "../CartPopupItem";
import { Link } from "react-router-dom";
import { CheckmarkIcon } from "../../common/CheckmarkIcon";

export const CartPopup = () => {
    const dispatch = useDispatch();

    const cartPopupStatus = useSelector(getCartPopupStatus);
    const cart = useSelector(getCart);
    const newCartItem = useSelector(getNewCartItem);
    const goods = useSelector(getProducts);

    const isTablet = useSelector(getIsTablet);

    const showAddedToCart = useSelector(getShowAddedToCart);

    const totalPrice = useMemo(() => {
        if (goods.length) {
            return cart.reduce((accum, value) => {
                const prod = goods.find((g) => g.uuid === value.prodUuid)!;
                const addPrice = +prod.price * +value.quantity;
                return accum + addPrice;
            }, 0);
        }
        return 0;
    }, [cart, goods]);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            const { current } = timeoutRef;
            if (current) {
                clearTimeout(current);
            }
        };
    }, []);

    useEffect(() => {
        if (showAddedToCart) {
            timeoutRef.current = setTimeout(
                () => dispatch(setShowAddedToCart(false)),
                2500
            );
        }
    }, [showAddedToCart, dispatch]);

    useEffect(() => {
        const { current } = timeoutRef;
        if (current) {
            clearTimeout(current);
        }
        dispatch(setShowAddedToCart(cartPopupStatus));
    }, [cartPopupStatus, dispatch]);

    useEffect(() => {
        if (isTablet && cartPopupStatus) {
            const html = document.querySelector("html")!;
            html.style.overflow = "hidden";
        } else {
            const html = document.querySelector("html")!;
            html.style.overflow = "scroll";
        }
    }, [isTablet, cartPopupStatus]);

    const newCartItemProd = useMemo(() => {
        if (newCartItem) {
            return goods.find(
                (product) => product.uuid === newCartItem.prodUuid
            );
        }

        return null;
    }, [newCartItem, goods]);

    if (
        isTablet &&
        showAddedToCart &&
        !cartPopupStatus &&
        newCartItem &&
        newCartItemProd
    ) {
        return (
            <div className="CartPopup__AddedToCart">
                <div className="CartPopup__AddedToCart__Title">КОРЗИНА</div>
                <div style={{ marginLeft: "25px" }}>
                    <CartPopupItem
                        key={newCartItemProd?.id + newCartItem.size}
                        previewPhoto={newCartItemProd?.previewPhoto}
                        title={newCartItemProd?.title}
                        type={newCartItemProd?.type}
                        price={newCartItemProd?.price}
                        size={newCartItem.size}
                        quantity={"1"}
                        prod={newCartItemProd}
                        showDelete={false}
                    />
                </div>
                <div className="CartPopup__SuccessText">
                    <span style={{ marginRight: "10px" }}>
                        <CheckmarkIcon fill="#fff" width={17} height={12} />
                    </span>
                    Добавлено в корзину
                </div>
            </div>
        );
    }

    return cartPopupStatus || showAddedToCart ? (
        cart.length > 0 ? (
            <div
                className="CartPopup"
                onMouseEnter={() => dispatch(SetPopupCartStatus(true))}
                onMouseLeave={() => dispatch(SetPopupCartStatus(false))}
            >
                <div className="CartPopup__Prods">
                    <ul className="CartPopup__List">
                        {cart.map((c) => {
                            const prod = goods.find(
                                (good) => good.uuid === c.prodUuid
                            );
                            if (prod) {
                                return (
                                    <CartPopupItem
                                        key={prod?.id + c.size}
                                        previewPhoto={prod?.previewPhoto}
                                        title={prod?.title}
                                        type={prod?.type}
                                        price={prod?.price}
                                        size={c.size}
                                        quantity={c.quantity}
                                        prod={prod}
                                        showDelete={true}
                                    />
                                );
                            }
                            return <></>;
                        })}
                    </ul>
                </div>
                <div className="CartPopup__Buttons">
                    <p className="CartPopup__AllPrice">
                        сумма заказа{" "}
                        <span className="CartPopup__Price">
                            {totalPrice} грн.
                        </span>
                    </p>
                    <Link to="/cart" className="CartPopup__LinkToOrder">
                        <span
                            onClick={() => dispatch(SetPopupCartStatus(false))}
                        >
                            оформить заказ
                        </span>
                    </Link>
                </div>
            </div>
        ) : (
            <div
                className="CartPopup CartPopup__Empty"
                onMouseEnter={() => dispatch(SetPopupCartStatus(true))}
                onMouseLeave={() => dispatch(SetPopupCartStatus(false))}
            >
                корзина пустая.
            </div>
        )
    ) : (
        <div className="CartPopup__False" />
    );
};
