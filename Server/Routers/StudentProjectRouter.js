const StudentProjectController = require("../Controllers/StudentProjectController")
const router = require('express').Router()

router.post("/createStudentProject", StudentProjectController.createStudentProject)
router.get("/getAllStudentProject", StudentProjectController.getAllStudentProjects)
router.get("/getOneStudentProject/:id", StudentProjectController.getOneStudentProject)
router.post("/updateStudentProject/:id", StudentProjectController.updateStudentProject)
router.post("/deleteStudentProject/:id", StudentProjectController.deleteStudentProject)

module.exports = router