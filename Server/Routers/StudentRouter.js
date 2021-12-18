// import controllers review, products
const StudentController = require('../controllers/StudentController.js')
const router = require('express').Router()

router.get("/", StudentController.addStudent)


module.exports = router