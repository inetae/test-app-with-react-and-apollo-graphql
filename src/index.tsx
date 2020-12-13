import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router';
import Home from 'components/Home/Home';
import NotFoundPage from 'routes/404';
import 'assets/style/global.scss';

interface Props {
    default?: boolean;
}

const HomePage = ({}: RouteComponentProps) => <Home />;
const NotFound = ({}: Props) => <NotFoundPage />;

const App = () => (
    <Router>
        <HomePage path="/" />
        <NotFound default />
    </Router>
);

ReactDOM.render(<App />, document.getElementById(`root`));
