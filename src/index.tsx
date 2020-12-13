import React from 'react';
import ReactDOM from 'react-dom';
import { Router, RouteComponentProps } from '@reach/router';
import NotFoundPage from 'routes/404';
import 'assets/style/global.scss';

interface Props {
    default?: boolean;
}

const NotFound = ({}: Props) => <NotFoundPage />;

const App = () => (
    <Router>
        <NotFound default />
    </Router>
);

ReactDOM.render(<App />, document.getElementById(`root`));
