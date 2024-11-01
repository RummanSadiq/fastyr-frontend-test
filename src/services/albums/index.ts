import { gql } from "@apollo/client";

export const GetAlbums = gql`
  query GetAlbums {
    albums {
      data {
        id
        title
        user {
          name
        }
      }
    }
  }
`;


export const GetAlbumsById = gql`
  query Album($id: ID!) {
    album(id: $id) {
      id
      title
      user {
        name
      }
    }
  }
`;

export const CREATE_ALBUM = gql`
  mutation CreateAlbum($title: String!, $userId: ID!) {
    createAlbum(input: { title: $title, userId: $userId }) {
      id
      title
      user {
        name
      }
    }
  }
`;

export const UPDATE_ALBUM = gql`
  mutation UpdateAlbum($id: ID!, $title: String!, $userId: ID!) {
    updateAlbum(id: $id, input: { title: $title, userId: $userId }) {
      id
      title
      user {
        name
      }
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation DeleteAlbum($id: ID!) {
    deleteAlbum(id: $id)
  }
`;