import React, { useState } from "react";
import "./SizesTable.scss";

import ReactModal from "react-modal";

const sizes = [
    ["XXS", 76, 62, 86],
    ["XS", 80, 65, 90],
    ["S", 84, 68, 94],
    ["M", 88, 72, 97],
    ["L", 92, 76, 100],
    ["XL", 96, 80, 103],
    ["XXL", 100, 84, 106],
    ["XXXL", 110, 94.5, 114],
    ["XXS/XS", "76-80", "62-65", "86-90"],
    ["XS/M", "80-88", "65-72", "90-97"],
    ["XS/L", "80-92", "65-76", "90-100"],
    ["S/M", "84-88", "68-72", "94-97"],
    ["L/XL", "92-96", "76-80", "100-103"],
    ["L/XXL", "92-100", "76-84", "100-106"],
    ["XL/XXL", "96-100", "80-84", "103-106"],
];

export const SizesTable: React.FC = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <span onClick={() => setIsModalOpen(true)}>{children}</span>
            <ReactModal
                className="Maritel__Modal SizesTable__Modal"
                overlayClassName="Maritel__ModalOverlay SizesTable__ModalOverlay"
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <div
                    className="SizesTable__Close"
                    onClick={() => setIsModalOpen(false)}
                >
                    &times;
                </div>
                <table
                    cellPadding="0"
                    cellSpacing="0"
                    width="100%"
                    className="SizesTable"
                >
                    <tbody>
                        <tr>
                            <th>РАЗМЕР</th>
                            <th>ОБХВАТ ГРУДИ</th>
                            <th>ОБХВАТ ТАЛИИ</th>
                            <th>ОБХВАТ БЕДЕР</th>
                        </tr>
                        {sizes.map((size, i) => {
                            return (
                                <tr key={i}>
                                    {size.map((item, j) => (
                                        <td key={j}>{item}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ReactModal>
        </>
    );
};
