import React, { Component } from 'react';
import renderRoutes from './routes/renderRoutes';
import routes from './routes/index';
import { Route } from 'react-router-dom';
import './css/app.scss';
import './css/normalize.scss';
import './static/icofont/icofont.min.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as signAction from './redux/actions/signAction';
import { connect } from 'react-redux';
import { SysUtil } from './lib/public';
import { load } from 'react-cookies';

@withRouter
@connect(
    state => ({
        signReducer: state.signReducer
    }),
    dispatch =>
        bindActionCreators(
            {
                setUser: signAction.setUser
            },
            dispatch
        )
)
class App extends Component {
    componentWillMount() {
        const { setUser } = this.props;
        if (SysUtil.canUseDom()) {
            const token = load('user_token');
            const username = load('user_name');
            const profile = load('user_profile');
            if (token) {
                setUser(token, username, profile);
            }
        }
    }
    render() {
        const {
            location,
            signReducer: { token }
        } = this.props;
        return (
            <div id="app">
                <TransitionGroup>
                    <CSSTransition key={location.key} in={true} classNames={'app-page'} appear={true} timeout={1300}>
                        <div className="app-page">{renderRoutes(routes, location, token)}</div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

export default App;
