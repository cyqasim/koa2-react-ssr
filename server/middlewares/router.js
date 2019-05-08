import Router from 'koa-router';
import home from '../controllers/home';
import about from '../controllers/about';

const apiRouter = new Router({
    prefix: '/api',
});
apiRouter
    .get('/home', home)
    .get('/about', about);

module.exports = apiRouter;
