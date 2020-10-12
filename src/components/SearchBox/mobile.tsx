import React, { useEffect, useMemo, useRef, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/actionCreators";
import cn from "classnames";

type Props = {
    open: boolean;
    setOpen: (x: boolean) => any;
};

export const SearchBoxMobile = ({ open, setOpen }: Props) => {
    const location = useLocation();

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");

    const isSearchPage = useMemo(() => {
        return location.pathname.includes("/search");
    }, [location.pathname]);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const redirectRef = useRef(false);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!isSearchPage) {
            timeoutRef.current = setTimeout(() => {
                redirectRef.current = true;
                setOpen(false);
            }, 800);
        } else {
            timeoutRef.current = setTimeout(() => {
                dispatch(setSearchQuery(query));
                setOpen(false);
            }, 800);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    if (!isSearchPage && redirectRef.current && query) {
        dispatch(setSearchQuery(query));
        return <Redirect to={{ pathname: "/search" }} />;
    }
    if (isSearchPage) {
        redirectRef.current = false;
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                if (!isSearchPage) {
                    redirectRef.current = true;
                    setOpen(false);
                } else {
                    dispatch(setSearchQuery(query));
                    setOpen(false);
                }
            }}
        >
            <input
                type="text"
                className={cn({
                    Header__MobileSearch: true,
                    "Header__MobileSearch--open": open,
                })}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder="Что вы ищите?"
            />
        </form>
    );
};
