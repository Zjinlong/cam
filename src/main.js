import Vue from 'vue';

import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import { messages } from './components/common/i18n';

import './components/common/directives';
import 'babel-polyfill';
import store from './vuex/index-vuex'

import 'lib-flexible'
import axios from 'axios'

import App from './App.vue';
import router from './router';

import echarts from 'echarts'

import Router from 'vue-router'

import './utils/dir.js'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

function getServerConfig () {
  return new Promise ((resolve, reject) => {
    axios.get('./serverConfig.json').then((result) => {
    //   console.log(result)  // 看打印出来的结果
      let config = result.data;
      for (let key in config) {
        Vue.prototype[key] = config[key];
      }
      console.log(Vue.prototype.baseURL)  // 验证是否已经把属性挂在了Vue上
      resolve();
    }).catch((error) => {
      
      reject()
    })
  })
}
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const username = localStorage.getItem('username');
    if (!username && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果有用户信息 则可以登录
        username ? next() : next('/403');
    } else {
        // console.log(!username && to.path !== '/login',to.meta.permission)
        next();
    }
});
async function init() {
     await getServerConfig();
     new Vue({
        router,
        i18n,
        store,
        render: h => h(App)
    }).$mount('#app');

}
 init()

