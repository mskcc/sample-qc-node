<template>
  <div class="table">
    <md-button @click="downloadAttachment">Download Random Attachment</md-button>
    <md-tabs>
      <md-tab v-for="(reportType, index) in reportTypes" :key="index" :id="reportType" :md-label="reportType">
        <div class="table-container">
          <hot-table
            :columns="reports[reportType].columns"
            :data="reports[reportType].data"
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
import * as app from './../app.js';
import { API_URL } from './../../config.js';
import { HotTable } from '@handsontable/vue';
import { saveAs } from 'file-saver';

export default {
  data: function() {
    return {
      //   data: [
      //     ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
      //     ['2016', 10, 11, 12, 13],
      //     ['2017', 20, 11, 14, 13],
      //     ['2018', 30, 15, 12, 13],
      //   ],
      columns: null,
    };
  },
  components: {
    HotTable,
  },
  computed: {
    reports: () => this.$store.getters.getReports,
    reportTypes: function() {
      return this.$store.getters.getReportTypes;
    },
  },
  methods: {
    downloadAttachment: () => {
      let fileName = 'RequestId-ReportType.pdf';
      app.axios
        .get(`${API_URL}/report/downloadAttachment/6473349`, { responseType: 'blob' })
        .then((response) => {
          console.log(response);
          saveAs(
            new Blob([response.data], {
              type: 'application/pdf',
            }),
            fileName
          );
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
