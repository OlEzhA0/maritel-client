import React, { useMemo } from "react";
import "../staticPages.scss";

import { useParams, Redirect } from "react-router-dom";
import { InfoPagesMenu } from "../../components/AboutUs/InfoPagesMenu";
import { AboutUsBrand } from "../../components/AboutUs/Brand";
import { AboutUsVacancies } from "../../components/AboutUs/Vacancies";
import { AboutUsDeliveryPolicies } from "../../components/AboutUs/DeliveryPolicies";
import { AboutUsReturnPolicies } from "../../components/AboutUs/ReturnPolicies";
import { AboutUsRules } from "../../components/AboutUs/Rules";
import { AboutUsBloggers } from "../../components/AboutUs/Bloggers";

type UrlParams = {
    path: InfoPageNames;
};

const urlParams: InfoPageNames[] = [
    "brand",
    "bloggers",
    "vacancies",
    "delivery-policies",
    "return-policies",
    "rules",
];

export const AboutUsPage = () => {
    const { path } = useParams<UrlParams>();

    const redirect = useMemo(() => {
        return !urlParams.includes(path);
    }, [path]);

    if (redirect) {
        return <Redirect to="/about/brand" />;
    }

    return (
        <div className="Page__Wrap AboutUsPage">
            <InfoPagesMenu path={path} />
            <div className="AboutUsPage__Container">
                {path === "brand" && <AboutUsBrand />}
                {path === "vacancies" && <AboutUsVacancies />}
                {path === "bloggers" && <AboutUsBloggers />}
                {path === "delivery-policies" && <AboutUsDeliveryPolicies />}
                {path === "return-policies" && <AboutUsReturnPolicies />}
                {path === "rules" && <AboutUsRules />}

            </div>
        </div>
    );
};
