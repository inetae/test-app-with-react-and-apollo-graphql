import { gql } from '@apollo/client';

export const CommentsQuery = gql`
    query GetComments {
        comments {
            id
            firstName
            lastName
            message
        }
    }
`;
