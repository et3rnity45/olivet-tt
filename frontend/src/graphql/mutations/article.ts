import { gql } from "@apollo/client";

export const CreateArticle = gql`
  mutation CreateArticle($file: Upload!, $input: ArticleInput!) {
    createArticle(file: $file, input: $input) {
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

export const UpdateArticle = gql`
  mutation UpdateArticle($id: ID!, $file: Upload, $input: ArticleInput!) {
    updateArticle(id: $id, file: $file, input: $input) {
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

export const DeleteArticle = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
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
