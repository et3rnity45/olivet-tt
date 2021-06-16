import { gql } from "@apollo/client";

export const PlayerQuery = gql`
  query Player($id: ID!) {
    player(id: $id) {
      id
      nom
      prenom
      point
      valcla
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
      valcla
      clast
    }
  }
`;
