// import controllers review, products
const StudentController = require('../controllers/StudentController.js')
const router = require('express').Router()

router.post("/", StudentController.addStudent)
router.get("/getAllStudents", StudentController.getAllStudents)
router.get("/getOneStudent/:id", StudentController.getOneStudent)
router.post("/updateStudent/:id", StudentController.updateStudent)
router.post("/deleteStudent/:id", StudentController.deleteStudent)

module.exports = router