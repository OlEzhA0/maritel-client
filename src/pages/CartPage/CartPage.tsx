import React, { useEffect } from "react";
import "./CartPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/actionsTypes";
import { CartProdItem } from "../../components/Cart/CartProdItem";
import { useForm } from "react-hook-form";
import ReactTooltip from "react-tooltip";
import { getCityWarehouses, getDeliveryAddress, getNVSettlements } from "./api";
import AsyncSelect from "../../components/AsyncSelect/AsyncSelect";
import { setOrderInfo } from "../../store/actionCreators";
import { CartPageOrderSummary } from "../../components/Cart/CartPageOrderSummary";
import { CartPageInput } from "../../components/CartPageInput/CartPageInput";

import { RadioInput } from "../../components/RadioInput/RadioInput";

type FormData = {
    payer: {
        firstName: string;
        lastName: string;
        phone: string;
    };
    customRecepient?: {
        firstName: string;
        lastName: string;
        patronymic: string;
        phone: string;
    };
    recepient: "payer" | "custom";
    shippingMethod: "" | "postOffice" | "courier";
    deliveryAddress: {
        street?: string;
        houseNumber?: string;
        appartment?: string;
        value?: string;
        name?: string;
    };
    city: {
        value: string;
        name: string;
    };
    paymentMethod: "card" | "cash" | "";
    paymentService: "wayforpay" | "liqpay" | "";
};

