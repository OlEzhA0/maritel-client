import React, { useEffect, useMemo, useRef, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../store/actionCreators";

export const SearchBox = () => {
    const location = useLocation();

    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [searchPlaceholder, setSearchPlaceholder] = useState("");

    const isSearchPage = useMemo(() => {
        return location.pathname.includes("/search");
    }, [location.pathname]);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const redirectRef = useRef(false);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!isSearchPage && query) {
            timeoutRef.current = setTimeout(() => {
                redirectRef.current = true;
                setSearchPlaceholder("");
            }, 800);
        } else if (query) {
            timeoutRef.current = setTimeout(() => {
                dispatch(setSearchQuery(query));
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
        <label className="Header__GeneralSearch">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    if (!isSearchPage) {
                        redirectRef.current = true;
                        setSearchPlaceholder("");
                    } else {
                        dispatch(setSearchQuery(query));
                    }
                }}
            >
                <input
                    type="text"
                    className="Header__Search"
                    value={query}
                    onChange={(e) => {
                        if (!e.target.value) {
                            setSearchPlaceholder("Что вы ищите?");
                        }
                        setQuery(e.target.value);
                    }}
                    placeholder={searchPlaceholder}
                    onFocus={() => setSearchPlaceholder("Что вы ищите?")}
                    onBlur={() => setSearchPlaceholder("")}
                />
            </form>
            <img src="/images/header/zoom.svg" alt="zoom" />
        </label>
    );
};
