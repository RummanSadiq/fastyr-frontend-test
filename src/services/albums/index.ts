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
