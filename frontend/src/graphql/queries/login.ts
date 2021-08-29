import { gql } from "@apollo/client";

const LoginQuery = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export default LoginQuery;
