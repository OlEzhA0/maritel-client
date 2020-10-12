import React from "react";

export const AboutUsDeliveryPolicies = () => {
    return (
        <div>
            <h3 className="AboutUsPage__Title">ДОСТАВКА И ОПЛАТА</h3>
            <div className="AboutUsPage__Vacancy">
                <div className="AboutUsPage__SubTitle">ПО УКРАИНЕ</div>
                <div className="AboutUsPage__Text">
                    1. Оплата полной стоимости и получение в отделении Новой
                    Почты (экономия на доставке 40-60 грн)
                    <br />
                    2. Предоплата 200 грн. и получение наложенным платежом в
                    отделении Новой Почты
                    <br />
                    3. Оплата частями (до 4 платежей) Приват Банк или Моно Банк.
                    Не распространяется на товары со скидкой. Не пересекается с
                    акциями и купонами.
                    <br />
                    4. Мгновенная рассрочка Приват Банк.
                </div>
            </div>
            <div className="AboutUsPage__Vacancy">
                <div className="AboutUsPage__SubTitle">ДРУГИЕ СТРАНЫ</div>
                <div className="AboutUsPage__Text">
                    Оплата только полной стоимости, в стоимость входит услуга
                    доставки.
                </div>
            </div>
            <div className="AboutUsPage__Vacancy">
                <div className="AboutUsPage__SubTitle">ВАЖНО</div>
                <div className="AboutUsPage__Text">
                    Перед оплатой ознакомтесь с правилами возврата и обмена.
                </div>
            </div>
        </div>
    );
};
