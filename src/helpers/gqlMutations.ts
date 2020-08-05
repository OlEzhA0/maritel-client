import { gql } from "apollo-boost";

export const addSubscribeMutation = gql`
  mutation addSubscribeMutation($email: String!) {
    addSubscribe(email: $email) {
      id
      email
    }
  }
`;
