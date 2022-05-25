import { gql } from '@apollo/client';

export const CreateTrainer = gql`
	mutation CreateTrainer($file: Upload!, $input: TrainerInput!) {
		createTrainer(file: $file, input: $input) {
			id
			firstname
			lastname
			qualification
			media
		}
	}
`;

export const UpdateTrainer = gql`
	mutation UpdateTrainer($id: ID!, $file: Upload, $input: TrainerInput!) {
		updateTrainer(id: $id, file: $file, input: $input) {
			id
			firstname
			lastname
			qualification
			media
		}
	}
`;

export const DeleteTrainer = gql`
	mutation DeleteTrainer($id: ID!) {
		deleteTrainer(id: $id) {
			id
			firstname
			lastname
			qualification
			media
		}
	}
`;
