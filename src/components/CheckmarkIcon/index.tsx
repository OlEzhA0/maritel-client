import React from "react";

type Props = {
    fill?: string;
    width?: string | number;
    height?: string | number;
};

export const CheckmarkIcon = ({ width, height, fill }: Props) => (
    <svg
        width={width || 17}
        height={height || 12}
        viewBox={`0 0 ${width || 17} ${height || 12}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.40625 11.75C6.71875 12.0625 7.25 12.0625 7.5625 11.75L16.75 2.5625C17.0625 2.25 17.0625 1.71875 16.75 1.40625L15.625 0.28125C15.3125 -0.03125 14.8125 -0.03125 14.5 0.28125L7 7.78125L3.46875 4.28125C3.15625 3.96875 2.65625 3.96875 2.34375 4.28125L1.21875 5.40625C0.90625 5.71875 0.90625 6.25 1.21875 6.5625L6.40625 11.75Z"
            fill={fill || "white"}
        />
    </svg>
);
