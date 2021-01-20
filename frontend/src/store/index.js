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
    isLoading: false,
    currentReportTab: '',
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
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
    setCurrentReportTab(state, payload) {
      state.currentReportTab = payload;
    },
  },
  // commit mutations
  actions: {
    setReports(context) {
      context.commit('setReports', null);
      context.commit('setReportTypes', null);
      context.commit('setIsLoading', true);
      app.axios
        .get(`${API_URL}/report/getReports/${this.state.requestId}`)
        .then((response) => {
          console.log(response.data.data);
          context.commit('setReports', response.data.data);
          context.commit('setReportTypes', Object.keys(response.data.data));
          context.commit('setIsLoading', false);
          context.commit('setCurrentReportTab', Object.keys(response.data.data)[0]);
        })
        .catch((error) => {
          console.log(error);
          context.commit('setIsLoading', false);
        });
    },
  },
  getters: {
    getReports: (state) => state.reports,
    getReportTypes: (state) => state.reportTypes,
    getIsLoading: (state) => state.isLoading,
  },
});
