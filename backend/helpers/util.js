const columnConstants = require('./columnConstants.js');

export function buildReportTables(limsResponse) {
  console.log(limsResponse);
  //   iterate over limsresponse entries and check if there are columns for that entry
  let limsResponseEntries = Object.keys(limsResponse);
  let frontEndResponse = {};
  limsResponseEntries.forEach((entry) => {
    //   get the name of the constant in constants file
    let columnConstantsEntryName = entry + 'Columns';
    let columnConstantsOrder = entry + 'Order';
    // console.log(entry);
    if (columnConstants[columnConstantsEntryName] && limsResponse[entry].length > 0) {
      // merge lims columns with constant columns to get the column definitions
      let columnDefs = { ...columnConstants.sharedColumns, ...columnConstants[entry + 'Columns'] };
      // iterate over ordered column array
      let orderedColumnDefs = [];
      //   add that column object from columnDefs
      columnConstants[columnConstantsOrder].forEach((column) => {
        let resultColumn = columnDefs[column];
        console.log(resultColumn);
        if (resultColumn.data === 'totalMass') {
          // get first limsresponse sample and check its units so we can update the column header
          if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'ng/ul') {
            resultColumn.columnHeader = 'Total Mass (ng)';
          } else if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'nm') {
            resultColumn.columnHeader = 'Total Mass (fmole)';
          }
        }
        if (resultColumn.data === 'concentration') {
          if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'ng/ul') {
            resultColumn.columnHeader = 'Concentration (ng/uL)';
          } else if (limsResponse[entry][0].concentrationUnits.toLowerCase() === 'nm') {
            resultColumn.columnHeader = 'Concentration (nM)';
          }
        }
        console.log(resultColumn);
        orderedColumnDefs.push(resultColumn);
      });
      //   console.log(orderedColumnDefs);
      frontEndResponse[entry] = { columns: orderedColumnDefs, data: limsResponse[entry] };
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
