import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
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
        },
        {
            path: '/menuItemConfig',
            name: 'menuItemConfig',
            component: () => import('../components/menuItemConfig.vue')
        },
        {
            path: '/menuConfig',
            name: 'menuConfig',
            component: () => import('../components/menuConfig.vue')
        }
    ]
})