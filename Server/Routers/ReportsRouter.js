const multer = require('multer');
const router = require('express').Router()
const ReportController = require("../Controllers/ReportsController")


router.get("/getPlacementReportByBatchYear", ReportController.getPlacementReportByBatchYear)

router.get("/multiplePlacements", ReportController.multiplePlacements)

router.get("/placedStudentsByCompany", ReportController.placedStudentsByCompany)


module.exports = router