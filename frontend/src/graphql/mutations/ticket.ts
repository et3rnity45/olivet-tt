import { gql } from '@apollo/client';

export const CreateTicket = gql`
	mutation CreateTicket($input: TicketInput!) {
		createTicket(input: $input) {
			id
			bracket
			firstname
			lastname
			email
			licence
			phone
			hasPaid
		}
	}
`;

export const CreateTickets = gql`
	mutation CreateTickets($input: [TicketInput!]!) {
		createTickets(input: $input) {
			id
			bracket
			firstname
			lastname
			email
			licence
			phone
			hasPaid
		}
	}
`;

export const UpdateTicket = gql`
	mutation UpdateTicket($id: ID!, $input: TicketInput!) {
		updateTicket(id: $id, input: $input) {
			id
			bracket
			firstname
			lastname
			email
			licence
			phone
			hasPaid
		}
	}
`;

export const DeleteTicket = gql`
	mutation DeleteTicket($id: ID!) {
		deleteTicket(id: $id) {
			id
			bracket
			firstname
			lastname
			email
			licence
			phone
			hasPaid
		}
	}
`;
