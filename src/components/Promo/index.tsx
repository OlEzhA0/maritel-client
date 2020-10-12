import React, { useEffect, useRef, useState } from "react";
import "./Promo.scss";

import { useQuery } from "react-apollo";
import { getPromo } from "../../helpers";
import { useDispatch } from "react-redux";
import { setPromo } from "../../store/actionCreators";
import ClipLoader from "react-spinners/ClipLoader";

export const Promo = () => {
    const dispatch = useDispatch();

    const [promoName, setPromoName] = useState("");
    const [promoError, setPromoError] = useState("");

    const { data, loading } = useQuery<{ promo: Promo | null }>(getPromo, {
        variables: { promoName },
        skip: !promoName,
        fetchPolicy: "network-only",
    });

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(setPromo(data?.promo || ({} as Promo)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, data?.promo]);

    useEffect(() => {
        if (!promoName) {
            return;
        }
        if (!loading) {
            if (!data?.promo) {
                setPromoError("Промо-код не найден");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data]);

    return (
        <div className="Promo">
            {loading && (
                <div className="Promo__Loading">
                    <ClipLoader size={25} />
                </div>
            )}
            <div className="Promo__Title">ПРОМО-КОД</div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="Promo__Content">
                    <div className="Promo__InputContainer">
                        <input
                            className={`Promo__Input ${
                                promoError && "Promo__Input__Error"
                            } ${
                                data?.promo?.promoName &&
                                "Promo__Input__Success"
                            }`}
                            name="promo"
                            ref={inputRef}
                            onChange={() => setPromoError("")}
                            placeholder="ВВЕДИТЕ ВАШ ПРОМО-КОД ЗДЕСЬ"
                        />
                        <div className="Promo__Error">{promoError}</div>
                    </div>

                    <button
                        onClick={() => {
                            setPromoName(
                                inputRef.current ? inputRef.current.value : ""
                            );
                        }}
                        className="Promo__Submit"
                    >
                        ПРИМЕНИТЬ
                    </button>
                </div>
            </form>
        </div>
    );
};
