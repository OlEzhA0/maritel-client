import React from "react";
import "./LoginForm.scss";

import { useForm } from "react-hook-form";

import { Input } from "../common/Input/Input";

import { login } from "./api";
import { Checkbox } from "../common/Checkbox";
import { useDispatch } from "react-redux";
import { setCustomerInfo } from "../../store/actionCreators";

type FormType = {
    email: string;
    password: string;
    remember: boolean;
};

const LoginForm = () => {
    const dispatch = useDispatch();

    const { register, setError, handleSubmit, errors } = useForm<FormType>({});

    const onSubmit = async (data: FormType) => {
        try {
            const { ok, accessToken } = await login(
                data.email,
                data.password,
                data.remember
            );
            if (ok) {
                dispatch(setCustomerInfo({ accessToken }));
            } else {
                setError("email", {});
                setError("password", {});
            }
        } catch {}
    };

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="email"
                    label="E-MAIL"
                    register={register({ required: true })}
                    error={errors.email}
                />
                <Input
                    type={"password"}
                    name="password"
                    label="ПАРОЛЬ"
                    register={register({ required: true, minLength: 7 })}
                    error={errors.password}
                />
                <div className="LoginForm__Additional">
                    <Checkbox
                        label="Запомнить"
                        name="remember"
                        register={register}
                    />
                    {/* <span>Забыли пароль?</span> */}
                </div>
                <button className="LoginForm__Submit" type="submit">
                    ВОЙТИ
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
