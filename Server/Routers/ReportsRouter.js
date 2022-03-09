const multer = require('multer');
const router = require('express').Router()
const ReportController = require("../Controllers/ReportsController")


router.post("/getPlacementReportByBatchYear", ReportController.getPlacementReportByBatchYear)

router.get("/multiplePlacements", ReportController.multiplePlacements)

router.post("/placedStudentsByCompany", ReportController.placedStudentsByCompany)


module.exports = router