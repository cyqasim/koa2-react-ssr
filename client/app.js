import React, { Component } from 'react';
import renderRoutes from './routes/renderRoutes';
import routes from './routes/index';
import SignBtn from './components/signBox';
import { Route, Link } from 'react-router-dom';
import './css/app.scss';
import './css/normalize.scss';
import './static/icofont/icofont.min.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import 'lodash';

class App extends Component {
    render() {
        return (
            <div id="app">
                <SignBtn />
                <div className="nav">
                <p>路由跳转</p>
                <Link to="/">Home</Link>
                <Link to="/about/1">About</Link>
                </div>
                <Route
                    render={({ location }) => (
                        <TransitionGroup>
                            <CSSTransition
                                key={location.key}
                                in={true}
                                classNames={{
                                    enter: 'page-enter',
                                    enterDone: 'page-done',
                                    exit: 'page-exit'
                                }}
                                timeout={30000}
                            >
                                {renderRoutes(routes)}
                            </CSSTransition>
                        </TransitionGroup>
                    )}
                />
            </div>
        );
    }
}

export default App;
