import React, { useEffect } from "react";
import "./CartPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getIsLogged } from "../../store/actionsTypes";
import { CartProdItem } from "../../components/Cart/CartProdItem";
import { useForm } from "react-hook-form";
import ReactTooltip from "react-tooltip";
import {
    getCityWarehouses,
    getDeliveryAddress,
    getNVSettlements,
} from "./../../helpers/novaposhtaAPI";
import AsyncSelect from "../../components/common/AsyncSelect/AsyncSelect";
import { setOrderInfo } from "../../store/actionCreators";
import { CartPageOrderSummary } from "../../components/Cart/CartPageOrderSummary";
import { Input } from "../../components/common/Input/Input";

import { RadioInput } from "../../components/common/RadioInput/RadioInput";
import { getCustomer } from "../../helpers/gqlQuery";
import { useQuery } from "react-apollo";

export type CartFormType = {
    payer: {
        firstName: string;
        lastName: string;
        phone: string;
    };
    customReceiver?: {
        firstName: string;
        lastName: string;
        patronymic: string;
        phone: string;
    };
    receiver: "payer" | "custom";
    shippingMethod?: "postOffice" | "courier";
    deliveryAddress: {
        street?: OptionType;
        houseNumber?: string;
        appartment?: string;
        value?: string;
        name?: string;
    };
    city: OptionType;
    paymentMethod: "card" | "cash" | "";
    paymentService: "wayforpay" | "liqpay" | "";
};

