import { gql } from "apollo-boost";

export const getCategoriesQuery = gql`
    query getCategoriesQuery {
        categories {
            _id
            category
            subCategories
            banners {
                position
                text
                title
                buttonText
                link
                image
                for
            }
        }
    }
`;

export const getSpecCategQuery = gql`
    query getSpecCategQuery {
        getSpecCateg {
            id
            name
            products
        }
    }
`;

export const productsQuery = gql`
    query productsQuery {
        products {
            id
            uuid
            title
            descr
            color
            price
            gender
            modelParam
            composition
            sizes
            lastPrice
            type
            care
            photos
            previewPhoto
            timestamp
        }
    }
`;

export const productQuery = gql`
    query productQuery($uuid: String!) {
        product(uuid: $uuid) {
            id
            uuid
            title
            descr
            color
            price
            gender
            modelParam
            composition
            sizes
            lastPrice
            care
            type
            photos
            previewPhoto
            timestamp
        }
    }
`;

export const getColorsQuery = gql`
    query getColorsQuery {
        colors {
            id
            name
            link
        }
    }
`;

export const getCustomer = gql`
    {
        customer {
            _id
            email
            firstName
            lastName
            phone
            city {
                value
                name
            }
            shippingMethod {
                value
                name
            }
            shippingAddress {
                street {
                    value
                    name
                }
                houseNumber
                appartment
                value
                name
            }
            birthday {
                day
                month
            }
            gender {
                value
                name
            }
            orders {
                _id
                orderId
                items {
                    prodUuid
                    name
                    size
                    quantity
                    price
                }
                date
                amount
            }
            status
        }
    }
`;

export const getOrders = gql`
    query getOrders($limit: String, $offset: String, $sort: String) {
        orders(limit: $limit, offset: $offset, sort: $sort) {
            orders {
                _id
                orderId
                items {
                    prodUuid
                    name
                    size
                    quantity
                    price
                }
                date
                amount
            }
            orderCount
        }
    }
`;

export const getPromo = gql`
    query getPromo($promoName: String) {
        promo(promoName: $promoName) {
            promoName
            promoDisc
            promoValue
        }
    }
`;

export const findProducts = gql`
    query findProducts($query: String) {
        queryProducts(query: $query) {
            id
            uuid
            title
            descr
            color
            price
            gender
            modelParam
            composition
            sizes
            lastPrice
            type
            care
            photos
            previewPhoto
            timestamp
        }
    }
`;

export const initialQuery = gql`
    {
        products {
            id
            uuid
            title
            descr
            color
            price
            gender
            modelParam
            composition
            sizes
            lastPrice
            type
            care
            photos
            previewPhoto
            timestamp
        }
        categories {
            _id
            category
            subCategories
            banners {
                position
                text
                title
                buttonText
                link
                image
                for
            }
        }
        getSpecCateg {
            id
            name
            products
        }
        mainSettings {
            email
            phone
            instagram
            facebook
            telegram
        }
        carousel {
            title
        }
    }
`;
