import { gql } from "apollo-boost";

export const getCategoriesQuery = gql`
  query getCategoriesQuery {
    categories {
      id
      category
      subCategories
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