import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BackgroundMainImg } from "../../components/BackgroundMainImg";
import { getCategories, getSpecCateg } from "../../store/actionsTypes";
import "./HomePage.scss";
import { handleTranslit } from "../../helpers/links";

export const HomePage = () => {
  const categories = useSelector(getCategories);
  const specCategs = useSelector(getSpecCateg);

  return (
    <div className="HomePage Page__Wrap">
      <div className="HomePage__BackgroundWrap">
        <BackgroundMainImg />
        <ul className="HomePage__List">
          {categories.map((categ) => (
            <li key={categ.id} className="HomePage__Item">
              <Link
                to={
                  categ.subCategories.length > 0
                    ? `/${handleTranslit(categ.category)}`
                    : `/${handleTranslit(categ.category)}/Vse-tovari`
                }
                className="HomePage__Link"
              >
                {categ.category}
              </Link>
            </li>
          ))}
          {specCategs.map((categ) => (
            <li key={categ.id} className="HomePage__Item">
              <Link to={`/${handleTranslit(categ.name)}/Specialnoe`} className="HomePage__Link">
                {categ.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
