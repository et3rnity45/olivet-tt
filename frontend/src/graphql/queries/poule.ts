import { gql } from '@apollo/client';

export const PouleQuery = gql`
	query Poule($id: ID!) {
		poule(id: $id) {
			id
			libequipe
			libdivision
			liendivision
			teams {
				id
				equipe
				clt
				joue
				pts
				numero
				vic
				def
				nul
				pp
				pf
				pg
			}
		}
	}
`;

export const PoulesQuery = gql`
	query Poules {
		poules {
			id
			libequipe
			libdivision
			liendivision
			teams {
				id
				equipe
				clt
				joue
				pts
				numero
				vic
				def
				nul
				pp
				pf
				pg
			}
		}
	}
`;
