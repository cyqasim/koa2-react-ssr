import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import configureStore from './redux/store/store';
import App from "./app";
import Loadable from 'react-loadable';
import ReactDOM from 'react-dom'
const initialState = window.REDUX_STATE;
delete window.REDUX_STATE;

const store = configureStore(initialState);

// 服务端渲染使用hydrate优化
const render = Component => {
    Loadable.preloadReady().then(() => {
        const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
        renderMethod(
            <Provider store={store}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>,
            document.getElementById('root'),
        )
    });
};

render(App);

if (module.hot) {
    module.hot.accept('./app', () => { render(App) })
}


