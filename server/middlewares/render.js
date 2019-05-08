import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../../client/routes/index';
import App from '../../client/app';
import configureStore from '../../client/redux/store/store';
const assets = require('../../assets.json');

async function render(ctx, next) {
    let route = null;
    let isMatch = null;
    for (let i = 0; i < routes.length; i++) {
        // 匹配当前路由与前端路由
        isMatch = matchPath(ctx.url, {
            path: routes[i].path,
            exact: routes[i].exact
        });

        // 匹配成功跳出循环
        if (isMatch) {
            route = routes[i];
            break;
        }
    }
    // 匹配成功 拦截请求 直接渲染前端路由
    if (route) {
        // 初始化store 不同于客户端渲染 服务端需要每个链接有单独的store
        const store = configureStore();
        // 存放promise请求集合
        const promises = [];
        const component = await route.component.preload();
        // 客户端初始化请求集合
        const fetchArr =
            typeof component.default.WrappedComponent.getData === 'function'
                ? component.default.WrappedComponent.getData()
                : [];
        if (fetchArr && fetchArr.length > 0) {
            fetchArr.map(f => {
                // 遍历客户端请求集合，存到promise请求集合
                const promise = new Promise(resolve => {
                    store
                        .dispatch(f())
                        .then(resolve)
                        .catch(resolve);
                });
                promises.push(promise);
            });
        }

        // 阻塞 等待所有请求完成后执行渲染
        await Promise.all(promises)
            .then(() => {
                console.log('数据加载 success');
            })
            .catch(err => {
                console.log('数据加载 error:', err);
            });

        // 渲染使用nunjucks模板
        // renderToString方法把react转换html元素 服务器渲染
        // 使用用于服务端渲染提供的StaticRouter组件包裹路由组件
        // 获取store所有值，通过模板传入 客户端通过window对象存储
        let param = {
            body: renderToString(
                <Provider store={store}>
                    <StaticRouter location={ctx.url} context={{}}>
                        <App />
                    </StaticRouter>
                </Provider>
            ),
            state: JSON.stringify(store.getState())
        };

        if (process.env.NODE_ENV === 'development') {
            let jsArr = [];
            let cssArr = [];
            for (let i in assets) {
                if (i && assets[i]['js']) {
                    jsArr.push(assets[i]['js']);
                }
                if (i && assets[i]['css']) {
                    cssArr.push(assets[i]['css']);
                }
            }
            param.jsArr = jsArr;
            param.cssArr = cssArr;
        }

        await ctx.render('index', param);
    } else {
        // 匹配不成功 执行下一个中间件
        await next();
    }
}

module.exports = render;
