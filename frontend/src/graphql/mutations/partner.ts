import { gql } from '@apollo/client';

export const CreatePartner = gql`
	mutation CreatePartner($file: Upload!, $input: PartnerInput!) {
		createPartner(file: $file, input: $input) {
			id
			name
			url
			media
		}
	}
`;

export const UpdatePartner = gql`
	mutation UpdatePartner($id: ID!, $file: Upload, $input: PartnerInput!) {
		updatePartner(id: $id, file: $file, input: $input) {
			id
			name
			url
			media
		}
	}
`;

export const DeletePartner = gql`
	mutation DeletePartner($id: ID!) {
		deletePartner(id: $id) {
			id
			name
			url
			media
		}
	}
`;
