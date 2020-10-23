import React, { useEffect, useMemo, useState } from "react";
import "./CategoryPage.scss";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories, getProducts } from "../../store/actionsTypes";
import translit from "cyrillic-to-translit-js";
import { splitValue } from "../../helpers";
import { handleTranslit } from "../../helpers/links";
import { Banner } from "../../components/common/Banner";

export const CategoryPage = () => {
    const location = useLocation();
    const categories = useSelector(getCategories);
    const goods = useSelector(getProducts);
    const [products, setProducts] = useState<Products[]>([]);
    const [category, setCategory] = useState<CategoriesTypes>();

    const [bannerTop, bannerBottom] = useMemo(() => {
        if (
            category &&
            category.banners.length &&
            category.banners[0] &&
            (category.banners[0] as BannerCategory).position
        ) {
            const result: JSX.Element[] = [];
            const topBanner = (category.banners as BannerCategory[]).find(
                ({ position }) => position === "top"
            );

            if (topBanner) {
                result.push(
                    <Banner
                        text={topBanner.title}
                        buttonText={topBanner.buttonText}
                        imgLink={topBanner.image}
                        link={topBanner.link}
                    />
                );
            }

            const bottomBanner = (category.banners as BannerCategory[]).find(
                ({ position }) => position === "bottom"
            );

            if (bottomBanner) {
                result.push(
                    <Banner
                        text={bottomBanner.title}
                        buttonText={bottomBanner.buttonText}
                        imgLink={bottomBanner.image}
                        link={bottomBanner.link}
                    />
                );
            }

            return result;
        }

        return [null, null];
    }, [category]);

    useEffect(() => {
        const uuids = new Set();
        const subs: Products[] = [];
        const categNameFromUrl = location.pathname
            .split("/")
            .filter((name) => name)[0];

        const currentCategory = categories.find(
            (categ) =>
                new translit().transform(
                    categ.category.toLocaleLowerCase(),
                    "+"
                ) === categNameFromUrl
        );

        setCategory(currentCategory);
        const visGoods: Products[] = goods.filter(
            (prod) =>
                prod.type.split(splitValue)[0] === currentCategory?._id ||
                currentCategory?.subCategories.some(
                    (subCateg) => subCateg.id === prod.type.split(splitValue)[1]
                )
        );

        visGoods.forEach(
            (good) => uuids.add(good.type.split(splitValue)[1]) || ""
        );
        uuids.forEach((id) =>
            subs.push(
                visGoods.find(
                    (prod) => prod.type.split(splitValue)[1] === id
                ) || visGoods[0]
            )
        );

        setProducts(subs);
    }, [location, categories, goods]);

    return (
        <div className="CategoryPage Page__Wrap">
            {bannerTop}
            <div className="CategoryPage__Wrap">
                <h2 className="CategoryPage__Title">категории</h2>
                <ul className="CategoryPage__List">
                    {products.map((prod) => (
                        <li className="CategoryPage__Item" key={prod.id}>
                            <Link
                                to={`/${handleTranslit(
                                    category?.category || ""
                                )}/${handleTranslit(
                                    category?.subCategories.find(
                                        (sub) =>
                                            sub.id ===
                                            prod.type.split(splitValue)[1]
                                    )?.subs || ""
                                )}`}
                            >
                                <img
                                    src={prod.previewPhoto}
                                    alt="preview ph"
                                    className="CategoryPage__Img"
                                />
                                <p className="CategoryPage__Name">
                                    {
                                        category?.subCategories.find(
                                            (categ) =>
                                                categ.id ===
                                                prod.type.split(splitValue)[1]
                                        )?.subs
                                    }
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            {bannerBottom}
        </div>
    );
};
