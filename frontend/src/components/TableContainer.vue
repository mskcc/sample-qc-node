<template>
  <div class="table">
    <md-button @click="downloadAttachment">Download Random Attachment</md-button>
    <md-button class="md-raised md-primary" @click="submitDecisions">Submit decisions</md-button>
    <md-tabs @md-changed="setCurrentTab">
      <md-tab v-for="(reportType, index) in reportTypes" :key="index" :id="reportType" :md-label="reportType" :md-active-tab="firstTab">
        <div class="table-container">
          <hot-table
            :columns="reports[reportType].columns"
            :data="reports[reportType].data"
            :rowHeaders="true"
            :colHeaders="reports[reportType].columns.map((element) => element.columnHeader)"
            licenseKey="non-commercial-and-evaluation"
            height="500"
            :afterOnCellMouseDown="clickingCell"
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
    firstTab: function() {
      return this.$store.state.currentReportTab;
    },
  },
  methods: {
    clickingCell(event, coords) {
      let currentReport = this.$store.state.currentReportTab;

      if (currentReport == 'attachments') {
        let currentColumns = this.$store.state.reports[currentReport].columns;
        let currentRows = this.$store.state.reports[currentReport].data;
        let clickedColumn = coords.col;
        let clickedRow = coords.row;
        // console.log(event, coords, TD);
        if (currentColumns[clickedColumn].data === 'action') {
          // alert('download');
          let currentSample = currentRows[clickedRow].recordId;
          console.log(currentSample);
          this.downloadAttachment(currentSample);
        }
      }
    },
    downloadAttachment(recordId) {
      let fileName = 'RequestId-ReportType.pdf';
      app.axios
        .get(`${API_URL}/report/downloadAttachment/${recordId}`, { responseType: 'blob' })
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
    submitDecisions() {
      console.log('decisions submitted');

      let getCurrentReportDecisions = this.reports[this.$store.state.currentReportTab].data;
      let decisionsToSave = { dataType: this.$store.state.currentReportTab, samples: [] };
      getCurrentReportDecisions.forEach((element) => {
        if (!element.investigatorDecision) {
          console.log(element);
          this.$swal('Incomplete Decisions', 'Please submit all investigator decisions');
          return;
        } else {
          decisionsToSave.samples.push({
            recordId: element.recordId,
            sampleId: element.sampleId,
            otherSampleId: element.otherSampleId,
            investigatorDecision: element.investigatorDecision,
          });
        }
      });
      app.axios
        .post(`${API_URL}/report/submitInvestigatorDecisions`, { decisionsToSave })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
      //   console.log(getCurrentDecisions);
    },
    setCurrentTab(tabId) {
      //   console.log(tabId);
      this.$store.commit('setCurrentReportTab', tabId);
    },
  },
};
</script>

<style src="../../node_modules/handsontable/dist/handsontable.full.css"></style>
