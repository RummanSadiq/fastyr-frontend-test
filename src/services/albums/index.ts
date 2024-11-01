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