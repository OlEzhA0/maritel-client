import React from "react";
import "./Input.scss";

import { FieldError } from "react-hook-form";

type Props = {
    register: any;
    name: string;
    label?: string;
    error?: FieldError;
    errorMessage?: string;
    className?: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
};

export const Input = (props: Props) => {
    const {
        register,
        error,
        name,
        label,
        errorMessage,
        className,
        required,
        type,
        placeholder,
        autoComplete,
    } = props;

    return (
        <div className={"Maritel__InputContainer " + className}>
            <label>
                {label}{" "}
                <span className="Maritel__Required">{required && "*"}</span>
            </label>

            <input
                placeholder={placeholder}
                className={error ? "Maritel__InputError" : ""}
                name={name}
                ref={register}
                type={type}
                autoComplete={autoComplete}
            />
            {error && <p className="Maritel__Error">{errorMessage}</p>}
        </div>
    );
};
