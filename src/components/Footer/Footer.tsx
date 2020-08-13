import React, { useState } from "react";
import "./Footer.scss";
import { FOOTER_INFO } from "../../helpers";
import { Link } from "react-router-dom";
import cn from "classnames";
import { SubscribeByMail } from "../SubscribeByMail";

export const Footer = () => {
  const [isOpenInfo, setIsOpenInfo] = useState<string[]>([]);

  const setOpenStatus = (name: string) => {
    if (isOpenInfo.some((info) => info === name)) {
      setIsOpenInfo(isOpenInfo.filter((info) => info !== name));
    } else {
      setIsOpenInfo([...isOpenInfo, name]);
    }
  };

  const social = "social";

  return (
    <footer className="Footer">
      <SubscribeByMail />

      <nav className="Footer__Info">
        <ul className="Footer__InfoList">
          {FOOTER_INFO.map((info) => (
            <li
              key={info.name}
              className={cn({
                Footer__InfoItem: true,
                "Footer__InfoItem--open": isOpenInfo.some(
                  (inf) => inf === info.name
                ),
              })}
            >
              <h3
                className="Footer__InfoTitle"
                onClick={() => setOpenStatus(info.name)}
              >
                {info.name}
                <img
                  src="/images/footer/arrow.svg"
                  alt="arrow"
                  className={cn({
                    Footer__InfoArrow: true,
                    "Footer__InfoArrow--open": isOpenInfo.some(
                      (inf) => inf === info.name
                    ),
                  })}
                />
              </h3>
              <ul
                className={cn({
                  Footer__SubInfoList: true,
                  "Footer__SubInfoList--open": isOpenInfo.some(
                    (inf) => inf === info.name
                  ),
                })}
              >
                {info.fields.map((subInfo) => (
                  <li
                    key={subInfo.name}
                    className={cn({
                      Footer__SubInfoItem: true,
                      "Footer__SubInfoItem--open": isOpenInfo.some(
                        (inf) => inf === info.name
                      ),
                    })}
                  >
                    <Link to={subInfo.link} className="Footer__SubInfoLink">
                      {subInfo.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li
            className={cn({
              Footer__InfoItem: true,
              "Footer__InfoItem--open": isOpenInfo.some(
                (inf) => inf === social
              ),
            })}
          >
            <h3
              className="Footer__InfoTitle"
              onClick={() => setOpenStatus(social)}
            >
              Соц. сети
              <img
                src="/images/footer/arrow.svg"
                alt="arrow"
                className={cn({
                  Footer__InfoArrow: true,
                  "Footer__InfoArrow--open": isOpenInfo.some(
                    (inf) => inf === social
                  ),
                })}
              />
            </h3>
            <ul
              className={cn({
                Footer__SubInfoList: true,
                "Footer__SubInfoList--open": isOpenInfo.some(
                  (inf) => inf === social
                ),
              })}
            >
              <li
                className={cn({
                  Footer__SubInfoItem: true,
                  "Footer__SubInfoItem--open": isOpenInfo.some(
                    (inf) => inf === social
                  ),
                })}
              >
                <a href="/#" className="Footer__SubInfoLink">
                  Instagram
                </a>
              </li>
              <li
                className={cn({
                  Footer__SubInfoItem: true,
                  "Footer__SubInfoItem--open": isOpenInfo.some(
                    (inf) => inf === social
                  ),
                })}
              >
                <a href="/#" className="Footer__SubInfoLink">
                  Facebook
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="Footer__Social">
        <a href="/#" className="Footer__SocialLink">
          <img src="/images/footer/facebook.svg" alt="facebook" />
        </a>
        <a href="/#" className="Footer__SocialLink">
          <img src="/images/footer/instagram.svg" alt="instagram" />
        </a>
      </div>
      <div className="Footer__Rights">
        <p className="Footer__RightsText">
          © 2020 Maritel. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
