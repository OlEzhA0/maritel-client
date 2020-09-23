import React from "react";

type Props = {
    name: string;
    value: any;
    label?: string;
    register?: any;
    disabled?: boolean;
    disabledMessage?: string;
    extraMessage?: string;
    passThrough?: { [x: string]: any };
};

export const RadioInput = (props: Props) => {
    const {
        disabled,
        disabledMessage,
        extraMessage,
        register,
        passThrough,
        name,
        value,
        label,
    } = props;
    return (
        <div>
            <label
                className="CartPage__RadioContainer"
                data-tip={disabled ? disabledMessage : ""}
            >
                <span>{label}</span>
                <input
                    name={name}
                    value={value}
                    {...passThrough}
                    disabled={disabled}
                    type="radio"
                    ref={register}
                />
                <span>{extraMessage}</span>
                <span className="checkmark"></span>
            </label>
        </div>
    );
};
