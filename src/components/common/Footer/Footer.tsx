import React, { useMemo, useState } from "react";
import "./Footer.scss";
import { FOOTER_INFO, getMainSettings } from "../../../helpers";
import { Link } from "react-router-dom";
import cn from "classnames";
import { SubscribeByMail } from "../../SubscribeByMail";
import { SizesTable } from "../../SizesTable/SizesTable";
import { useQuery } from "react-apollo";

export const Footer = () => {
    const [isOpenInfo, setIsOpenInfo] = useState<string[]>([]);

    const { data } = useQuery<{ mainSettings: MainSettings }>(getMainSettings);

    const setOpenStatus = (name: string) => {
        if (isOpenInfo.some((info) => info === name)) {
            setIsOpenInfo(isOpenInfo.filter((info) => info !== name));
        } else {
            setIsOpenInfo([...isOpenInfo, name]);
        }
    };

    const socialLinks = useMemo(() => {
        const linkList: SocialLink[] = [];

        if (data?.mainSettings) {
            const { facebook, instagram, telegram } = data.mainSettings;

            linkList.push({
                name: "facebook",
                link: facebook || "",
            });

            linkList.push({
                name: "instagram",
                link: instagram || "",
            });

            linkList.push({
                name: "telegram",
                link: telegram || "",
            });

            for (let i = 0; i < linkList.length; i++) {
                const { link } = linkList[i];
                if (link) {
                    if (
                        !link.includes("https://") &&
                        !link.includes("http://")
                    ) {
                        linkList[i].link = `https://${link}`;
                    } else {
                        linkList[i].link = link;
                    }
                } else {
                    linkList[i].link = "/#";
                }
            }
        }

        return linkList;
    }, [data]);

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
                                "Footer__InfoItem--open": false,
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
                                        {subInfo.link === "/sizeChart" ? (
                                            <SizesTable>
                                                <span
                                                    className="Footer__SubInfoLink"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    {subInfo.name}
                                                </span>
                                            </SizesTable>
                                        ) : (
                                            <Link
                                                to={subInfo.link}
                                                className="Footer__SubInfoLink"
                                            >
                                                {subInfo.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    <li
                        className={cn({
                            Footer__InfoItem: true,
                            "Footer__InfoItem--open": false,
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
                            {socialLinks.map(({ name, link }) => (
                                <li
                                    key={name}
                                    className={cn({
                                        Footer__SubInfoItem: true,
                                        "Footer__SubInfoItem--open": isOpenInfo.some(
                                            (inf) => inf === social
                                        ),
                                    })}
                                >
                                    <a
                                        href={link}
                                        target="_blank"
                                        className="Footer__SubInfoLink"
                                        rel="noopener noreferrer"
                                    >
                                        {name.charAt(0).toUpperCase() +
                                            name.slice(1)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="Footer__Social">
                {socialLinks.map(({ name, link }) => (
                    <a
                        key={name}
                        href={link}
                        target="_blank"
                        className="Footer__SocialLink"
                        rel="noopener noreferrer"
                    >
                        <img src={`/images/footer/${name}.svg`} alt={name} />
                    </a>
                ))}
            </div>
            <div className="Footer__Rights">
                <p className="Footer__RightsText">
                    © 2020 Maritel. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
