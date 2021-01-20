var express = require('express');
const ReportController = require('../controllers/ReportController');
var router = express.Router();

router.get('/getReports/:requestId', ReportController.getReports);
router.get('/downloadAttachment/:recordId', ReportController.downloadAttachment);
router.post('/submitInvestigatorDecisions', ReportController.submitInvestigatorDecisions);

module.exports = router;
