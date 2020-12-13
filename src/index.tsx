import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router';
import { ApolloClient, NormalizedCacheObject, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from 'components/Home/Home';
import NotFoundPage from 'routes/404';
import 'assets/style/global.scss';

interface Props {
    default?: boolean;
}

const HomePage = ({}: RouteComponentProps) => <Home />;
const NotFound = ({}: Props) => <NotFoundPage />;

const client: ApolloClient<InMemoryCache | NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.API_URL,
});

const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <HomePage path="/" />
            <NotFound default />
        </Router>
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById(`root`));
