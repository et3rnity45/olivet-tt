import { gql } from '@apollo/client';

export const BracketQuery = gql`
	query Bracket($id: ID!) {
		brackets(id: $id) {
			id
			letter
			name
			price
			entries
			remainingEntries
			start
			prize1
			prize2
			prize3
		}
	}
`;

export const BracketsQuery = gql`
	query Brackets {
		brackets {
			id
			letter
			name
			price
			entries
			remainingEntries
			start
			prize1
			prize2
			prize3
		}
	}
`;
