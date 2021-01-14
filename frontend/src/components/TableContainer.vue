<template>
  <div class="table">
    <md-tabs>
      <md-tab v-for="(reportType, index) in reportTypes" :key="index" :id="reportType" :md-label="reportType">
        <div class="table-container">
          <hot-table
            :columns="reports[reportType].columns"
            :rowHeaders="true"
            :colHeaders="reports[reportType].columns.map((element) => element.columnHeader)"
            licenseKey="non-commercial-and-evaluation"
            height="500"
          >
          </hot-table>
        </div>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
// const axios = require('axios');
import * as app from './../app.js';
import { API_URL } from './../../config.js';
import { HotTable } from '@handsontable/vue';

export default {
  data: function() {
    return {
      data: [
        ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
        ['2016', 10, 11, 12, 13],
        ['2017', 20, 11, 14, 13],
        ['2018', 30, 15, 12, 13],
      ],
      columns: null,
    };
  },
  components: {
    HotTable,
  },
  computed: {
    reports: function() {
      return this.$store.getters.getReports;
    },
    reportTypes: function() {
      return this.$store.getters.getReportTypes;
    },
  },
  mounted() {
    app.axios
      .get(`${API_URL}/report/getReports/07323_R`)
      .then((response) => {
        console.log(response.data);
        this.columns = response.data.data.dnaReportSamples.columns;
        console.log(Object.keys(response.data.data));
      })
      .catch((error) => console.log(error));
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
