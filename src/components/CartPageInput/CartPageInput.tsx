import React from "react";

type Props = {
    register: any;
    name: string;
    label?: string;
    error?: boolean;
    errorMessage?: string;
    className?: string;
    required?: boolean;
};

export const CartPageInput = (props: Props) => {
    const {
        register,
        error,
        name,
        label,
        errorMessage,
        className,
        required,
    } = props;
    return (
        <div className={"CartPage__InputContainer " + className}>
            <label>
                {label}{" "}
                <span className="CartPage__Required">{required && "*"}</span>
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
