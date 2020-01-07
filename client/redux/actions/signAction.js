import urls from '../../lib/urls';
import HttpUtil from '../../lib/http';
import { remove } from 'react-cookies';
import history from '../../routes/history';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const login = (username, password) => {
    return dispatch => {
        HttpUtil.http(
            {
                url: urls.login,
                method: 'POST',
                param: {
                    username,
                    password
                },
                successToast: true
            },
            res => {
                const { token, username, profile } = res.data;
                dispatch(setUser(token, username, profile));
                history.replace('/');
            }
        );
    };
};
export const setUser = (token, username, profile) => {
    return dispatch => {
        dispatch({
            type: SET_USER,
            token,
            username,
            profile
        });
    };
};
export const clearUser = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_USER
        });
        remove('user_token');
        remove('user_name');
        remove('user_profile');
        history.replace('/');
    };
};
