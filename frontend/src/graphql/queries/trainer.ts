import { gql } from "@apollo/client";

export const TrainerQuery = gql`
  query Trainer($id: ID!) {
    trainer(id: $id) {
      id
      firstname
      lastname
      qualification
      media
    }
  }
`;

export const TrainersQuery = gql`
  query Trainers {
    trainers {
      id
      firstname
      lastname
      qualification
      media
    }
  }
`;
