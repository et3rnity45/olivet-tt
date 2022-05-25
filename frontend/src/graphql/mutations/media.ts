import { gql } from '@apollo/client';

export const AddMedia = gql`
	mutation AddMedia($file: Upload!) {
		addMedia(file: $file)
	}
`;

export const DeleteMedia = gql`
	mutation DeleteMedia($media: String!) {
		deleteMedia(media: $media)
	}
`;
