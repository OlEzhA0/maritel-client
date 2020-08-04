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

