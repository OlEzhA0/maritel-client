import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

type Props = {
    path: { url: string; name: string }[];
};

export const Breadcrumbs: React.FC<Props> = ({ path }) => {
    const links = [{ url: "/", name: "HOME" }];

    let url = "";

    for (let i = 0; i < path.length; i++) {
        url += `/${path[i].url}`;
        links.push({ name: path[i].name, url });
    }

    return (
        <ul className="Maritel__Breadcrumbs hide-mobile">
            {links.map((item, i) => {
                if (i === links.length - 1) {
                    return (
                        <li key={i} className="Maritel__Breadcrumbs__Active">
                            {item.name}
                        </li>
                    );
                }

                return (
                    <li key={i}>
                        <Link to={item.url}>{item.name}&nbsp;/&nbsp;</Link>
                    </li>
                );
            })}
        </ul>
    );
};
