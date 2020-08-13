import React, { useState, useMemo, useEffect } from "react";
import "./SelectDropDown.scss";
import cn from "classnames";
import { sortBy } from "../../helpers";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  values: SortBy[];
}

export const SelectDropDown: React.FC<Props> = ({ values }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const sortedValue = useMemo(() => searchParams.get(sortBy), [searchParams]);

  const [isOpen, setIsOpen] = useState(false);

  const setItem = (item: SortBy) => {
    searchParams.set(sortBy, item);

    history.push({
      search: searchParams.toString(),
    });
    setIsOpen(false);
  };

  const clickSubscribe = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.removeEventListener("click", clickSubscribe);
    } else {
      document.documentElement.addEventListener("click", clickSubscribe);
    }
  }, [isOpen]);

  return (
    <div className="SelectDropDown">
      <div className="SelectDropDown__Main" onClick={() => setIsOpen(!isOpen)}>
        <p className="SelectDropDown__MainText">
          {sortedValue || "сортировать по"}
        </p>
        <img
          src="/images/goodsList/sortArrow.svg"
          alt="arrow"
          className={cn({
            SelectDropDown__Arrow: true,
            "SelectDropDown__Arrow--open": isOpen,
          })}
        />
      </div>
      {isOpen && (
            <label
              className={cn({
                "SelectDropDown--after": isOpen,
              })}
            />
          )}

      <ul
        className={cn({
          SelectDropDown__List: true,
          "SelectDropDown__List--open": isOpen,
        })}
      >
        {values
          .filter((value) => value !== sortedValue)
          .map((value) => (
            <li
              className="SelectDropDown__Item"
              key={value}
              onClick={() => setItem(value)}
            >
              {value}
            </li>
          ))}
      </ul>
    </div>
  );
};
