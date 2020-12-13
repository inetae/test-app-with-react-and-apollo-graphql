import { gql } from '@apollo/client';

export const postsQuery = gql`
    query GetPosts {
        posts {
            id
            title
            content
        }
    }
`;
