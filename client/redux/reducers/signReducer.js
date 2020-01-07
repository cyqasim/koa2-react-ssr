import _ from 'lodash';
import * as Action from '../actions/signAction';
const initState = {
    type: '',
    token: null,
    username: null,
    profile: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case Action.SET_USER:
            return _.assign({}, state, action);
        case Action.CLEAR_USER:
            return _.assign({}, state, {
                type: action.type,
                token: null,
                username: null,
                profile: null
            });
        default:
            return state;
    }
};
