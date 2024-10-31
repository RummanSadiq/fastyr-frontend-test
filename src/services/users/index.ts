import { gql } from "@apollo/client";

export const GetUsers = gql`
  query Users {
    users {
      data {
        id
        name
        username
        email
        phone
        website
      }
    }
  }
`;
