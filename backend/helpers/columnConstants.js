// changes compared to old sample-qc:
// - data and limsField are now the same
// - added decimal key to fields that need to be rounded
// - changed variable names to correspond to LIMS output (dnaColumns => dnaReportSamplesColumns)

export const sharedColumns = {
  SampleId: {
    data: 'sampleId',
    columnHeader: 'IGO ID',
    readOnly: 'true',
    type: 'numeric',
  },
  RecordId: {
    data: 'recordId',
    columnHeader: 'Record ID',
    readOnly: 'true',
  },
  OtherSampleId: {
    data: 'otherSampleId',
    columnHeader: 'Sample Name',
    readOnly: 'true',
    renderer: 'html',
  },
  UserSampleID: {
    data: 'userSampleID',
    columnHeader: 'UserSampleID',
    readOnly: 'true',
  },
  ConcentrationUnits: {
    data: 'concentrationUnits',
    columnHeader: 'ConcentrationUnits',
    readOnly: 'true',
  },
  Preservation: {
    data: 'preservation',
    columnHeader: 'Preservation',
    readOnly: 'true',
  },
  Recipe: {
    data: 'recipe',
    columnHeader: 'Recipe',
    readOnly: 'true',
  },
  IgoQcRecommendation: {
    data: 'igoQcRecommendation',
    columnHeader: 'IGO Recommendation',
    readOnly: 'true',
    renderer: 'html',
  },
  Comments: {
    data: 'comments',
    columnHeader: 'IGO Comments',
    readOnly: 'true',
  },
  DateCreated: {
    data: 'dateCreated',
    columnHeader: 'Date Created',
    readOnly: 'true',
  },
  Concentration: {
    data: 'concentration',
    columnHeader: 'Concentration',
    readOnly: 'true',
    decimal: 1,
  },
  Volume: {
    data: 'volume',
    columnHeader: 'Volume (uL)',
    readOnly: 'true',
    decimal: 0,
  },
  TotalMass: {
    data: 'totalMass',
    columnHeader: 'Total Mass',
    readOnly: 'true',
    decimal: 1,
  },
};

export const dnaReportSamplesColumns = {
  Din: {
    data: 'din',
    columnHeader: 'DIN',
    readOnly: 'true',
    decimal: 1,
  },
  HumanPercentage: {
    data: 'humanPercentage',
    columnHeader: 'Human %',
    readOnly: 'true',
    decimal: 1,
  },
  TumorOrNormal: {
    data: 'tumorOrNormal',
    columnHeader: 'Tumor/Normal',
    readOnly: 'true',
  },
  SpecimenType: {
    data: 'specimenType',
    columnHeader: 'CMO Sample Type',
    readOnly: 'true',
  },
  InvestigatorDecision: {
    data: 'investigatorDecision',
    columnHeader: 'Investigator Decision',
    readOnly: 'true',
    type: 'autocomplete',
    strict: 'true',
    allowInvalid: 'false',
    trimDropdown: 'false',
    picklistName: 'InvestigatorDecisionCustomers',
  },
};

export const rnaReportSamplesColumns = {
  Rin: {
    data: 'rin',
    columnHeader: 'RIN',
    readOnly: 'true',
    decimal: 1,
  },
  Rqn: {
    data: 'rqn',
    columnHeader: 'RQN',
    readOnly: 'true',
  },
  DV200: {
    data: 'dV200',
    columnHeader: 'DV200',
    readOnly: 'true',
    decimal: 1,
  },
  InvestigatorDecision: {
    data: 'investigatorDecision',
    columnHeader: 'Investigator Decision',
    readOnly: 'true',
    type: 'autocomplete',
    strict: 'true',
    allowInvalid: 'false',
    trimDropdown: 'false',
    picklistName: 'InvestigatorDecisionCustomers',
  },
};

export const libraryReportSamplesColumns = {
  AvgSize: {
    limsField: 'AvgSize',
    data: 'avgSize',
    columnHeader: 'Average Size (bp)',
    readOnly: 'true',
    decimal: 0,
  },
  TumorOrNormal: {
    limsField: 'TumorOrNormal',
    data: 'tumorOrNormal',
    columnHeader: 'Tumor/Normal',
    readOnly: 'true',
  },
  InvestigatorDecision: {
    limsField: 'InvestigatorDecision',
    data: 'investigatorDecision',
    columnHeader: 'Investigator Decision',
    readOnly: 'true',
    type: 'autocomplete',
    strict: 'true',
    allowInvalid: 'false',
    trimDropdown: 'false',
    picklistName: 'InvestigatorDecisionCustomers',
  },
};

export const poolReportSamplesColumns = {
  AvgSize: {
    limsField: 'AvgSize',
    data: 'avgSize',
    columnHeader: 'Average Size (bp)',
    readOnly: 'true',
    decimal: 0,
  },
  TumorOrNormal: {
    limsField: 'TumorOrNormal',
    data: 'tumorOrNormal',
    columnHeader: 'Tumor/Normal',
    readOnly: 'true',
  },
  InvestigatorDecision: {
    limsField: 'InvestigatorDecision',
    data: 'investigatorDecision',
    columnHeader: 'Investigator Decision',
    readOnly: 'true',
    type: 'autocomplete',
    strict: 'true',
    allowInvalid: 'false',
    trimDropdown: 'false',
    picklistName: 'InvestigatorDecisionCustomers',
  },
};

