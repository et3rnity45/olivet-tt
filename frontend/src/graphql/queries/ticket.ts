import { gql } from '@apollo/client';

export const TicketQuery = gql`
	query Ticket($id: ID!) {
		ticket(id: $id) {
			id
			bracket
			firstname
			lastname
			email
			licence
			phone
			hasPaid
			createdAt
		}
	}
`;

export const TicketsQuery = gql`
	query Tickets {
		tickets {
			id
			bracket
			firstname
			lastname
			email
			licence
			phone
			hasPaid
			createdAt
		}
	}
`;
