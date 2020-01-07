import HttpUtil from '../../lib/http';
import urls from '../../lib/urls';

export const GET_USERINFO = 'GET_USERINFO';
export const GET_USERARTICLE = 'GET_USERARTICLE';

export const getUserInfo = () => {
    return dispatch => {
        return HttpUtil.http(
            {
                url: urls.userInfo,
                method: 'GET'
            },
            res => {
                dispatch({
                    type: GET_USERINFO,
                    ...res.data
                });
            }
        );
    };
};
export const getUserArticle = () => {
    return dispatch => {
        return HttpUtil.http(
            {
                url: urls.userArticle,
                method: 'GET'
            },
            res => {
                dispatch({
                    type: GET_USERARTICLE,
                    articles: res.data
                });
            }
        );
    };
};
