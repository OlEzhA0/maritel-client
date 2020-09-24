import React, { useEffect, useState } from "react";
import "./RegistrationPage.scss";
import { useMutation, useQuery } from "react-apollo";
import { useSelector } from "react-redux";
import { getCustomer } from "../../helpers/gqlQuery";
import { useForm } from "react-hook-form";
import { getIsLogged } from "../../store/actionsTypes";
import { Redirect } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import AsyncSelect from "../../components/AsyncSelect/AsyncSelect";
import {
    getCityWarehouses,
    getDeliveryAddress,
    getNVSettlements,
} from "./../../helpers/novaposhtaAPI";
import { Select } from "../../components/Select/Select";
import { editCustomer } from "../../helpers";
import { SpinnerLoader } from "../../components/SpinnerLoader";

const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

type FormType = {
    firstName: string;
    lastName: string;
    city: OptionType;
    shippingMethod?: { value: "postOffice" | "courier"; name: string };
    shippingAddress: {
        street?: string;
        houseNumber?: string;
        appartment?: string;
        value?: string;
        name?: string;
    };
    birthday?: {
        day: string;
        month: string;
    };
    phone: string;
    gender: { value: "male" | "female"; name: string };
};

export const RegistrationPage = () => {
    const {
        register,
        watch,
        setValue,
        getValues,
        setError,
        reset,
        handleSubmit,
        trigger,
        errors,
        control,
    } = useForm<FormType>();

    const isLogged = useSelector(getIsLogged);

    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer, {
        skip: !isLogged,
    });

    const [redirect, setRedirect] = useState("");

    const [updateCustomer] = useMutation(editCustomer);

    useEffect(() => {
        if (getValues().birthday?.day) {
            const day = parseInt(getValues().birthday?.day!);
            let daysInAMonth = 31;

            if (getValues().birthday?.month) {
                const month = parseInt(getValues().birthday?.month!);
                if (month === 1) {
                    daysInAMonth = 29;
                } else {
                    const date = new Date();
                    date.setMonth(month);
                    date.setDate(0);
                    daysInAMonth = date.getDate();
                }
            }

            if (day > daysInAMonth) {
                setValue("birthday.day", daysInAMonth);
            } else if (day < 1) {
                setValue("birthday.day", 1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues().birthday]);

    useEffect(() => {
        if (!loading && data?.customer) {
            const { customer } = data;
            const defaultFormValues: { [x: string]: any } = {};
            console.log("customer", customer);
            Object.keys(customer).forEach((key) => {
                if (
                    customer[key as keyof FormType] !== "" &&
                    customer[key as keyof FormType] !== null
                ) {
                    if (typeof customer[key as keyof FormType] === "object") {
                        defaultFormValues[key] = {
                            ...(customer[key as keyof FormType] as object),
                        };
                        delete defaultFormValues[key].__typename;
                    } else {
                        defaultFormValues[key] =
                            customer[key as keyof FormType];
                    }
                }
            });
            setValue("shippingMethod", defaultFormValues.shippingMethod);
            console.log(defaultFormValues);
            reset(defaultFormValues);
            trigger();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    if (loading) {
        return (
            <div className="Page__Wrap">
                <SpinnerLoader />
            </div>
        );
    }

    if (!isLogged && !data?.customer) {
        return <Redirect to="/login" />;
    }

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    // if (data.customer.status === "registered") {
    //     return <Redirect to="/account" />;
    // }

    watch("shippingMethod");
    watch("shippingMethod.name");
    watch("shippingMethod.value");
    watch("city");
    watch("birthday");

    const { shippingMethod, city } = getValues();

    console.log(getValues());

    const onSubmit = (fieldData: FormType) => {
        if (fieldData) {
            if (fieldData.birthday?.day || fieldData.birthday?.month) {
                if (!fieldData.birthday?.day) {
                    setError("birthday.day", {});
                    return;
                }
                if (!fieldData.birthday?.month) {
                    setError("birthday.month", {});
                    return;
                }
            }

            if (fieldData.shippingMethod?.value === "postOffice") {
                delete (fieldData.shippingAddress.street as any).__typename;
            }

            updateCustomer({
                variables: {
                    _id: "5f66116ca7f08c3f98193af3",
                    customer: {
                        ...{
                            ...fieldData,
                            shippingAddress: {
                                street: {},
                                houseNumber: "",
                                appartment: "",
                                value: "",
                                name: "",
                                ...fieldData.shippingAddress,
                            },
                        },
                        status: "registered",
                    },
                },
                update: (store, { data }) => {
                    if (!data) {
                        return null;
                    }

                    store.writeQuery({
                        query: getCustomer,
                        data: { customer: data?.EditCustomerInfo },
                    });
                    setRedirect("/account");
                },
            });
        }
    };

    return (
        <div className="RegistrationPage Page__Wrap">
            <div className="RegistrationPage__Title">информация о вас</div>
            <div className="RegistrationPage__Container">
                <div className="RegistrationPage__PersonalInformation">
                    {data?.customer.status === "registering" && (
                        <div>
                            Спасибо за регистрацию. Заполните свой профиль и
                            делайте покупки с легкостью.
                        </div>
                    )}
                    <div>
                        <span className="Maritel__Required">* </span>
                        Обязательные поля
                    </div>
                    <div>
                        <span>Email: </span> {data?.customer.email}
                    </div>
                    <div>
                        <span>Пароль:</span> {"  "}*******
                    </div>
                    <div>
                        <span>Maritel' Club Member ID:</span>{" "}
                        {data?.customer._id}
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        required={true}
                        name="firstName"
                        label="Имя"
                        register={register({ required: true, minLength: 3 })}
                        error={errors.firstName}
                    />
                    <Input
                        required={true}
                        name="lastName"
                        label="Фамилия"
                        register={register({ required: true, minLength: 3 })}
                        error={errors.lastName}
                    />
                    <AsyncSelect
                        label="Город"
                        name="city"
                        control={control}
                        getOptions={getNVSettlements}
                    />
                    <Input
                        required={true}
                        name="phone"
                        label="Мобильный номер"
                        register={register({
                            required: true,
                            minLength: 10,
                            maxLength: 13,
                        })}
                        error={errors.phone}
                    />
                    <Select
                        label="Доставка"
                        name="shippingMethod"
                        control={control}
                        options={[
                            { value: "postOffice", name: "В отделение" },
                            { value: "courier", name: "Курьером" },
                        ]}
                    />
                    {shippingMethod?.value === "postOffice" && (
                        <AsyncSelect
                            label="Отделение Новой Почты"
                            name="shippingAddress"
                            control={control}
                            getOptions={(searchQuery: string) =>
                                getCityWarehouses(searchQuery, city?.value)
                            }
                        />
                    )}
                    {shippingMethod?.value === "courier" && (
                        <>
                            <div className="CartPage__CourierDelivery">
                                <AsyncSelect
                                    name="shippingAddress.street"
                                    control={control}
                                    style={{
                                        flexBasis: "56%",
                                    }}
                                    label="Улица"
                                    getOptions={(searchQuery: string) =>
                                        getDeliveryAddress(
                                            searchQuery,
                                            getValues().city?.value
                                        )
                                    }
                                    error={errors.shippingAddress?.street}
                                    errorMessage="Укажите улицу"
                                    required={true}
                                />
                                <Input
                                    label="Дом"
                                    name="shippingAddress.houseNumber"
                                    register={register({
                                        required: true,
                                    })}
                                    className="Maritel__InputContainer__Small"
                                    error={errors.shippingAddress?.houseNumber}
                                    errorMessage="Укажите дом"
                                    required={true}
                                />
                                <Input
                                    label="Квартира"
                                    name="shippingAddress.appartment"
                                    register={register({})}
                                    className="Maritel__InputContainer__Small"
                                    error={errors.shippingAddress?.appartment}
                                    errorMessage="Укажите квартиру"
                                />
                            </div>
                        </>
                    )}
                    <Select
                        placeholder="Выберите свой пол"
                        label="Пол"
                        name="gender"
                        control={control}
                        options={[
                            { value: "male", name: "Мужской" },
                            { value: "female", name: "Женский" },
                        ]}
                    />
                    <div className="RegistrationPage__BirthdayContainer">
                        <div className="RegistrationPage__BirthdayTitle">
                            Ваш день рождения (мы любим дарить подарки)
                        </div>
                        <Input
                            name="birthday.day"
                            register={register({})}
                            placeholder="День"
                            error={errors.birthday?.day}
                        />
                        <Select
                            placeholder="Месяц"
                            name="birthday.month"
                            control={control}
                            options={months.map((month, index) => ({
                                name: month,
                                value: index.toString(),
                            }))}
                            error={errors.birthday?.month}
                            returnValue={true}
                        />
                    </div>
                    <div>
                        <button className="LoginForm__Submit" type="submit">
                            ПОДТВЕРДИТЬ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
