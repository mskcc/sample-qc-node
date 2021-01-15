var express = require('express');
const ReportController = require('../controllers/ReportController');
var router = express.Router();

router.get('/getReports/:requestId', ReportController.getReports);
router.get('/downloadAttachment/:recordId', ReportController.downloadAttachment);

module.exports = router;
