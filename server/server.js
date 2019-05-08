const Koa = require('koa');
const chalk = require('chalk');
import path from 'path';
import koaStatic from 'koa-static';
import Loadable from 'react-loadable';

let restApi = require('./middlewares/restApi');
let logger = require('./middlewares/logger');
let render = require('./middlewares/render');
let router = require('./middlewares/router');
let views = require('./middlewares/views');

const app = new Koa();

app.use(async (ctx, next) => {
    await restApi(ctx, next);
});

app.use(views());

app.use(async (ctx, next) => {
    await logger(ctx, next);
});

app.use(async (ctx, next) => {
    await render(ctx, next);
});

// 加载打包后的代码
app.use(koaStatic(path.resolve('./dist/client')));

app.use(async (ctx, next) => {
    await router.routes()(ctx, next);
});

app.use(router.allowedMethods());

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./middlewares/router', () => {
        router = require('./middlewares/router');
    })
    module.hot.accept('./middlewares/render', () => {
        render = require('./middlewares/render');
    })
    module.hot.accept('./middlewares/restApi', () => {
        restApi = require('./middlewares/restApi');
    })
    module.hot.accept('./middlewares/logger', () => {
        logger = require('./middlewares/logger');
    })
}



const port = process.env.PORT;
const host = process.env.IP;

console.info(chalk.red('sever index.js'));
Loadable.preloadAll().then(() => {
    app.listen(port, host, () => {
        console.info(chalk.red('==> ✅  Server is listening on %s:%d'), host, port);
    });
});
