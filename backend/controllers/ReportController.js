const apiResponse = require('../helpers/apiResponse');
const { authenticateRequest } = require('../middlewares/jwt-cookie');
const {
  getRequestSamples,
  getQcReportSamples,
  getAttachment,
  setInvestigatorDecisions,
  getCommentRelations,
  getComments,
} = require('../services/services');

const Cache = require('../helpers/cache');
const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new Cache(ttl); // Create a new cache service instance
const { logger } = require('../helpers/winston');
const db = require('../models/index');
const { buildReportTables, isUserAuthorized } = require('../helpers/util');
const fs = require('fs');
const { sendBookingNotification } = require('../helpers/mailer.js');
var _ = require('lodash');

exports.getReports = [
  authenticateRequest,
  function (req, res) {
    // console.log(req);
    let requestId = req.body.requestId;
    let userGroups = req.body.userGroups;
    // let requestId = req.params.requestId;
    if (!requestId) {
      return apiResponse.ErrorResponse(res, 'missing Request ID');
    }

    // use service to get comment relations and comments if there are any from db for that request
    getCommentRelations(requestId).then((commentRelations) => {
      // if there are not comments relations and user is not a lab member

      if (_.isEmpty(commentRelations) && res.user.isUser) {
        return apiResponse.notFoundResponse(res, 'Request not found');
      }
      let commentResult = {};
      let authorized = isUserAuthorized(commentRelations, res.user, userGroups);

      if (!authorized) {
        return apiResponse.notFoundResponse(res, 'Request not found');
      } else {
        // because we want to wait until comments are retrieved for each report
        let commentPromises = [];
        commentRelations.forEach((commentRelation) => {
          // console.log(commentRelation);
          commentPromises.push(getComments(commentRelation.id, commentRelation.report));
        });
        Promise.all(commentPromises).then((commentsResult) => {
          // console.log(...commentsResult);
          // commentsResult.forEach((commentResult) => console.log(commentResult));
          getRequestSamples(requestId)
            .then((requestInfo) => {
              // console.log(requestInfo.data);

              let sampleIds = [];
              // gets all sample ID from the lims response
              requestInfo.data.samples.forEach((element) => {
                sampleIds.push(element.investigatorSampleId);
              });

              // sends requestid and samples and returns LIMS reports in request, prepares handsontable
              getQcReportSamples(requestId, sampleIds).then((limsReports) => {
                // console.log(limsReports);
                let reports = buildReportTables(limsReports.data, res.user);
                // iterate through reports and attach comments for each of those reports
                // reports['DNA Report'].comments = 'test';
                // console.log(commentsResult);
                commentsResult.forEach((commentResult) => {
                  reports[commentResult.reportName].comments = commentResult.comments;
                });
                // reports includes comments right now, can also separate them out
                // let response = {request: , recipients: , reports: reports}
                console.log(reports);
                return apiResponse.successResponseWithData(res, 'success', reports);
              });
              // return apiResponse.successResponseWithData(res, 'success', samples);
            })
            .catch((response) => {
              console.log(response);
              return apiResponse.ErrorResponse(res, 'no samples');
            });
        });
      }
      // check if user is in comment relation recipients or if user is lab member or if user is cmo pm and request is associated with pms
      // if (
      //   commentRelations.recipients.includes(res.user.username) ||
      //   res.user.isLabMember ||
      //   (res.user.isPM && commentRelations.recipients.includes(process.env.CMO_PM_EMAIL))
      // ) {
      // }

      // if the user is authorized, iterate through the comment relations and get the comments
    });

    // get commentrelations who's id is not in decisions table
    //   db.models.commentrelations
    //     .findAll({
    //       where: db.sequelize.literal('decisions.request_id IS null'),
    //       include: [{ model: db.models.decisions }],
    //     })
    //     .then((requests) => console.log(requests));
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
