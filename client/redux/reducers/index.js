import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import aboutReducer from './aboutReducer';

// combineReducers方法是redux提供的 合并Reducer
const reducers = combineReducers({
    homeReducer,
    aboutReducer
});

export default reducers;
