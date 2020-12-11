import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import( '../components/common/Home.vue'),
            meta: { title: '' },
            children: [
                {
                    path: '/home',
                    component: () => import( '../components/page/Home/home.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/waterMeter',
                    component: () => import('../components/page/waterMeter/waterMeter.vue'),
                    meta: { title: '摄像头管理' }
                },
                //   {
                //     path: '/gateway',
                //     component: () => import( '../components/page/Gateway/gateway.vue'),
                //     meta: { title: '网关管理' }
                // },
    
                {
                
                    path: '/user',
                    component: () => import( '../components/page/User/user.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/configuration',
                    component: () => import( '../components/page/Configuration/configuration.vue'),
                    meta: { title: '配置管理' }  
                },
                {
                    path: '/    ',
                    component: () => import( '../components/page/Persdata/index.vue'),
                    meta: { title: '个人资料' }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
