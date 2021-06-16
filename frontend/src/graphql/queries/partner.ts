import { gql } from "@apollo/client";

export const PartnerQuery = gql`
  query Partner($id: ID!) {
    partner(id: $id) {
      id
      name
      url
      media
    }
  }
`;

export const PartnersQuery = gql`
  query Partners {
    partners {
      id
      name
      url
      media
    }
  }
`;
