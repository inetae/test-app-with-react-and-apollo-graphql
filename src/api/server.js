import express from 'express';
import cors from 'cors';
import graphqlRoute from './graphqlRoute';

const app = express();

const whitelistedUrl = [
    'http://localhost:8080',
    'http://127.0.0.1:9001'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelistedUrl.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn('Origin is not in the list', origin);
            callback('Unexpected error occurred');
        }
    },
};

app.set('port', process.env.PORT || 4001);

app.use(cors(corsOptions));

app.use(`/graphql`, graphqlRoute);

app.listen(app.get('port'), () =>  console.log(`Running a GraphQL API server at localhost:${app.get('port')}/graphql`));
