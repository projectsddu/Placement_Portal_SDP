const multer = require('multer');
const router = require('express').Router()
const ReportController = require("../Controllers/ReportsController")


router.post("/getPlacementReportByBatchYear", ReportController.getPlacementReportByBatchYear)

router.post("/multiplePlacements", ReportController.multiplePlacements)

router.post("/placedStudentsByCompany", ReportController.placedStudentsByCompany)

router.post("/studentsInterestedInHigherStudies", ReportController.studentsInterestedInHigherStudies)

router.post("/unplacedStudents", ReportController.unplacedStudents)

router.post("/unplacedInternship", ReportController.unplacedInternship)

module.exports = router