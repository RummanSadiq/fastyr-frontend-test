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

export const GetUserById = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;