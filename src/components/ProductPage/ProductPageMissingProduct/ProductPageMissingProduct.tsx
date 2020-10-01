import React from "react";
import { useMutation } from "react-apollo";
import { useForm, SubmitHandler } from "react-hook-form";
import { AddProductSubscriber } from "../../../helpers";
import { Checkbox } from "../../Checkbox";
import { Input } from "../../Input/Input";

import CheckmarkIcon from "../../../images/checkmark.svg";

import "./ProductPageMissingProduct.scss";

type Props = {
    size: string;
    product: string;
    closeModal: () => void;
};

type FormType = {
    name: string;
    email: string;
    phone: string;
    subscribe: boolean;
};

export const ProductPageMissingProduct: React.FC<Props> = ({
    size,
    product,
    closeModal,
}) => {
    const [addSubscriber, { data }] = useMutation<{ AddProductSubscriber: boolean }>(
        AddProductSubscriber
    );

    const { errors, register, handleSubmit } = useForm<FormType>({
        mode: "all",
    });

    const subscribeCustomer: SubmitHandler<FormType> = (data) => {
        addSubscriber({ variables: { ...data, size, product } });
    };

    if (data && data.AddProductSubscriber) {
        return (
            <div className="ProductPageMissingProduct ProductPageMissingProduct__Success">
                <div
                    className="ProductPageMissingProduct__Close"
                    onClick={closeModal}
                >
                    &times;
                </div>
                <div className="ProductPageMissingProduct__SuccessCheckmark">
                    <img src={CheckmarkIcon} alt="" />
                </div>
                <h4 className="ProductPageMissingProduct__Title">
                    Как только размер появится на сайте, мы сообщим вам об этом!
                </h4>
            </div>
        );
    }

    return (
        <div className="ProductPageMissingProduct">
            <div
                className="ProductPageMissingProduct__Close"
                onClick={closeModal}
            >
                &times;
            </div>
            <h4 className="ProductPageMissingProduct__Title">
                Узнать о поступлении
            </h4>
            <div className="ProductPageMissingProduct__Info">
                Пожалуйста, оставьте ваши контактные данные. Как только размер
                появится на сайте, мы сообщим вам об этом!
            </div>
            <form onSubmit={handleSubmit(subscribeCustomer)}>
                <Input
                    label="Имя"
                    name="name"
                    register={register({ minLength: 2 })}
                    error={errors.name}
                />
                <Input
                    label="E-mail"
                    name="email"
                    register={register({ required: true, minLength: 2 })}
                    required={true}
                    error={errors.email}
                />
                <Input
                    label="Телефон"
                    name="phone"
                    register={register({
                        required: true,
                        minLength: 10,
                        maxLength: 14,
                    })}
                    required={true}
                    error={errors.phone}
                />
                <Checkbox
                    label="Подписаться на новости"
                    name="subscribe"
                    register={register()}
                />
                <button className="LoginForm__Submit" type="submit">
                    СООБЩИТЬ О ПОСТУПЛЕНИИ
                </button>
            </form>
            <div className="ProductPageMissingProduct__Info">
                Нажимая на кнопку «сообщить о поступлении», я соглашаюсь на
                обработку моих персональных данных и ознакомлен(а) с{" "}
                <span style={{ color: "#BB2A36" }}>правилами сайта.</span>
            </div>
        </div>
    );
};
