import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import routes from './routes/index';
import './css/index.scss';
import 'lodash';

class App extends Component {
    render() {
        return (
            <div>
                <div className="nav">
                    <p>常规跳转</p>
                    <a href="/">Home</a>
                    <a href="/about/1">About</a>
                </div>
                <div className="nav">
                    <p>路由跳转</p>
                    <Link to="/">Home</Link>
                    <Link to="/about/1">About</Link>
                </div>
                {renderRoutes(routes)}
            </div>
        );
    }
}

export default App;
