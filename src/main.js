import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import {downloadRequest} from "./utils/download";

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small'});
// 插件形式使用请求
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.downloadRequest = downloadRequest // 以插件的形式使用下载相关请求

// 使用 router.beforeEach 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/emp/basic') {
        /*
        重新进入员工基本资料界面，需要更新sessionStorage里的joblevels和allDeps，
        防止部门、职称的改变，而民族和政治面膜一般不会变，所以不用更新
         */
        window.sessionStorage.removeItem('joblevels');
        window.sessionStorage.removeItem('allDeps');
    }
    // to 要去的路由; from 来自哪里的路由 ; next() 放行
    if (window.sessionStorage.getItem('tokenStr')) {
        initMenu(router, store);
        //判断用户信息是否存在
        if (!window.sessionStorage.getItem('user')) {
            return getRequest('/admin/info').then(resp => {
                if (resp) {
                    //存入用户信息
                    window.sessionStorage.setItem('user', JSON.stringify(resp))
                    // 同步用户信息 编辑用户
                    store.commit('INIT_ADMIN', resp)
                    next({...to, replace: true})
                    setTimeout('console.clear()', 10)
                }
            })
        }
        next();
    } else {
        if (to.path === '/') {
            next()
        } else {
            next('/?redirect=' + to.path)
        }
        setTimeout('console.clear()', 10)
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
