import React, { useState } from "react";
import "./HambMenu.scss";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  getMenuStatus,
  getCategories,
  getSpecCateg,
} from "../../store/actionsTypes";
import { setMenuStatus } from "../../store/actionCreators";
import { Link } from "react-router-dom";
import { handleTranslit } from "../../helpers/links";

export const HambMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getMenuStatus);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const categories = useSelector(getCategories);
  const specCateg = useSelector(getSpecCateg);

  const closeMenu = () => {
    dispatch(setMenuStatus(false));
    setOpenSubMenu("");
  };

  return (
    <div className="HambMenu">
      <div
        className="HambMenu__Wrapper"
        onClick={() => dispatch(setMenuStatus(!isOpen))}
      >
        <div
          className={cn({
            HambMenu__Stick: true,
            "HambMenu__Stick--open": isOpen,
          })}
        ></div>
      </div>
      <div
        className={cn({
          HambMenu__Menu: true,
          "HambMenu__Menu--open": isOpen,
        })}
      >
        <ul
          className={cn({
            HambMenu__List: true,
            "HambMenu__List--close": openSubMenu,
          })}
        >
          {categories.map((category) => (
            <li key={category.id} className="HambMenu__Item">
              {category.subCategories.length === 0 && (
                <Link
                  to={`/${handleTranslit(category.category)}/Vse-tovari`}
                  className="HambMenu__Categ"
                  onClick={() => dispatch(setMenuStatus(false))}
                >
                  {category.category}{" "}
                  <img src="/images/menu/categArrow.svg" alt="arrow" />
                </Link>
              )}
              {category.subCategories.length > 0 && (
                <p
                  className="HambMenu__Categ"
                  onClick={() => setOpenSubMenu(category.id)}
                >
                  {category.category}{" "}
                  <img src="/images/menu/categArrow.svg" alt="arrow" />
                </p>
              )}
            </li>
          ))}
          {specCateg.map((categ) => (
            <li key={categ.id} className="HambMenu__Item">
              <Link
                to={`/${handleTranslit(categ.name)}/Specialnoe`}
                className="HambMenu__Categ"
                onClick={closeMenu}
              >
                {categ.name}{" "}
                <img src="/images/menu/categArrow.svg" alt="arrow" />
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className={cn({
            HambMenu__ChoosedCateg: true,
            "HambMenu__ChoosedCateg--open": openSubMenu,
          })}
        >
          <li
            onClick={() => setOpenSubMenu("")}
            className="HambMenu__Back HambMenu__SubGeneral"
          >
            <img
              src="/images/menu/categArrow.svg"
              alt="arrow"
              className="HambMenu__BackArrow"
            />{" "}
            Назад
          </li>
          <li className="HambMenu__Main">
            <Link
              to={`/${handleTranslit(
                categories.find((categ) => categ.id === openSubMenu)
                  ?.category || ""
              )}`}
              className="HambMenu__SubLink HambMenu__SubLinkMain"
              onClick={closeMenu}
            >
              {categories.find((categ) => categ.id === openSubMenu)?.category}{" "}
              <img src="/images/menu/subCategArrow.svg" alt="arrow" />
            </Link>
          </li>
          {categories.map(
            (categ) =>
              categ.id === openSubMenu &&
              categ.subCategories.map((subCateg) => (
                <li
                  key={subCateg.id}
                  className="HambMenu__SubItem HambMenu__SubGeneral"
                >
                  <Link
                    className="HambMenu__SubLink"
                    to={`/${handleTranslit(
                      categories.find((categ) => categ.id === openSubMenu)
                        ?.category || ""
                    )}/${handleTranslit(subCateg.subs)}`}
                    onClick={closeMenu}
                  >
                    {subCateg.subs}
                  </Link>
                </li>
              ))
          )}
        </ul>
        <ul className="HambMenu__Settings">
          <li className="HambMenu__SettingsItem">
            <Link to="/" className="HambMenu__SettingsLink" onClick={closeMenu}>
              мой аккаунт
            </Link>
          </li>
          <li className="HambMenu__SettingsItem">
            <Link to="/" className="HambMenu__SettingsLink" onClick={closeMenu}>
              мои заказы
            </Link>
          </li>
          <li className="HambMenu__SettingsItem">
            <Link
              to="/wish-list"
              className="HambMenu__SettingsLink"
              onClick={closeMenu}
            >
              мой список желаний
            </Link>
          </li>
          <li className="HambMenu__SettingsItem">
            <Link to="/" className="HambMenu__SettingsLink" onClick={closeMenu}>
              войти
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
