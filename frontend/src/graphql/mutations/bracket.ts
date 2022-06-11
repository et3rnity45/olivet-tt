import { gql } from '@apollo/client';

export const CreateBracket = gql`
	mutation CreateBracket($input: BracketInput!) {
		createBracket(input: $input) {
			id
			letter
      name
      price
      entries
      start
      prize1
      prize2
      prize3
		}
	}
`;

export const UpdateBracket = gql`
	mutation UpdateBracket($id: ID!, $input: BracketInput!) {
		updateBracket(id: $id, input: $input) {
			id
			letter
      name
      price
      entries
      start
      prize1
      prize2
      prize3
		}
	}
`;

export const DeleteBracket = gql`
	mutation DeleteBracket($id: ID!) {
		deleteBracket(id: $id) {
			id
			letter
      name
      price
      entries
      start
      prize1
      prize2
      prize3
		}
	}
`;