export const CartPage = () => {
    const dispatch = useDispatch();

    const cart = useSelector(getCart);

    const formMethods = useForm<FormData>({
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const {
        register,
        getValues,
        setValue,
        watch,
        control,
        errors,
    } = formMethods;

    watch("shippingMethod");
    watch("recepient");
    watch("paymentMethod");
    watch("paymentService");
    watch("deliveryAddress");

    register({ name: "city" }, { required: true });
    register({ name: "deliveryAddress.street" }, { required: true });
    register({ name: "deliveryAddress.name" }, { required: true });

    const formValues = getValues();

    useEffect(() => {
        dispatch(setOrderInfo({ ...getValues(), customRecepient: undefined }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues()]);

    return (
        <div className="CartPage Page__Wrap">
            <ReactTooltip />
            <div className="CartPage__RegisterOrder">
                <p className="CartPage__Hint">
                    БЕСПЛАТНАЯ ДОСТАВКА ПРИ ЗАКАЗЕ НА СУММУ ОТ 1500 ГРН.
                </p>
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
            <CartPageOrderSummary />
            <div className="CartPage__StepTitle">1. ВАШИ КОНТАКТНЫЕ ДАННЫЕ</div>
            <div className="CartPage__FormContainer">
                <CartPageInput
                    label="Фамилия"
                    name="payer.lastName"
                    register={register({ required: true, minLength: 4 })}
                    error={typeof errors.payer?.lastName !== "undefined"}
                    errorMessage="Введите свою фамилию"
                    required={true}
                />
                <CartPageInput
                    label="Имя"
                    name="payer.firstName"
                    register={register({ required: true, minLength: 3 })}
                    error={typeof errors.payer?.firstName !== "undefined"}
                    errorMessage="Введите свое имя"
                    required={true}
                />
                <CartPageInput
                    label="Телефон"
                    name="payer.phone"
                    register={register({
                        minLength: 10,
                        maxLength: 13,
                        required: true,
                    })}
                    error={typeof errors.payer?.phone !== "undefined"}
                    errorMessage="Укажите мобильный номер"
                    required={true}
                />

                <AsyncSelect
                    name="city"
                    control={control}
                    label="Город"
                    getOptions={getNVSettlements}
                    onSelect={(value) =>
                        setValue("city", value, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                    required={true}
                    error={typeof errors.city !== "undefined"}
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
                            {formValues.city?.name.split(" ")[0].toUpperCase()}
                        </span>
                    </>
                )}
            </div>

            <div className="CartPage__ShippingMethodContainer">
                <div className="CartPage__ShippingMethodItem">
                    <RadioInput
                        label="В отделение Новой Почты"
                        register={register}
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
                            error={
                                typeof errors.deliveryAddress?.name !==
                                "undefined"
                            }
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
                                style={{ marginLeft: "6%", flexBasis: "50%" }}
                                label="Улица"
                                getOptions={(searchQuery: string) =>
                                    getDeliveryAddress(
                                        searchQuery,
                                        formValues.city?.value
                                    )
                                }
                                error={
                                    typeof errors.deliveryAddress?.street !==
                                    "undefined"
                                }
                                errorMessage="Укажите улицу"
                                required={true}
                            />
                            <CartPageInput
                                label="Дом"
                                name="deliveryAddress.houseNumber"
                                register={register({
                                    required: true,
                                })}
                                className="CartPage__InputContainer__Small"
                                error={
                                    typeof errors.deliveryAddress
                                        ?.houseNumber !== "undefined"
                                }
                                errorMessage="Укажите дом"
                                required={true}
                            />
                            <CartPageInput
                                label="Квартира"
                                name="deliveryAddress.appartment"
                                register={register({})}
                                className="CartPage__InputContainer__Small"
                                error={
                                    typeof errors.deliveryAddress
                                        ?.appartment !== "undefined"
                                }
                                errorMessage="Укажите квартиру"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="CartPage__StepTitle">3. ОПЛАТА</div>
            <div style={{ width: "55%" }}>
                <div style={{ marginBottom: "2%" }}>
                    <label className="CartPage__RadioContainer">
                        <span>Наличными (наложенный платеж)</span>
                        <input
                            type="radio"
                            value="cash"
                            name="paymentMethod"
                            ref={register}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div style={{ marginBottom: "1.5%" }}>
                    <RadioInput
                        label="Картой онлайн"
                        name="paymentMethod"
                        value="card"
                        register={register}
                    />
                </div>
                {formValues.paymentMethod === "card" && (
                    <>
                        <div className="CartPage__PaymentServiceContainer">
                            <RadioInput
                                label="LiqPay"
                                name="paymentService"
                                value="liqpay"
                                register={register}
                            />
                        </div>
                        <div className="CartPage__PaymentServiceContainer">
                            <RadioInput
                                label="WayForPay"
                                name="paymentService"
                                value="wayforpay"
                                register={register}
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
                        name="recepient"
                        value="payer"
                        passThrough={{ defaultChecked: true }}
                    />
                </div>
                <div>
                    <RadioInput
                        label="Другой человек"
                        register={register}
                        name="recepient"
                        value="custom"
                    />
                </div>
            </div>
            <div className="CartPage__FormContainer">
                {formValues.recepient === "custom" && (
                    <>
                        <div className="CartPage__InputContainer">
                            <label>
                                Фамилия{" "}
                                <span className="CartPage__Required">*</span>
                            </label>

                            <input
                                className={
                                    errors.customRecepient?.lastName
                                        ? "CartPage__InputError"
                                        : ""
                                }
                                name="customRecepient.lastName"
                                ref={register({
                                    required: true,
                                    minLength: 4,
                                })}
                            />
                        </div>

                        <div className="CartPage__InputContainer">
                            <label>
                                Имя{" "}
                                <span className="CartPage__Required">*</span>
                            </label>
                            <input
                                className={
                                    errors.customRecepient?.firstName
                                        ? "CartPage__InputError"
                                        : ""
                                }
                                name="customRecepient.firstName"
                                ref={register({
                                    minLength: 3,
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="CartPage__InputContainer">
                            <label>
                                Отчество{" "}
                                <span className="CartPage__Required">*</span>
                            </label>

                            <input
                                className={
                                    errors.customRecepient?.patronymic
                                        ? "CartPage__InputError"
                                        : ""
                                }
                                data-tip={
                                    errors.customRecepient?.patronymic
                                        ? "Пожалуйста, введите отчество"
                                        : ""
                                }
                                name="customRecepient.patronymic"
                                ref={register({
                                    required: true,
                                    minLength: 3,
                                })}
                            />
                        </div>

                        <div className="CartPage__InputContainer">
                            <label>
                                Телефон{" "}
                                <span className="CartPage__Required">*</span>
                            </label>

                            <input
                                className={
                                    errors.customRecepient?.phone &&
                                    "CartPage__InputError"
                                }
                                name="customRecepient.phone"
                                ref={register({
                                    required: true,
                                    minLength: 10,
                                    maxLength: 13,
                                })}
                            />
                        </div>
                        <ReactTooltip />
                    </>
                )}
            </div>

            <div className="CartPage__ConfirmOrder"></div>
            <ReactTooltip />
        </div>
    );
};
