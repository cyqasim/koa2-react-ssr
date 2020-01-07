import Loading from '../components/loading';
import Loadable from 'react-loadable';

/**
 * 路由配置 异步加载
 */
const Main = Loadable({
    loader: () => import('../containers/main/mainContainer'),
    loading: Loading
});
const Login = Loadable({
    loader: () => import('../containers/sign/loginContainer'),
    loading: Loading
});
const Register = Loadable({
    loader: () => import('../containers/sign/registerContainer'),
    loading: Loading
});
const Replenish = Loadable({
    loader: () => import('../containers/sign/replenishContainer'),
    loading: Loading
});
const ForgetPswd = Loadable({
    loader: () => import('../containers/sign/forgetPswdContainer'),
    loading: Loading
});
const FindPswd = Loadable({
    loader: () => import('../containers/sign/findPswdContainer'),
    loading: Loading
});
const UserIndex = Loadable({
    loader: () => import('../containers/user/userIndexContainer'),
    loading: Loading
});
const ArticleEdit = Loadable({
    loader: () => import('../containers/article/articleEditContainer'),
    loading: Loading
});
const ArticleDetail = Loadable({
    loader: () => import('../containers/article/articleDetailContainer'),
    loading: Loading
});
const Home = Loadable({
    loader: () => import('../containers/home'),
    loading: Loading
});

const router = [
    { path: '/', component: Main, exact: true },
    { path: '/login', component: Login, exact: true },
    { path: '/register', component: Register, exact: true },
    { path: '/replenish', component: Replenish, exact: true },
    { path: '/forgetPswd', component: ForgetPswd, exact: true },
    { path: '/findPswd', component: FindPswd, exact: true },
    { path: '/user', component: UserIndex, exact: true, auth: true },
    { path: '/article/edit', component: ArticleEdit, exact: true, auth: true },
    { path: '/article/detail/:id', component: ArticleDetail, exact: true },
    { path: '/home', component: Home, exact: true }
];

export default router;
