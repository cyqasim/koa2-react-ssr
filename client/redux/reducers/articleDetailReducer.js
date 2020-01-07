import _ from 'lodash';
import * as Action from '../actions/articleAction';
const initState = {
    type: '',
    content: ''
};

export default (state = initState, action) => {
    switch (action.type) {
        case Action.SET_ARTICLE_DETAIL:
            return _.assign({}, state, {
                type: action.type,
                content: action.data
            });
        default:
            return state;
    }
};
