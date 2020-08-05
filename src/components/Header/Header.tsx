import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { HambMenu } from "../HambMenu";
import { DesktopMenu } from "../DesktopMenu";
import { useDispatch, useSelector } from "react-redux";
import { setMenuStatus } from "../../store/actionCreators";
import { getMenuStatus } from "../../store/actionsTypes";

export const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  const [isHover, setIsHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");

  const dispatch = useDispatch();
  const menuStatus = useSelector(getMenuStatus);

  useEffect(() => {
    if (menuStatus) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuStatus]);

  return (
    <header className="Header">
      <div className="Header__PC">
        <div className="Header__MainPC">
          <div className="Header__Title">Find a store</div>
          <div className="Header__Logo">
            <Link to="/">
              <img
                src="images/logo.svg"
                alt="logo"
                className="Header__LogoImg"
              />
            </Link>
          </div>
          <div className="Header__General">
            <label className="Header__GeneralSearch">
              <input
                type="text"
                className="Header__Search"
                value={searchQuery}
                onChange={(e) => {
                  if (!e.target.value) {
                    setSearchPlaceholder("Что вы ищите?");
                  }
                  setSearchQuery(e.target.value);
                }}
                placeholder={searchPlaceholder}
                onFocus={() => setSearchPlaceholder("Что вы ищите?")}
                onBlur={() => setSearchPlaceholder("")}
              />
              <img src="images/header/zoom.svg" alt="zoom" />
            </label>
            <Link to="/login" className="Header__Login">
              войти
            </Link>
            <img
              src="images/header/backet.svg"
              alt="backet"
              className={cn({
                Header__Cart: true,
              })}
            />
          </div>
        </div>
        <DesktopMenu
          hoveredItem={hoveredItem}
          isHover={isHover}
          setHoveredItem={setHoveredItem}
          setIsHover={setIsHover}
        />
      </div>

      <div className="Header__Phone">
        <HambMenu />
        <div className="Header__Logo">
          <Link to="/">
            <img src="images/logo.svg" alt="logo" className="Header__LogoImg" />
          </Link>
        </div>
        <div className="Header__General">
          <img
            src="images/header/backet.svg"
            alt="backet"
            className="Header__Cart--mobile"
          />
          <img
            src="images/header/zoom.svg"
            alt="zoom"
            onClick={() => {
              setOpenSearch(!openSearch);
              dispatch(setMenuStatus(false));
            }}
            className="Header__SearchIcon"
          />
          <input
            type="text"
            className={cn({
              Header__MobileSearch: true,
              "Header__MobileSearch--open": openSearch,
            })}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Что вы ищите?"
          />
        </div>
      </div>
    </header>
  );
};
