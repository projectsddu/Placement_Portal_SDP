const StudentInternshipController = require("../Controllers/StudentInternshipController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")

router.post("/addStudentInternship", [EmptyFieldCheck], StudentInternshipController.addStudentInternship)
router.get("/getAllStudentInternship", StudentInternshipController.getAllStudentInternship)
router.get("/getStudentInternship/:id", StudentInternshipController.getStudentInternship)
router.post("/updateStudentInternship/:id", StudentInternshipController.updateStudentInternship)
router.post("/deleteStudentInternship/:id", StudentInternshipController.deleteStudentInternship)

module.exports = router