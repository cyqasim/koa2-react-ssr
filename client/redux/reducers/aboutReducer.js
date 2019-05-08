import _ from 'lodash';
import * as Action from '../actions/aboutAction';
const initState = {
    type: '',
    data: {}
};

export default (state = initState, action) => {
    switch (action.type) {
        case Action.SET_ABOUT:
            return _.assign({}, state, {
                type: action.type,
                data: action.data
            });
        default:
            return state;
    }
};
