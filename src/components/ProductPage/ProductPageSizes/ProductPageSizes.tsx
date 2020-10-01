import React from "react";
import "./ProductPageSizes.scss";
import cn from "classnames";
import { SizesTable } from "../../SizesTable/SizesTable";

interface Props {
    prodType: string;
    product: Products;
    choosenSize: string;
    setChoosenSize: (size: Sizes) => void;
}

export const ProductPageSizes: React.FC<Props> = ({
    prodType,
    product,
    choosenSize,
    setChoosenSize,
}) => (
    <div className="ProductPageSizes">
        <div className="ProductPageSizes__Title">
            <p className="ProductPageSizes__Text">Размер:</p>
            <SizesTable>
                <p className="ProductPageSizes__Sheets">РАЗМЕРНАЯ СЕТКА</p>
            </SizesTable>
        </div>
        <div className="ProductPageSizes__Wrap">
            <ul className="ProductPageSizes__List">
                {product.sizes.map((size) => (
                    <li
                        key={size.size}
                        className={cn({
                            ProductPageSizes__Size: true,
                            "ProductPageSizes__Size--choosen":
                                size.size === choosenSize,
                        })}
                        onClick={() => {
                            setChoosenSize(size);
                        }}
                    >
                        {parseInt(size.stock) > 0 && size.size}
                        {parseInt(size.stock) < 1 && (
                            <>
                                <p>{size.size}</p>
                                <br />
                                <p style={{ fontSize: "10px" }}>подписка</p>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
