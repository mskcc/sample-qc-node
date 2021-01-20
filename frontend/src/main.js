import Vue from 'vue';
import VueRouter from 'vue-router';
import * as app from './app.js';
import { AUTH_URL, HOME_PAGE_PATH } from './../config.js';

import App from './App.vue';
import { MdAvatar, MdButton, MdCard, MdField, MdTabs, MdToolbar } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// import { router } from '../../backend/app';
import ReportPage from './components/pages/ReportPage.vue';
import PendingPage from './components/pages/PendingPage.vue';
import InstructionsPage from './components/pages/InstructionsPage.vue';
import store from './store';

Vue.use(VueRouter);
Vue.use(VueSweetalert2);

Vue.use(MdAvatar);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdTabs);
Vue.use(MdToolbar);

Vue.config.productionTip = false;

app.axios.defaults.withCredentials = true;
// will redirect if cookie is invalid
app.axios.interceptors.response.use(
  (response) => {
    //   if (response.status === 200 || response.status === 201) {
    return Promise.resolve(response);
    //   } else {
    //     return Promise.reject(response);
    //   }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          window.location.href = AUTH_URL + HOME_PAGE_PATH;
          // alert('session expired');
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

const routes = [
  { path: '/', component: ReportPage, name: 'report' },
  { path: '/pending', component: PendingPage, name: 'pending' },
  { path: '/instructions', component: InstructionsPage, name: 'instructions' },
];

const router = new VueRouter({
  base: HOME_PAGE_PATH,
  routes: routes,
  mode: 'history',
});

new Vue({
  store: store,
  router: router,
  render: (h) => h(App),
}).$mount('#app');
