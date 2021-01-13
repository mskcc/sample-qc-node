import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import { MdAvatar, MdButton, MdCard, MdField, MdTabs, MdToolbar } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
// import { router } from '../../backend/app';
import ReportPage from './components/pages/ReportPage.vue';
import PendingPage from './components/pages/PendingPage.vue';
import InstructionsPage from './components/pages/InstructionsPage.vue';
import store from './store';

Vue.use(VueRouter);

Vue.use(MdAvatar);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdTabs);
Vue.use(MdToolbar);

Vue.config.productionTip = false;

const routes = [
  { path: '/', component: ReportPage, name: 'report' },
  { path: '/pending', component: PendingPage, name: 'pending' },
  { path: '/instructions', component: InstructionsPage, name: 'instructions' },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  store: store,
  router: router,
  render: (h) => h(App),
}).$mount('#app');
