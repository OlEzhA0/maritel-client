import React from "react";
import "./LoginPage.scss";
import { useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import { getCustomer } from "../../helpers/gqlQuery";
import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/Registration/CredentialsForm";
import { getIsLogged } from "../../store/actionsTypes";
import { Redirect } from "react-router-dom";
import ReactBreakLines from "../../helpers/ReactBreakLines";
import { SpinnerLoader } from "../../components/SpinnerLoader";

const LoginPage = () => {
    const isLogged = useSelector(getIsLogged);

    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer, {
        skip: !isLogged,
    });

    if (loading) {
        return (
            <div className="Page__Wrap">
                <SpinnerLoader />
            </div>
        );
    }

    if (data && data.customer.status === "registering") {
        return <Redirect to="/register" />;
    }

    if (data && data.customer.status === "registered") {
        return <Redirect to="/account" />;
    }

    if (isLogged) {
        return <Redirect to="/account" />;
    }

    return (
        <div className="LoginPage Page__Wrap">
            <div className="LoginPage__LoginFormContainer">
                <div className="LoginPage__Title">ПОСТОЯННЫЙ КЛИЕНТ</div>
                <LoginForm />
            </div>
            <div className="LoginPage__RegistrationFormContainer">
                <div className="LoginPage__Title">
                    <ReactBreakLines
                        text={
                            "ПРИСОЕДИНИТЬСЯ СЕЙЧАС\n И НАСЛАЖДАТЬСЯ ПРЕИМУЩЕСТВАМИ"
                        }
                    />
                </div>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default LoginPage;
