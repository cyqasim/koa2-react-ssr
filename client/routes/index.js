import Loading from '../components/loading';
import Loadable from 'react-loadable';
/**
 * 路由配置 异步加载
 */
const Login = Loadable({
    loader: () => import('../containers/main/mainContainer'),
    loading: Loading
});
const HomeComponent = Loadable({
    loader: () => import('../containers/home'),
    loading: Loading
});
const AboutComponent = Loadable({
    loader: () => import('../containers/about'),
    loading: Loading
});

const router = [
    { path: '/login', component: Login },
    { path: '/', component: HomeComponent, exact: true },
    { path: '/about/:id', component: AboutComponent }
];

export default router;
