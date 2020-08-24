import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { HambMenu } from "../HambMenu";
import { DesktopMenu } from "../DesktopMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  setMenuStatus,
  setBackgroundStatus,
  SetPopupCartStatus,
} from "../../store/actionCreators";
import {
  getMenuStatus,
  getBackgroundSearchCover,
  getWishList,
} from "../../store/actionsTypes";
import { InfoSlider } from "../InfoSlider";
import { CartPopup } from "../Cart/CartPopup";

interface Props {
  visible: boolean;
}

export const Header: React.FC<Props> = ({ visible }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlaceholder, setSearchPlaceholder] = useState("");

  const [isHover, setIsHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState("");

  const dispatch = useDispatch();
  const menuStatus = useSelector(getMenuStatus);
  const backgournd = useSelector(getBackgroundSearchCover);
  const wishList = useSelector(getWishList);

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
    <header
      className={cn({
        Header: true,
        "Header--desktopFull": visible,
      })}
    >
      <CartPopup />
      <div
        className={cn({
          Header__PC: true,
          "Header__PC--nonVisible": !visible,
        })}
      >
        <div className="Header__MainPC">
          <div className="Header__MainPCWrap">
            <Link className="Header__Title" to="/wish-list">
              список желаний ({wishList.length})
            </Link>
            <div className="Header__Logo">
              <Link to="/">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="Header__LogoImg"
                />
              </Link>
            </div>
            <div
              className="Header__General"
              onMouseLeave={() => dispatch(SetPopupCartStatus(false))}
            >
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
                <img src="/images/header/zoom.svg" alt="zoom" />
              </label>
              <Link to="/login" className="Header__Login">
                войти
              </Link>
              <Link
                to="/cart"
                className="Header__CartWrap"
                onMouseEnter={() => dispatch(SetPopupCartStatus(true))}
              >
                <img
                  src="/images/header/backet.svg"
                  alt="backet"
                  className={cn({
                    Header__Cart: true,
                  })}
                />
              </Link>
            </div>
          </div>
        </div>
        <DesktopMenu
          hoveredItem={hoveredItem}
          isHover={isHover}
          setHoveredItem={setHoveredItem}
          setIsHover={setIsHover}
          visible={visible}
        />
        <InfoSlider visible={visible} />
      </div>

      <div className="Header__Phone">
        <div className="Header__PhoneWrap">
          <HambMenu />
          <div className="Header__Logo">
            <Link to="/">
              <img
                src="/images/logo.svg"
                alt="logo"
                className="Header__LogoImg"
              />
            </Link>
          </div>
          <div className="Header__General">
            <img
              src="/images/header/backet.svg"
              alt="backet"
              className="Header__Cart--mobile"
            />
            <img
              src="/images/header/zoom.svg"
              alt="zoom"
              onClick={() => {
                setOpenSearch(!openSearch);
                dispatch(setMenuStatus(false));
                dispatch(setBackgroundStatus(!backgournd));
              }}
              className="Header__SearchIcon"
            />
            <input
              type="text"
              className={cn({
                Header__MobileSearch: true,
                "Header__MobileSearch--open": backgournd,
              })}
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Что вы ищите?"
            />
          </div>
        </div>
        <InfoSlider />
      </div>
    </header>
  );
};
