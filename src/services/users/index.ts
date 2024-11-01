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

export const CreateUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      username
      email
      phone
      website

    }
  }
`;

export const DeleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;