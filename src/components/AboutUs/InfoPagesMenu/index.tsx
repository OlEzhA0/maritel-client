import React from "react";
import "./InfoPagesMenu.scss";
import { Link } from "react-router-dom";
import { INFO_PAGES_MENU } from "../../../helpers";

type Props = {
    path: InfoPageNames;
};

export const InfoPagesMenu = ({ path }: Props) => {
    return (
        <div className="InfoPagesMenu hide-mobile">
            {INFO_PAGES_MENU.map((category) => (
                <div key={category.title} className="InfoPagesMenu__Category">
                    <div className="InfoPagesMenu__Title">{category.title}</div>
                    {category.items.map(({ name, link }, i) => (
                        <div
                            key={i}
                            className={`InfoPagesMenu__Link ${
                                `/about/${path}` === link &&
                                "InfoPagesMenu__Link--active"
                            }`}
                        >
                            <Link to={link}>{name}</Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
