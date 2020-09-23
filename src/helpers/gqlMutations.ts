import { gql } from "apollo-boost";

export const addSubscribeMutation = gql`
    mutation addSubscribeMutation($email: String!) {
        addSubscribe(email: $email) {
            id
            email
        }
    }
`;

export const addToWishlist = gql`
    mutation addWishlist($customerId: String, $productId: String) {
        AddToWishlist(customerId: $customerId, productId: $productId) {
            productId
        }
    }
`;

export const editCustomer = gql`
    mutation editCustomer($_id: String, $customer: CustomerInput) {
        EditCustomerInfo(_id: $_id, customer: $customer) {
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
            status
        }
    }
`;
