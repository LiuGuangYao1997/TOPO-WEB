import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/nodeConfig'
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('../components/index.vue')
        },
        {
            path: '/nodeConfig',
            name: 'nodeConfig',
            component: () => import('../components/nodeConfig.vue')
        },
        {
            path: '/lineConfig',
            name: 'lineConfig',
            component: () => import('../components/lineConfig.vue')
        }
    ]
})