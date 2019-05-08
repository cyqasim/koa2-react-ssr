import Loading from '../components/loading';
import Loadable from 'react-loadable';

/**
 * 路由配置 异步加载
 */
const HomeComponent = Loadable({
    loader: () => import('../containers/home'),
    loading: Loading,
    modules: ['../containers/home']
});
const AboutComponent = Loadable({
    loader: () => import('../containers/about'),
    loading: Loading,
    modules: ['../containers/about']
});

const router = [
    { path: '/', component: HomeComponent, exact: true },
    { path: '/about/:id', component: AboutComponent }
];

export default router;
