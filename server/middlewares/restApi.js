import { JWT_IGNORE, JWT_SECRET } from '../jwt.config';
import jwt from 'jsonwebtoken';
import { StrUtil } from '../../client/lib/public';
// 初始化请求方法
const restApi = async (ctx, next) => {
    const pathPrefix = '/api/';
    // api请求进入
    if (ctx.request.path.startsWith(pathPrefix)) {
        // 允许任何域名访问 跨域
        // ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
        ctx.set('Access-Control-Allow-Credentials', true);
        // 设置响应格式
        ctx.response.type = 'application/json';
        // 成功响应
        ctx.success = (data = null, message = '请求成功', status = 'success') => {
            const rep = {
                status: status,
                message: message,
                data
            };
            ctx.response.body = rep;
        };
        // 失败响应
        ctx.failure = (message = '服务器错误', status = 'error') => {
            ctx.response.body = {
                status: status,
                message: message
            };
        };
        const ignore = JWT_IGNORE.some(path => {
            return path.exec(ctx.request.path);
        });
        let token = 'null';
        if (!StrUtil.isEmpty(ctx.cookies.get('user_token'))) {
            token = jwt.verify(ctx.cookies.get('user_token'), JWT_SECRET);
        } else if (!StrUtil.isEmpty(ctx.header.authorization)) {
            token = jwt.verify(ctx.header.authorization, JWT_SECRET);
        }

        ctx.token = token;
        if (!ignore && (token === 'null' || token.exp * 1000 < new Date().getTime())) {
            ctx.response.body = {
                status: 'notLogin',
                message: '未登录'
            };
        } else {
            await next();
        }
    } else {
        await next();
    }
};

module.exports = restApi;
