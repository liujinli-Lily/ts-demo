import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Component } from 'vue-property-decorator';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './assets/scss/reset.scss';
import VueScroller from 'vue-scroller'
Vue.config.productionTip = false;

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate',
]);
Vue.use(ElementUI);

Vue.use(VueScroller)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
