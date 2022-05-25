import { gql } from '@apollo/client';

export const ArticleQuery = gql`
	query Article($id: ID!) {
		article(id: $id) {
			id
			title
			category
			content
			media
			updatedAt
			createdAt
		}
	}
`;

export const ArticlesQuery = gql`
	query Articles {
		articles {
			id
			title
			category
			content
			media
			updatedAt
			createdAt
		}
	}
`;

export const NewestArticles = gql`
	query NewestArticles {
		newestArticles {
			id
			title
			category
			content
			media
			updatedAt
			createdAt
		}
	}
`;
