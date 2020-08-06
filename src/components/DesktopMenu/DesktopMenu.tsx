import React from "react";
import "./DesktopMenu.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories, getSpecCateg } from "../../store/actionsTypes";
import { handleTranslit } from "../../helpers/links";

interface Props {
  hoveredItem: string;
  isHover: boolean;
  setIsHover: (status: boolean) => void;
  setHoveredItem: (status: string) => void;
  visible: boolean;
}

export const DesktopMenu: React.FC<Props> = ({
  hoveredItem,
  isHover,
  setHoveredItem,
  setIsHover,
  visible,
}) => {
  const categories = useSelector(getCategories);
  const specCateg = useSelector(getSpecCateg);

  

  return (
    <nav
      className={cn({
        DesktopMenu__Nav: true,
        "DesktopMenu__Nav--visible": visible,
      })}
    >
      <ul className="DesktopMenu__NavList">
        {categories.map((category) => (
          <li className="DesktopMenu__NavItem" key={category.id}>
            <Link
              to={
                category.subCategories.length > 0
                  ? `/${handleTranslit(category.category)}`
                  : `/${handleTranslit(category.category)}/Vse-tovari`
              }
              className={cn({
                DesktopMenu__NavLink: true,
                "DesktopMenu__NavLink--hover": isHover,
                "DesktopMenu__NavLink--hovered": category.id === hoveredItem,
              })}
              onMouseEnter={() => {
                setIsHover(true);
                setHoveredItem(category.id);
              }}
              onMouseLeave={() => {
                setIsHover(false);
                setHoveredItem("");
              }}
            >
              {category.category}
            </Link>
            {category.id === hoveredItem && category.subCategories.length > 0 && (
              <ul
                className="DesktopMenu__NavSubList"
                onMouseEnter={() => {
                  setIsHover(true);
                  setHoveredItem(category.id);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setHoveredItem("");
                }}
              >
                {category.subCategories.map((subCateg) => (
                  <li key={subCateg.id} className="DesktopMenu__NavSubItem">
                    <Link
                      to={`/${handleTranslit(
                        category.category
                      )}/${handleTranslit(subCateg.subs)}`}
                      className="DesktopMenu__NavSubLink"
                    >
                      {subCateg.subs}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {specCateg.map((categ) => (
          <li key={categ.id} className="DesktopMenu__NavItem">
            <Link
              to={`/${handleTranslit(categ.name)}/Specialnoe`}
              className={cn({
                DesktopMenu__NavLink: true,
                "DesktopMenu__NavLink--hover": isHover,
                "DesktopMenu__NavLink--hovered": categ.id === hoveredItem,
              })}
              onMouseEnter={() => {
                setIsHover(true);
                setHoveredItem(categ.id);
              }}
              onMouseLeave={() => {
                setIsHover(false);
                setHoveredItem("");
              }}
            >
              {categ.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
