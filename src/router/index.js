import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/base/index'
        },
        {
            path: '/base/',
            component: () => import('../components/base.vue'),
            redirect: '/base/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import('../components/index.vue')
                }
            ]
        }
    ]
})