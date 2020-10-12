import React from "react";
import "./Bloggers.scss";
import { BLOGGERS } from "../../../helpers";

export const AboutUsBloggers = () => {
    return (
        <>
            <h3 className="AboutUsPage__Title">
                НАШИ ИЗДЕЛИЯ ВЫБИРАЮТ ИЗВЕСТНЫЕ INSTA-БЛОГГЕРЫ
            </h3>

            <div className="Bloggers">
                {BLOGGERS.map((blogger) => (
                    <div key={blogger.at} className="Bloggers__Item">
                        <div className="Bloggers__Container">
                            <div className="Bloggers__ImgContainer">
                                <img
                                    src={`/images/bloggers/${blogger.at}.png`}
                                    alt={blogger.name}
                                />
                            </div>
                            <div className="Bloggers__Name">{blogger.name}</div>
                            <div className="Bloggers__At">{blogger.at}</div>
                            <div className="Bloggers__SubscriberCount">
                                {blogger.subscriberCount}
                            </div>
                            <div className="Bloggers__PostLink">
                                <a
                                    href={blogger.postLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    ПОСМОТРЕТЬ ПОСТ
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
