import HttpUtil from '../../lib/http';
import urls from '../../lib/urls';

export const SET_ABOUT = 'SET_ABOUT';

export const setAbout = (data) => {
    return dispatch => {
        return HttpUtil.http(
            {
                url: urls.setAbout,
                method: 'GET',
                param: {}
            },
            res => {
                dispatch({
                    type: SET_ABOUT,
                    data: res
                });
            },
            error => {
                console.log(error);
            }
        );
    };
};
