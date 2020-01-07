import HttpUtil from '../../lib/http';
import urls from '../../lib/urls';

export const ARTICLE_HOT = 'ARTICLE_HOT';
export const SET_ARTICLE_LIST = 'SET_ARTICLE_LIST';
export const SET_ARTICLE_DETAIL = 'SET_ARTICLE_DETAIL';
export const CLEAR_ARTICLE = 'CLEAR_ARTICLE';

export const articleHot = () => {
    return dispatch => {
        return HttpUtil.http(
            {
                url: urls.articleHot,
                method: 'GET'
            },
            res => {
                dispatch({
                    type: ARTICLE_HOT,
                    data: res.data
                });
            }
        );
    };
};

export const articleList = (page = 1, pageSize = 10) => {
    return dispatch => {
        return HttpUtil.http(
            {
                url: urls.articleList,
                method: 'GET',
                param: {
                    page,
                    pageSize
                }
            },
            res => {
                dispatch(setArticleList(res.data));
            }
        );
    };
};

export const getArticleDetail = aid => {
    return dispatch => {
        return HttpUtil.http(
            {
                url: urls.articleDetail,
                method: 'GET',
                param: {
                    aid
                }
            },
            res => {
                dispatch(setArticleDetail(res.data));
            }
        );
    };
};

export const setArticleList = data => {
    return dispatch => {
        dispatch({
            type: SET_ARTICLE_LIST,
            data
        });
    };
};
export const setArticleDetail = data => {
    return dispatch => {
        dispatch({
            type: SET_ARTICLE_DETAIL,
            data
        });
    };
};

export const clearArticleList = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_ARTICLE
        });
    };
};
