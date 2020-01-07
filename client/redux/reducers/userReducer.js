import _ from 'lodash';
import * as Action from '../actions/userAction';
const initState = {
    type: '',
    username: '',
    age: '',
    sex: '',
    address: '',
    createTime: '',
    articles: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case Action.GET_USERINFO:
            return _.assign({}, state, action);
        case Action.GET_USERARTICLE:
            return _.assign({}, state, {
                type: action.type,
                articles: action.articles
            });
        default:
            return state;
    }
};
