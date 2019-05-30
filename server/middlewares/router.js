import Router from 'koa-router';
import home from '../controllers/home';
import login from '../controllers/user/login';
import about from '../controllers/about';

const apiRouter = new Router({
    prefix: '/api'
});
apiRouter
    .post('/login', login)
    .get('/home', home)
    .get('/about', about);

module.exports = apiRouter;
