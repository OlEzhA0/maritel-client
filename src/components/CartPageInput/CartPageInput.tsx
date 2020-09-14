import React from "react";

type Props = {
    register: any;
    name: string;
    label?: string;
    error?: boolean;
    errorMessage?: string;
    className?: string;
};

export const CartPageInput = (props: Props) => {
    const { register, error, name, label, errorMessage, className } = props;
    return (
        <div className={"CartPage__InputContainer " + className}>
            <label>
                {label} <span className="CartPage__Required">*</span>
            </label>

            <input
                className={error ? "CartPage__InputError" : ""}
                name={name}
                ref={register}
            />
            {error && <p className="CartPage__Error">{errorMessage}</p>}
        </div>
    );
};
