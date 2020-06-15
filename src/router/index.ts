import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
    // @ts-ignore
    return originalPush.call(this, location).catch(err => err)
}

export const Menuroutes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
            {
                path: 'page1',
                name: 'page1',
                component: () => import(/* webpackChunkName: "about" */ '../views/page1.vue'),
                meta: {
                    requireHeader: true,
                    back: true,
                    defaultActive: '/about',
                    breadcrumbs: [{
                    }],
                },
            }, {
                path: 'scroll',
                name: 'scroll',
                component: () => import(/* webpackChunkName: "about" */ '../views/page2.vue'),
                meta: {
                    requireHeader: true,
                    back: true,
                    defaultActive: '/about',
                    breadcrumbs: [{
                    }],
                },
            }, {
                path: 'form',
                name: 'form',
                component: () => import(/* webpackChunkName: "about" */ '../views/form/index.vue'),
                meta: {
                    requireHeader: true,
                    back: true,
                    defaultActive: '/about',
                    breadcrumbs: [{
                    }],
                },
            }, {
                path: 'tree',
                name: 'tree',
                component: () => import(/* webpackChunkName: "about" */ '../views/tree/TreeSelectCase.vue'),
                meta: {
                    requireHeader: true,
                    back: true,
                    defaultActive: '/about',
                    breadcrumbs: [{
                    }],
                },
            }, {
                path: 'simpleTree',
                name: 'simpleTree',
                component: () => import(/* webpackChunkName: "about" */ '../views/simpleTree/index.vue'),
                meta: {
                    requireHeader: true,
                    back: true,
                    defaultActive: '/about',
                    breadcrumbs: [{
                    }],
                },
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: Menuroutes,
});

export default router;
