import React, { useState } from "react";
import "./CartProdItemSelect.scss";
import { useDispatch } from "react-redux";
import { updateInCart } from "../../store/actionCreators";

import { withStyles } from "@material-ui/core/styles";
import { Select, MenuItem } from "@material-ui/core";

import selectArrow from "../../images/selectArrow.svg";

import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        position: "relative",
        padding: "10px 44px 10px 20px !important",
        border: "1px solid #101010",
        fontSize: 16,
        lineHeight: "19px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            // borderColor: "#80bdff",
            // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

interface Props {
    quantity: string;
    prodUuid: string;
    size: string;
    maxQ: string;
}

export const CartProdItemSelect: React.FC<Props> = ({
    quantity,
    prodUuid,
    size,
    maxQ,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const quantityArr = [];

    for (let i = 1; i <= parseInt(maxQ) && i <= 5; i++) {
        quantityArr.push(
            <MenuItem key={i} value={i}>
                {i}
            </MenuItem>
        );
    }

    if (parseInt(quantity) > 5) {
        quantityArr.push(
            <MenuItem key={quantity} value={quantity}>
                {quantity}
            </MenuItem>
        );
    }

    return (
        <div className="CartProdItemSelect">
            <img
                className="CartProdItemSelect__Icon"
                src={selectArrow}
                onClick={() => setIsOpen(!isOpen)}
                alt=""
            />
            <Select
                open={isOpen}
                value={quantity}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                onChange={({ target }) => {
                    setIsOpen(false);
                    dispatch(
                        updateInCart(prodUuid, target.value as string, size)
                    );
                }}
                input={<BootstrapInput />}
                IconComponent="object"
            >
                {quantityArr}
            </Select>
        </div>
    );
};
