import React from "react";
import "./CredentialsForm.scss";

import { useForm } from "react-hook-form";

import { Input } from "../common/Input/Input";

import { useDispatch } from "react-redux";
import { Checkbox } from "../common/Checkbox";
import { registerCustomer } from "./api";
import { setCustomerInfo } from "../../store/actionCreators";

type FormType = {
    email: string;
    password: string;
    confirmPassword: string;
    subscribe: boolean;
};

const CredentialsForm = () => {
    const dispatch = useDispatch();

    const {
        register,
        getValues,
        setValue,
        setError,
        handleSubmit,
        errors,
    } = useForm<FormType>({
        defaultValues: {},
    });

    const onSubmit = async (data: FormType) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {});
        } else {
            const { ok, accessToken, error } = await registerCustomer(
                data.email,
                data.password,
                data.subscribe
            );
            if (ok) {
                dispatch(setCustomerInfo({ accessToken }));
            } else {
                setError("email", { message: error });
            }
        }
    };

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="email"
                    label="E-MAIL"
                    register={register({ required: true })}
                    error={errors.email}
                    errorMessage={errors.email?.message}
                />
                <div className="CredentialsForm__PasswordsContainer">
                    <Input
                        type={"password"}
                        name="password"
                        label="ПАРОЛЬ"
                        register={register({ required: true, minLength: 7 })}
                        error={errors.password}
                        autoComplete="new-password"
                    />
                    <Input
                        type={"password"}
                        name="confirmPassword"
                        label="ПОВТОРИТЕ ПАРОЛЬ"
                        register={register({ required: true, minLength: 7 })}
                        error={errors.confirmPassword}
                        autoComplete="new-password"
                    />
                </div>
                <div className="CredentialsForm__Subscribe">
                    <Checkbox label="" name="subscribe" register={register} />
                    <span
                        onClick={() =>
                            setValue("subscribe", !getValues().subscribe)
                        }
                    >
                        Я хочу стать членом Maritel’ клуба и получать обновления
                        последних продуктов и акций по электронной почте и
                        другим каналам.
                    </span>
                </div>
                <button className="LoginForm__Submit" type="submit">
                    РЕГИСТРАЦИЯ
                </button>
            </form>
        </div>
    );
};

export default CredentialsForm;
