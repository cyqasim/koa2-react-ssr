import nunjucks from 'koa-nunjucks-2';
import path from 'path';

const views = (ctx, next) => {
    return nunjucks({
        ext: 'html',
        path:  process.env.NODE_ENV === 'development' ? path.resolve('./views') : path.resolve('./dist/client'),// 指定视图目录
        nunjucksConfig: {
            trimBlocks: false // 开启转义 防Xss
        }
    });
};

module.exports = views;