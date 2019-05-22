import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store/store';
import App from './app';
import Loadable from 'react-loadable';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
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
            document.getElementById('root')
        );
    });
};

render(hot(App));
