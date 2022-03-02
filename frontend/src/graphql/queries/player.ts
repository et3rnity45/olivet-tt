import { gql } from "@apollo/client";

export const PlayerQuery = gql`
  query Player($id: ID!) {
    player(id: $id) {
      id
      nom
      prenom
      point
      apoint
      valinit
      clast
    }
  }
`;

export const PlayersQuery = gql`
  query Players {
    players {
      id
      nom
      prenom
      point
      apoint
      valinit
      clast
    }
  }
`;
