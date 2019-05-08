// 初始化请求方法
const restApi = async (ctx, next) => {
    const pathPrefix = '/api/';
    // api请求进入
    if (ctx.request.path.startsWith(pathPrefix)) {
        // 允许任何域名访问 跨域
        ctx.set('Access-Control-Allow-Origin', '*');
        // 设置响应格式
        ctx.response.type = 'application/json';
        // 成功响应
        ctx.success = (data, message, status) => {
            data.status = status || 'success';
            data.message = message || '成功';
            ctx.response.body = data;
        };
        // 失败响应
        ctx.failure = (message, status) => {
            ctx.response.body = {
                status: status || 'error',
                message: message || '服务器错误'
            };
        };
        try {
            // 成功响应 下一步
            await next();
        } catch (e) {
            // 捕获错误响应
            ctx.response.body = {
                status: e.status || '',
                message: e.message || ''
            };
        }
    } else {
        await next();
    };
}

module.exports = restApi;
