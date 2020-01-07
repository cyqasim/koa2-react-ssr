import { combineReducers } from 'redux';
import signReducer from './signReducer';
import userReducer from './userReducer';
import articleListReducer from './articleListReducer';
import articleDetailReducer from './articleDetailReducer';

// combineReducers方法是redux提供的 合并Reducer
const reducers = combineReducers({
    signReducer,
    userReducer,
    articleListReducer,
    articleDetailReducer
});

export default reducers;
