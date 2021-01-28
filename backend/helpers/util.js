const columnConstants = require('./columnConstants.js');
const { getPicklistValues, getUserGroups } = require('../services/services');

export function buildReportTables(limsResponse, user) {
  //   iterate over limsresponse entries and check if there are columns for that entry
  let limsResponseEntries = Object.keys(limsResponse);
  let frontEndResponse = {};
  limsResponseEntries.forEach((entry) => {
    //   get the name of the constant in constants file
    let columnConstantsEntryName = entry + 'Columns';
    let columnConstantsOrder = entry + 'Order';

    if (columnConstants[columnConstantsEntryName] && limsResponse[entry].length > 0) {
      // merge lims columns with constant columns to get the column definitions
      // merges shared columns with specific columns for that report type to build full column definitiions for report
      let columnDefs = { ...columnConstants.sharedColumns, ...columnConstants[entry + 'Columns'] };
      // iterate over ordered column array
      let orderedColumnDefs = [];
      //   add that column object from columnDefs
      // arranges columns in the desired order
      columnConstants[columnConstantsOrder].forEach((column) => {
        let resultColumn = columnDefs[column];

        if (resultColumn.data === 'totalMass') {
          // Determine total mass header based on the concentration units of the first sample in report
          if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'ng/ul') {
            resultColumn.columnHeader = 'Total Mass (ng)';
          } else if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'nm') {
            resultColumn.columnHeader = 'Total Mass (fmole)';
          }
        }
        // Determine concentration header based on the concentration units of the first sample in report
        if (resultColumn.data === 'concentration') {
          if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'ng/ul') {
            resultColumn.columnHeader = 'Concentration (ng/uL)';
          } else if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'nm') {
            resultColumn.columnHeader = 'Concentration (nM)';
          }
        }
        if (resultColumn.data === 'investigatorDecision') {
          // only investigators or cmo pms for cmo projects get to make decisions
          // decisions are only editable if no decisions have been made in lims
          if (user.isUser === true) {
            //   change resultcolumn readonly property to false
            resultColumn.readOnly = false;
          }
          // for testing
          if (user.isUser === false) {
            //   change resultcolumn readonly property to false
            resultColumn.readOnly = false;
          }
        }
        orderedColumnDefs.push(resultColumn);
      });

      let unhiddenSamples = [];
      // hides samples
      limsResponse[entry].forEach((sample) => {
        if (!sample.hideFromSampleQC) {
          if (entry === 'attachments') {
            sample.action = '<i class="fas fa-cloud-download-alt"></i>';
          }
          unhiddenSamples.push(sample);
        }
      });
      // console.log(entry);
      let translatedReportName = translateReportName(entry);
      frontEndResponse[translatedReportName] = { columns: orderedColumnDefs, data: unhiddenSamples };

      // console.log(JSON.stringify(frontEndResponse));
    } else {
      //   console.log(entry);
    }
  });
  //   let dnaReport = limsResponse.dnaReportSamples;
  //   // reports = [{dnaReport: dnaColumn, dnaData}] ;
  //   // limsReports.forEach(report =>{
  //   let reportColumnDefs = [];
  //   // merge lims columns with constant columns to get the column definitions
  //   let columnDefs = { ...columnConstants.sharedColumns, ...columnConstants['dnaReportSamples' + 'Columns'] };
  //   //   console.log(reportColumnDefs, columnDefs);

  //   //   order the columns in the frontend desired order
  //   // iterate over ordered column array
  //   let orderedColumnDefs = [];
  //   //   add that column object from columnDefs
  //   columnConstants.dnaReportSamplesOrder.forEach((column) => orderedColumnDefs.push(columnDefs[column]));
  //   //   console.log(orderedColumnDefs);
  //   // order = columnConstants[report +'Order']
  //   // order.forEach(columnName => {
  //   // resultColumn[0] = columnDefs[columnName]
  //   // }
  //   // reports[report]= reportColDefs;
  return frontEndResponse;
}

export function translateReportName(entry) {
  let translatedReportName;
  if (entry === 'attachments') {
    translatedReportName = 'Attachments';
  } else if (entry === 'dnaReportSamples') {
    translatedReportName = 'DNA Report';
  } else if (entry === 'rnaReportSamples') {
    translatedReportName = 'RNA Report';
  } else if (entry === 'libraryReportSamples') {
    translatedReportName = 'Library Report';
  } else if (entry === 'poolReportSamples') {
    translatedReportName = 'Pool Report';
  } else if (entry === 'pathologyReportSamples') {
    translatedReportName = 'Pathology Report';
  } else if (entry === 'covidReportSamples') {
    translatedReportName = 'COVID19 Report';
  }
  return translatedReportName;
}

export function isUserAuthorized(commentRelations, user, userGroups) {
  // getUserGroups();
  let resultBoolean = false;
  commentRelations.forEach((commentRelation) => {
    // user is specifically listed in recipients
    if (commentRelation.recipients.includes(user.username)) {
      resultBoolean = true;
    }
    // user is a CMO PM and recipients includes cmo pm email address
    if (user.isPM && commentRelation.recipients.includes(process.env.CMO_PM_EMAIL)) {
      resultBoolean = true;
    }
    // user is part of group that's included in recipients
    let recipientsArray = commentRelation.recipients.split(',');

    recipientsArray.forEach((recipient) => {
      if (userGroups.toLowerCase().includes(recipient.replace('@mskcc.org', '').toLowerCase())) {
        resultBoolean = true;
      }
    });
  });
  return resultBoolean;
}
