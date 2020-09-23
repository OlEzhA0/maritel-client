import React from "react";
import "./Checkbox.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Props = {
    label?: string;
    name: string;
    register: any;
};

export const Checkbox = (props: Props) => {
    return (
        <label className="Maritel__Checkbox__Container">
            {props.label}
            <input
                className="Maritel__Checkbox"
                type="checkbox"
                name={props.name}
                ref={props.register}
            />
            <span className="Maritel__Checkbox__Checkmark">
                <FontAwesomeIcon icon={faCheck} />
            </span>
        </label>
    );
};
