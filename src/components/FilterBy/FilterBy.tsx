import cn from "classnames";
import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./FilterBy.scss";
import { v4 } from "uuid";
interface Props {
  name: string;
  options: SortOptions[];
}

export const FilterBy: React.FC<Props> = ({ name, options }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [isOpen, setIsOpen] = useState(false);
  const height = 18;
  const margin = 14;
  const [checkedParams, setCheckedParams] = useState<string[]>([]);
  const params = useMemo(() => searchParams.get(name), [searchParams, name]);
  const page = useMemo(() => searchParams.get("page"), [searchParams]);

  const handleAddParams = (name: string) => {
    if (page) {
      searchParams.set("page", "1");
      history.push({
        search: searchParams.toString(),
      });
    }
    if (checkedParams.find((param) => param === name)) {
      setCheckedParams(checkedParams.filter((param) => param !== name));
    } else {
      setCheckedParams([...checkedParams, name]);
    }
  };

  useEffect(() => {
    if (params) {
      setCheckedParams(params.split(";"));
    }
  }, [params]);

  useEffect(() => {
    if (!checkedParams.length) {
      searchParams.delete(name);
    } else {
      searchParams.set(name, checkedParams.join(";"));
    }

    history.push({
      search: searchParams.toString(),
    });

    //eslint-disable-next-line
  }, [checkedParams]);

  return (
    <div
      className="FilterBy"
      style={{
        paddingBottom: `${isOpen ? options.length * (height + margin) : 0}px`,
      }}
    >
      <p className="FilterBy__Name" onClick={() => setIsOpen(!isOpen)}>
        <img
          src="/images/goodsList/filterArrow.svg"
          alt="filterArrow"
          className={cn({
            FilterBy__ArrowImg: true,
            "FilterBy__ArrowImg--open": isOpen,
          })}
        />
        {name}
      </p>
      <ul
        className={cn({
          FilterBy__List: true,
          "FilterBy__List--open": isOpen,
        })}
      >
        {options.map((option) => (
          <li key={v4()}>
            <label
              className={cn({
                FilterBy__Item: true,
                "FilterBy__Item--dis": !option.count,
              })}
            >
              <input
                type="checkbox"
                onChange={() => handleAddParams(option.name)}
                disabled={option.count === 0}
                checked={checkedParams.some((param) => param === option.name)}
              />
              <p className="FilterBy__Value">
                {option.name} ({option.count})
              </p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
