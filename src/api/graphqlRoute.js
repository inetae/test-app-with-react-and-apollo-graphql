import graphqlHTTP from "express-graphql";
import { comments, data } from './data';
import { schema } from './schema';

const root = {
    posts: () => data,
    post: ({ id }) => data.find(post => post.id === id),
    comments: () => comments,
    comment: ({ id }) => comments.find(comment => comment.id === id),
    addComment: ({ firstName, lastName, message }) => {
        const comment = {
            id: `comment-${comments.length + 1}`,
            firstName: firstName,
            lastName: lastName || ``,
            message: message,
        };
        comments.push(comment);
        return comment;
    },
};

export default graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
});