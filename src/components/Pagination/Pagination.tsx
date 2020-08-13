import React, { useMemo, useEffect } from "react";
import "./Pagination.scss";
import { useLocation, useHistory } from "react-router-dom";

interface Props {
  pagesCount: number;
  start: boolean;
}

export const Pagination: React.FC<Props> = ({ pagesCount, start }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const page = useMemo(() => searchParams.get("page") || "1", [searchParams]);

  const handleChangePage = (path: number) => {
    searchParams.set("page", `${(page ? +page : 1) + path}`);

    history.push({
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (page && +page > pagesCount && start) {
      searchParams.set("page", `${pagesCount}`);

      history.push({
        search: searchParams.toString(),
      });
    } else if (page && +page < 1 && start) {
      searchParams.set("page", "1");

      history.push({
        search: searchParams.toString(),
      });
    }
  }, [page, history, pagesCount, searchParams, start]);

  return (
    <div className="Pagination">
      <button
        className="Pagination__Btn"
        disabled={!!page && +page === 1}
        onClick={() => handleChangePage(-1)}
      >
        <img
          src="/images/goodsList/pagination.svg"
          alt="arrow"
          className="Pagination__Arrow Pagination__Arrow--prev"
        />
      </button>
      <p className="Pagination__Page">
        Страница {page} из {pagesCount}
      </p>
      <button
        className="Pagination__Btn"
        disabled={!!page && +page === pagesCount}
        onClick={() => handleChangePage(1)}
      >
        <img
          src="/images/goodsList/pagination.svg"
          alt="arrow"
          className="Pagination__Arrow"
        />
      </button>
    </div>
  );
};
