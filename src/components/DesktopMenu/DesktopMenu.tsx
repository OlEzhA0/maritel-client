import React from "react";
import "./DesktopMenu.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories, getSpecCateg } from "../../store/actionsTypes";

interface Props {
  hoveredItem: string;
  isHover: boolean;
  setIsHover: (status: boolean) => void;
  setHoveredItem: (status: string) => void;
}

export const DesktopMenu: React.FC<Props> = ({
  hoveredItem,
  isHover,
  setHoveredItem,
  setIsHover,
}) => {
  const categories = useSelector(getCategories);
  const specCateg = useSelector(getSpecCateg);
  return (
    <nav className="Header__Nav">
      <ul className="Header__NavList">
        {categories.map((category) => (
          <li className="Header__NavItem" key={category.id}>
            <Link
              to="/"
              className={cn({
                Header__NavLink: true,
                "Header__NavLink--hover": isHover,
                "Header__NavLink--hovered": category.id === hoveredItem,
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
                className="Header__NavSubList"
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
                  <li key={subCateg.id} className="Header__NavSubItem">
                    <Link to="/" className="Header__NavSubLink">
                      {subCateg.subs}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {specCateg.map((categ) => (
          <li key={categ.id} className="Header__NavItem">
            <Link
              to="/"
              className={cn({
                Header__NavLink: true,
                "Header__NavLink--hover": isHover,
                "Header__NavLink--hovered": categ.id === hoveredItem,
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
