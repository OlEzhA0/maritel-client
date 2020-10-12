import React from "react";

export const AboutUsVacancies = () => {
    return (
        <div>
            <h3 className="AboutUsPage__Title">ВАКАНСИИ</h3>
            <div className="AboutUsPage__Vacancy">
                <div className="AboutUsPage__SubTitle">
                    МЕНЕДЖЕР ПО ПРОДАЖАМ
                </div>
                <div className="AboutUsPage__Text">Каменское | 23.09.2020</div>
            </div>
            <div className="AboutUsPage__Vacancy">
                <div className="AboutUsPage__SubTitle">УБОРЩИЦА</div>
                <div className="AboutUsPage__Text">Каменское | 23.09.2020</div>
            </div>
            <div className="AboutUsPage__ContactUs">
                <div className="AboutUsPage__SubTitle">
                    НАШЛИ ПОДХОДЯЩУЮ ВАКАНСИЮ?
                    <br />
                    ОТПРАВЬТЕ СВОЕ РЕЗЮМЕ ПО АДРЕСУ
                    <br />
                    <span className="AboutUsPage__Email">
                        MARITEL.COM.UA@GMAIL.COM
                    </span>
                </div>
            </div>
        </div>
    );
};
