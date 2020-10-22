import React, { useEffect, useState } from "react";
import "./ProductPageAddCart.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { addToCart, setShowAddedToCart } from "../../../store/actionCreators";
import Modal from "react-modal";
import { ProductPageMissingProduct } from "../ProductPageMissingProduct/ProductPageMissingProduct";
interface Props {
    choosenSize: string;
    quantity: string;
    prodUuid: string;
    stock: string;
}

Modal.setAppElement("#root");

export const ProductPageAddCart: React.FC<Props> = ({
    choosenSize,
    quantity,
    prodUuid,
    stock,
}) => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    let timeout: undefined | ReturnType<typeof setTimeout> = undefined;

    useEffect(() => {
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (parseInt(stock) < 1) {
        return (
            <>
                <button
                    type="button"
                    className={cn({
                        ProductPageAddCart__Button: true,
                        "ProductPageAddCart__Button--dis": !choosenSize,
                    })}
                    disabled={!choosenSize}
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                >
                    Сообщить о поступлении
                </button>
                <Modal
                    className="Maritel__Modal"
                    overlayClassName="Maritel__ModalOverlay"
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                >
                    <ProductPageMissingProduct
                        size={choosenSize}
                        product={prodUuid}
                        closeModal={() => setIsModalOpen(false)}
                    />
                </Modal>
            </>
        );
    }

    return (
        <button
            type="button"
            className={cn({
                ProductPageAddCart__Button: true,
                "ProductPageAddCart__Button--dis": !choosenSize,
            })}
            disabled={!choosenSize}
            onClick={() => {
                dispatch(setShowAddedToCart(true));
                dispatch(addToCart(prodUuid, quantity, choosenSize));
            }}
        >
            добавить в корзину
        </button>
    );
};