export const CartPage = () => {
    const dispatch = useDispatch();

    const isLogged = useSelector(getIsLogged);

    const cart = useSelector(getCart);

    const { data, loading } = useQuery<{ customer: Customer }>(getCustomer, {
        skip: !isLogged,
    });

    const formMethods = useForm<CartFormType>({
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const { register, getValues, watch, reset, control, errors } = formMethods;

    const formValues = getValues();

    useEffect(() => {
        if (!loading && data?.customer) {
            const {
                firstName,
                lastName,
                phone,
                city,
                shippingAddress,
                shippingMethod,
            } = data.customer;
            const customerInfo: CartFormType = {} as CartFormType;
            customerInfo.payer = {
                firstName,
                lastName,
                phone,
            };

            delete (city as any).__typename;
            customerInfo.city = city;
            customerInfo.shippingMethod = shippingMethod?.value;
            if (shippingMethod?.value === "postOffice") {
                customerInfo.deliveryAddress = {
                    value: shippingAddress.value,
                    name: shippingAddress.name,
                };
            } else if (shippingMethod?.value === "courier") {
                delete (shippingAddress.street as any).__typename;
                customerInfo.deliveryAddress = {
                    street: shippingAddress.street,
                    houseNumber: shippingAddress.houseNumber,
                    appartment: shippingAddress.appartment,
                };
            }

            reset({ ...customerInfo });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    watch("shippingMethod");
    watch("receiver");
    watch("paymentMethod");
    watch("paymentService");
    watch("deliveryAddress");
    watch("city");

    useEffect(() => {
        dispatch(setOrderInfo({ ...getValues() }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues()]);

    if (!cart.length) {
        return (
            <div className="CartPage Page__Wrap">
                <div className="CartPage__EmptyCart">
                    Добавьте товары в корзину
                </div>
            </div>
        );
    }

    return (
        <div className="CartPage Page__Wrap">
            <ReactTooltip />

            <div className="CartPage__RegisterOrder">
                <p className="CartPage__Hint"></p>
                <div className="CartPage__InfoTitle">
                    <h1 className="CartPage__TitlePage">корзина</h1>
                    <p className="CartPage__CountProds">
                        ({cart.length} товара)
                    </p>
                </div>
                <ul className="CartPage__ProdsList">
                    {cart.map((prod) => (
                        <CartProdItem
                            key={prod.prodUuid + prod.size}
                            uuid={prod.prodUuid}
                            size={prod.size}
                            quantity={prod.quantity}
                        />
                    ))}
                </ul>
            </div>
            {!loading && (
                <>
                    {/* <Promo /> */}
                    <CartPageOrderSummary formMethods={formMethods} />
                    <div className="CartPage__StepTitle">
                        1. ВАШИ КОНТАКТНЫЕ ДАННЫЕ
                    </div>
                    <div className="CartPage__FormContainer">
                        <Input
                            label="Фамилия"
                            name="payer.lastName"
                            register={register({
                                required: true,
                                minLength: 3,
                            })}
                            error={errors.payer?.lastName}
                            errorMessage="Введите свою фамилию"
                            required={true}
                        />
                        <Input
                            label="Имя"
                            name="payer.firstName"
                            register={register({
                                required: true,
                                minLength: 2,
                            })}
                            error={errors.payer?.firstName}
                            errorMessage="Введите свое имя"
                            required={true}
                        />
                        <Input
                            label="Телефон"
                            name="payer.phone"
                            register={register({
                                minLength: 10,
                                maxLength: 13,
                                required: true,
                            })}
                            error={errors.payer?.phone}
                            errorMessage="Укажите мобильный номер"
                            required={true}
                        />
                        <AsyncSelect
                            name="city"
                            control={control}
                            label="Город"
                            getOptions={getNVSettlements}
                            required={true}
                            error={errors.city?.value}
                            errorMessage={"Укажите город доставки"}
                        />
                    </div>
                    <div className="CartPage__StepTitle">
                        2. ДОСТАВКА{" "}
                        {formValues.city?.value && (
                            <>
                                В
                                <span className="CartPage__CityName">
                                    {" "}
                                    {formValues.city?.name
                                        .split(" ")[0]
                                        .toUpperCase()}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="CartPage__ShippingMethodContainer">
                        <div className="CartPage__ShippingMethodItem">
                            <RadioInput
                                label="В отделение Новой Почты"
                                register={register({ required: true })}
                                value="postOffice"
                                name="shippingMethod"
                                disabled={!formValues.city?.name}
                                disabledMessage="Пожалуйста, выберите город."
                            />
                            {formValues.shippingMethod === "postOffice" && (
                                <AsyncSelect
                                    name="deliveryAddress"
                                    control={control}
                                    style={{ marginLeft: "6%" }}
                                    getOptions={(searchQuery: string) =>
                                        getCityWarehouses(
                                            searchQuery,
                                            formValues.city?.value
                                        )
                                    }
                                    placeholder="Полный адрес доставки"
                                    error={errors.deliveryAddress?.name}
                                    errorMessage="Виберите отделение"
                                />
                            )}
                        </div>
                        <div className="CartPage__ShippingMethodItem">
                            <RadioInput
                                label="Курьер Новая Почта"
                                register={register}
                                name="shippingMethod"
                                value="courier"
                                disabled={!formValues.city?.name}
                                disabledMessage="Пожалуйста, выберите город."
                            />
                            {formValues.shippingMethod === "courier" && (
                                <div className="CartPage__CourierDelivery">
                                    <AsyncSelect
                                        name="deliveryAddress.street"
                                        control={control}
                                        className="Maritel__InputContainer__Street"
                                        label="Улица"
                                        getOptions={(searchQuery: string) =>
                                            getDeliveryAddress(
                                                searchQuery,
                                                formValues.city?.value
                                            )
                                        }
                                        error={
                                            errors.deliveryAddress?.street?.name
                                        }
                                        errorMessage="Укажите улицу"
                                        required={true}
                                    />
                                    <Input
                                        label="Дом"
                                        name="deliveryAddress.houseNumber"
                                        register={register({
                                            required: true,
                                        })}
                                        className="Maritel__InputContainer__Small"
                                        error={
                                            errors.deliveryAddress?.houseNumber
                                        }
                                        errorMessage="Укажите дом"
                                        required={true}
                                    />
                                    <Input
                                        label="Квартира"
                                        name="deliveryAddress.appartment"
                                        register={register({})}
                                        className="Maritel__InputContainer__Small"
                                        error={
                                            errors.deliveryAddress?.appartment
                                        }
                                        errorMessage="Укажите квартиру"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="CartPage__StepTitle">3. ОПЛАТА</div>
                    <div className="CartPage__PaymentMethodContainer">
                        <div className="CartPage__RadioWithHint">
                            <label className="CartPage__RadioContainer">
                                <span>Наличными (наложенный платеж)</span>
                                <span className="CartPage__PaymentHint">
                                    Оплата при получении товара (предоплата 200
                                    грн)
                                </span>
                                <input
                                    type="radio"
                                    value="cash"
                                    name="paymentMethod"
                                    ref={register({ required: true })}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <div style={{ marginBottom: "1.5%" }}>
                            <RadioInput
                                label="Картой онлайн"
                                name="paymentMethod"
                                value="card"
                                register={register({ required: true })}
                            />
                        </div>
                        {formValues.paymentMethod === "card" && (
                            <>
                                <div className="CartPage__PaymentServiceContainer">
                                    <RadioInput
                                        label="LiqPay"
                                        name="paymentService"
                                        value="liqpay"
                                        register={register({ required: true })}
                                    />
                                </div>
                                <div className="CartPage__PaymentServiceContainer">
                                    <RadioInput
                                        label="WayForPay"
                                        name="paymentService"
                                        value="wayforpay"
                                        register={register({ required: true })}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="CartPage__StepTitle">
                        4. КОНТАКТНЫЕ ДАННЫЕ ПОЛУЧАТЕЛЯ
                    </div>
                    <div className="CartPage__ShippingMethodContainer">
                        <div>
                            <RadioInput
                                label="Я"
                                register={register}
                                name="receiver"
                                value="payer"
                                passThrough={{ defaultChecked: true }}
                            />
                        </div>
                        <div>
                            <RadioInput
                                label="Другой человек"
                                register={register}
                                name="receiver"
                                value="custom"
                            />
                        </div>
                    </div>
                    <div className="CartPage__FormContainer">
                        {formValues.receiver === "custom" && (
                            <>
                                <Input
                                    label="Фамилия"
                                    name="customReceiver.lastName"
                                    register={register({
                                        required: true,
                                        minLength: 3,
                                    })}
                                    error={errors.customReceiver?.lastName}
                                    errorMessage="Укажите фамилию получателя"
                                    required={true}
                                />

                                <Input
                                    label="Имя"
                                    name="customReceiver.firstName"
                                    register={register({
                                        required: true,
                                        minLength: 2,
                                    })}
                                    error={errors.customReceiver?.firstName}
                                    errorMessage="Укажите имя получателя"
                                    required={true}
                                />

                                <Input
                                    label="Отчество"
                                    name="customReceiver.patronymic"
                                    register={register({
                                        required: true,
                                        minLength: 4,
                                    })}
                                    error={errors.customReceiver?.patronymic}
                                    errorMessage="Укажите отчество получателя"
                                    required={true}
                                />

                                <Input
                                    label="Телефон"
                                    name="customReceiver.phone"
                                    register={register({
                                        minLength: 10,
                                        maxLength: 13,
                                        required: true,
                                    })}
                                    error={errors.customReceiver?.phone}
                                    errorMessage="Укажите мобильный номер"
                                    required={true}
                                />
                            </>
                        )}
                    </div>

                    <div className="CartPage__ConfirmOrder"></div>
                    <ReactTooltip />
                </>
            )}
        </div>
    );
};
