import Vue from 'vue';
import Vuex from 'vuex';
// const axios = require('axios');
import { API_URL } from './../../config.js';
import * as app from './../app.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requestId: '',
    reports: [],
    reportTypes: '',
  },
  mutations: {
    setCurrentRequestId(state, payload) {
      state.requestId = payload;
    },
    setReports(state, payload) {
      state.reports = payload;
    },
    setReportTypes(state, payload) {
      state.reportTypes = payload;
    },
  },
  //   commit mutations
  actions: {
    setReports(context) {
      app.axios
        .get(`${API_URL}/report/getReports/${this.state.requestId}`)
        .then((response) => {
          console.log(response);
          context.commit('setReports', response.data.data);
          context.commit('setReportTypes', Object.keys(response.data.data));
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {
    getReports: (state) => state.reports,
    getReportTypes: (state) => state.reportTypes,
  },
});
