import React from "react";
import "./HomePage.scss";
import { useSelector } from "react-redux";
import { getCategories, getSpecCateg } from "../../store/actionsTypes";
import { Link } from "react-router-dom";
import { SubscribeByMail } from "../../components/SubscribeByMail";

export const HomePage = () => {
  const categories = useSelector(getCategories);
  const specCategs = useSelector(getSpecCateg);

  return (
    <div className="HomePage">
      <div className="HomePage__BackgroundWrap">
        <div className="HomePage__ImgWrap">
          <div className="HomePage__BackImg" />
        </div>
        <ul className="HomePage__List">
          {categories.map((categ) => (
            <li key={categ.id} className="HomePage__Item">
              <Link to="/" className="HomePage__Link">
                {categ.category}
              </Link>
            </li>
          ))}
          {specCategs.map((categ) => (
            <li key={categ.id} className="HomePage__Item">
              <Link to="/" className="HomePage__Link">
                {categ.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <SubscribeByMail />
    </div>
  );
};
