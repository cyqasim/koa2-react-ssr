import path from './path';
import axios from 'axios';
class HttpUtil {
    // 请求超时
    static fetchTime = 25000;
    // 请求个数
    static responseCount = 0;
    // 请求方法
    static http = async (options, successCallback, errorCallBack) => {
        options.method = (options.method && options.method.toLocaleUpperCase()) || 'POST';
        options.headers = options.headers ? options.headers : {};
        options.fetchTime = options.fetchTime || HttpUtil.fetchTime;
        // 检测是否把域名带过来了
        options.url = /^http(s)?:\/\//.test(options.url) ? options.url : path.baseUrl + options.url;
        const json = {}; // 默认参数
        const param = Object.assign({}, json, options.param); // 参数
        const spin = options.spin; // 是否显示loading，默认不显示
        // const errorToast = options.errorToast === undefined ? true : options.errorToast; // 是否显示错误警告，默认弹出
        // const successToast = options.successToast; // 是否显示成功警告
        if (spin) {
            if (HttpUtil.responseCount === undefined) {
                HttpUtil.responseCount = 0;
            }
            if (!HttpUtil.responseCount++) {
                console('加载中...');
            }
        }
        let result;

        if (options.method === 'GET') {
            try {
                let str = '';
                for (let i in param) {
                    str += '&' + i + '=' + param[i];
                }
                result = await axios(options.url + '?getTime=' + new Date().getTime() + str, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    // withCredentials: true,
                    timeout: options.fetchTime
                }).then(res => {
                    if (res.status === 200) {
                        return res.data;
                    } else {
                        const errJson = {
                            status: res.status,
                            msg: res.statusText || '服务器请求失败！'
                        };
                        return errJson;
                    }
                });
            } catch (e) {
                if (e === 'fetch timeout') {
                    result = {
                        status: 'timeout',
                        msg: '当前网络较弱,请检查网络'
                    };
                } else {
                    result = {
                        status: 'catchError',
                        msg: '服务器请求失败！'
                    };
                }
            }
        } else if (options.method === 'POST') {
            try {
                result = await axios(options.url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        ...options.headers
                    },
                    // withCredentials: true,
                    data: param,
                    timeout: options.fetchTime
                }).then(res => {
                    if (res.status === 200) {
                        return res.data;
                    } else {
                        return {
                            status: res.status,
                            msg: res.statusText || '服务器请求失败！'
                        };
                    }
                });
            } catch (e) {
                if (e === 'fetch timeout') {
                    result = {
                        status: 'timeout',
                        msg: '当前网络较弱,请检查网络'
                    };
                } else {
                    result = {
                        status: 'catchError',
                        msg: '服务器请求失败！'
                    };
                }
            }
        }
        if (spin) {
            if (!HttpUtil.responseCount || !--HttpUtil.responseCount) {
                console.log('关闭loading');
            }
        }

        console.log(
            '请求地址：',
            options.url,
            '\n请求方式:',
            options.method,
            '\n请求参数：',
            param,
            '\n请求结果：',
            result
        );
        if (result.status === 'timeout') {
            // 超时
            errorCallBack && errorCallBack(result);
            // errorToast && toastRef.showToast(result.msg);
        } else if (result.status === 'catchError' || result.status === 'error') {
            // 服务器错误或请求失败
            errorCallBack && errorCallBack(result);
            // errorToast && toastRef.showToast(result.msg);
        } else if (result.status === 'success') {
            // 成功请求
            successCallback && successCallback(result);
            // successToast && result.msg && toastRef.showToast(result.msg);
        } else {
            errorCallBack && errorCallBack(result);
            // errorToast && toastRef.showToast(result.msg);
        }
        return result;
    };
}

export default HttpUtil;