export const dnaReportSamplesOrder = [
  'OtherSampleId',
  'Recipe',
  'IgoQcRecommendation',
  'Comments',
  'InvestigatorDecision',
  'SampleId',
  'Concentration',
  'Volume',
  'TotalMass',
  'Din',
  'SpecimenType',
  'HumanPercentage',
  'TumorOrNormal',
  'Preservation',
  'RecordId',
];
export const poolReportSamplesOrder = [
  'OtherSampleId',
  'Recipe',
  'IgoQcRecommendation',
  'Comments',
  'InvestigatorDecision',
  'SampleId',
  'AvgSize',
  'Concentration',
  'Volume',
  'TotalMass',
  'TumorOrNormal',
  'RecordId',
];
export const rnaReportSamplesOrder = [
  'OtherSampleId',
  'Recipe',
  'IgoQcRecommendation',
  'Comments',
  'InvestigatorDecision',
  'SampleId',
  'Concentration',
  'Volume',
  'TotalMass',
  'Rin',
  'DV200',
  'Preservation',
  'Rqn',
  'RecordId',
];

export const libraryReportSamplesOrder = [
  'OtherSampleId',
  'Recipe',
  'IgoQcRecommendation',
  'Comments',
  'InvestigatorDecision',
  'SampleId',
  'AvgSize',
  'Concentration',
  'Volume',
  'TotalMass',
  'TumorOrNormal',
  'RecordId',
];

// OTHER COLUMNS, PATHOLOGY, ATTACHMENT, COVID, PENDING
export const pathologyReportSamplesColumns = {
  SampleId: {
    limsField: 'SampleId',
    data: 'sampleId',
    columnHeader: 'IGO ID',
    readOnly: 'true',
  },
  RecordId: {
    limsField: 'RecordId',
    data: 'recordId',
    columnHeader: 'Record ID',
    readOnly: 'true',
  },
  OtherSampleId: {
    limsField: 'OtherSampleId',
    data: 'otherSampleId',
    columnHeader: 'Sample Name',
    readOnly: 'true',
  },
  SampleStatus: {
    limsField: 'SampleStatus',
    data: 'sampleStatus',
    columnHeader: 'QC Status',
    readOnly: 'true',
    renderer: 'html',
  },
};

export const covidReportSamplesColumns = {
  RecordId: {
    limsField: 'RecordId',
    data: 'recordId',
    columnHeader: 'Record ID',
    readOnly: 'true',
  },
  OtherSampleId: {
    limsField: 'OtherSampleId',
    data: 'otherSampleId',
    columnHeader: 'OtherSampleId',
    readOnly: 'true',
  },
  UserSampleId: {
    limsField: 'UserSampleID',
    data: 'userSampleId',
    columnHeader: 'UserSampleId',
    readOnly: 'true',
  },
  AssayResult: {
    limsField: 'AssayResult',
    data: 'assayResult',
    columnHeader: 'Assay Result',
    readOnly: 'true',
  },
  CqN1: {
    limsField: 'CqN1',
    data: 'cqN1',
    columnHeader: 'CqN1',
    readOnly: 'true',
    decimal: 1,
  },
  CqN2: {
    limsField: 'CqN2',
    data: 'cqN2',
    columnHeader: 'CqN2',
    readOnly: 'true',
    decimal: 1,
  },
  CqRP: {
    limsField: 'CqRP',
    data: 'cqRP',
    columnHeader: 'CqRP',
    readOnly: 'true',
    decimal: 1,
  },
};

export const attachmentsColumns = {
  FileName: {
    limsField: 'FilePath',
    data: 'fileName',
    columnHeader: 'File Name',
    readOnly: 'true',
  },
  Action: {
    data: 'action',
    columnHeader: 'Action',
    renderer: 'html',
    readOnly: 'true',
  },
  RecordId: {
    limsField: 'RecordId',
    data: 'recordId',
    columnHeader: 'Record ID',
    readOnly: 'true',
  },
};
export const pathologyReportSamplesOrder = ['OtherSampleId', 'SampleStatus', 'SampleId', 'RecordId'];
export const attachmentsOrder = ['FileName', 'Action', 'RecordId'];
export const covidReportSamplesOrder = [
  'UserSampleId',
  'AssayResult',
  'CqN1',
  'CqN2',
  'CqRP',
  'OtherSampleId',
  'RecordId',
];
export const pendingColumns = [
  'Request',
  'First notification',
  'Most recent notification',
  'Report',
  'Author',
  'Lab Notifications',
  'PM Notifications',
  'User Replies',
  'Recipients',
  'Show',
];
export const userPendingColumns = ['Request', 'First notification', 'Most recent notification', 'Report', 'Show'];
