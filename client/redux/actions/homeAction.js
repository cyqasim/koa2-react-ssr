import HttpUtil from '../../lib/http';
import urls from '../../lib/urls';

export const SET_HOME = 'SET_HOME';

export const setHome = () => {
    return dispatch => {
        console.log('xkxkxkxk')
        return HttpUtil.http(
            {
                url: urls.setHome,
                method: 'GET',
                param: {}
            },
            res => {
                dispatch({
                    type: SET_HOME,
                    data: res
                });
            },
            error => {
                console.log(error);
            }
        );
    };
};
