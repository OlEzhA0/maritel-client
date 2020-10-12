import React, { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { ProductsList } from "../../components/ProductsList";
import { getProducts, getSearchQuery } from "../../store/actionsTypes";

export const SearchPage = () => {
    const history = useHistory();
    const { search } = useLocation();

    const products = useSelector(getProducts);

    const searchParams = new URLSearchParams(search);

    const query = useSelector(getSearchQuery);

    const lastQueryRef = useRef("");

    useEffect(() => {
        searchParams.set("query", query);

        history.push({
            search: searchParams.toString(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const filteredProducts: Products[] = useMemo(() => {
        if (!query) {
            return products;
        }

        const regexp = new RegExp(query, "i");

        if (lastQueryRef.current.includes(query)) {
            lastQueryRef.current = query;
            return filteredProducts.filter((product) =>
                regexp.test(product.title)
            );
        }

        return products.filter((product) => regexp.test(product.title));
    }, [query, products]);

    return (
        <div className="Page__Wrap">
            <ProductsList isSearch={true} searchProducts={filteredProducts} />
        </div>
    );
};
