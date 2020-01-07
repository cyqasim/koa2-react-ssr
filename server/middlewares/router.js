import Router from 'koa-router';

import login from '../controllers/sign/login';
import register from '../controllers/sign/register';
import checkUser from '../controllers/sign/checkUser';
import forgetPswd from '../controllers/sign/forgetPswd';
import userInfo from '../controllers/user/userInfo';
import userArticle from '../controllers/user/userArticle';
import articleHot from '../controllers/article/articleHot';
import articleList from '../controllers/article/articleList';
import articleDetail from '../controllers/article/articleDetail';
import addArticle from '../controllers/article/addArticle';

const apiRouter = new Router({
    prefix: '/api'
});
apiRouter
    .post('/login', login)
    .post('/register', register)
    .get('/checkUser', checkUser)
    .get('/forgetPswd', forgetPswd)
    .get('/user/info', userInfo)
    .get('/user/article', userArticle)
    .get('/article/hot', articleHot)
    .get('/article/list', articleList)
    .get('/article/detail', articleDetail)
    .post('/article/add', addArticle);

module.exports = apiRouter;
