import _ from 'lodash';
import * as Action from '../actions/articleAction';
const initState = {
    type: '',
    hot: [],
    list: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case Action.ARTICLE_HOT:
            return _.assign({}, state, {
                type: action.type,
                hot: action.data
            });
        case Action.SET_ARTICLE_LIST:
            return _.assign({}, state, {
                type: action.type,
                list: action.data
            });
        default:
            return state;
    }
};
