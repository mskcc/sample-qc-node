const apiResponse = require('../helpers/apiResponse');
const { authenticateRequest } = require('../middlewares/jwt-cookie');
const {
  getRequestSamples,
  getQcReportSamples,
  getAttachment,
  setInvestigatorDecisions,
} = require('../services/services');

const Cache = require('../helpers/cache');
const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance
const { logger } = require('../helpers/winston');
const db = require('../models/index');
const { buildReportTables } = require('../helpers/util');
const fs = require('fs');
const { sendBookingNotification } = require('../helpers/mailer.js');

exports.getReports = [
  authenticateRequest,
  function (req, res) {
    // console.log(req.params);
    let requestId = req.params.requestId;
    if (!requestId) {
      return apiResponse.ErrorResponse(res, 'missing Request ID');
    }
    // TODO if res.user check if there is a commentrelation for this requestid and that they are in recipients

    // get commentrelations who's id is not in decisions table
    //   db.models.commentrelations
    //     .findAll({
    //       where: db.sequelize.literal('decisions.request_id IS null'),
    //       include: [{ model: db.models.decisions }],
    //     })
    //     .then((requests) => console.log(requests));
    getRequestSamples(requestId)
      .then((request) => {
        // console.log(request.data);
        let sampleIds = [];
        // gets all sample ID from the lims response
        request.data.samples.forEach((element) => {
          sampleIds.push(element.investigatorSampleId);
        });

        // sends requestid and samples and returns reports in request, prepares handsontable
        getQcReportSamples(requestId, sampleIds).then((limsReports) => {
          // console.log(limsReports);
          let reports = buildReportTables(limsReports.data, res.user);
          //   console.log(reports);
          return apiResponse.successResponseWithData(res, 'success', reports);
        });
        // return apiResponse.successResponseWithData(res, 'success', samples);
      })
      .catch((response) => {
        console.log('error');
        return apiResponse.ErrorResponse(res, 'no samples');
      });
  },
];

// exports.downloadAttachment = [authenticateRequest, function (req, res) {
exports.downloadAttachment = [
  function (req, res) {
    let recordId = req.params.recordId;
    getAttachment(recordId)
      .then((response) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        // This is not using the API Response class, it "pipes" the file contents firectly into the res object
        // https://nodejs.org/en/knowledge/advanced/streams/how-to-use-stream-pipe/
        response.data.pipe(res);
      })
      .catch(() => apiResponse.ErrorResponse(res, 'could not load attachment'));
  },
];

exports.submitInvestigatorDecisions = [
  authenticateRequest,
  function (req, res) {
    let currentReport = req.body.decisionsToSave.dataType;
    let decisions = req.body.decisionsToSave;
    // console.log(req.body);
    if (currentReport === 'dnaReportSamples') {
      decisions.dataType = 'qcReportDna';
    }
    if (currentReport === 'rnaReportSamples') {
      decisions.dataType = 'qcReportRna';
    }
    if (currentReport === 'libraryReportSamples' || currentReport === 'poolReportSamples') {
      decisions.dataType = 'qcReportLibrary';
    }
    // console.log(decisions);
    setInvestigatorDecisions(decisions)
      .then((response) => {
        // console.log(response);
        db.models.decisions
          .create({
            comment_relation_id: 43,
            decision_maker: res.user.username,
            request_id: '07008_BY',
            report: 'DNA Report',
            decisions: JSON.stringify(decisions),
            is_igo_decision: 1,
            is_submitted: 1,
            date_created: Date.now(),
          })
          .then((response) => {
            console.log(response);
            sendBookingNotification();
          });
      })
      .catch(() => apiResponse.ErrorResponse(res, 'could not save decisions'));
  },
];
