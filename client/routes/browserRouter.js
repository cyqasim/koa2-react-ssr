import React from 'react';
import { Router } from 'react-router';
import history from './history';

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
    render() {
        return <Router history={history} children={this.props.children} />;
    }
}

export default BrowserRouter;
