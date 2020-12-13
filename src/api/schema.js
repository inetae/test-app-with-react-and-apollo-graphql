import { buildASTSchema } from 'graphql';
import gql from 'graphql-tag';

export const schema = buildASTSchema(gql`
    type Query {
        posts: [Post]
        post(id: ID!): Post
        comments: [Comment]
    }

    type Comment {
        id: ID
        firstName: String!
        lastName: String
        message: String!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        comments: [Comment]
    }

    type Mutation {
        addComment(firstName: String!, lastName: String, message: String!): Comment!
    }
`);