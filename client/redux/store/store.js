import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import reducers from '../reducers/index';

// 中间件的作用是为了加强redux作用
// thunk中间件是Redux官方提供的，用于异步dispatch
const middlewares = [thunk];

// 当是dev环境的时候，加入logger中间件
if (process.env.NODE_ENV === 'development') {
    /** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
    // middlewares.push(logger);
}

export default function configureStore(initialState) {
    const store = createStore(reducers, initialState, compose(applyMiddleware(...middlewares)));

    return store;
}
