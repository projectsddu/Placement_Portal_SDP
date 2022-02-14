const StudentPlacementController = require("../Controllers/StudentPlacementController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")

router.post("/addStudentPlacement", StudentPlacementController.addStudentPlacement)
router.get("/getStudentPlacement/:id", StudentPlacementController.getStudentPlacement)
router.get("/getAllStudentPlacement", StudentPlacementController.getAllStudentPlacement)
router.post("/updateStudentPlacement/:id", StudentPlacementController.updateStudentPlacement)
router.post("/deleteStudentPlacement/:id", StudentPlacementController.deleteStudentPlacement)

module.exports = router