const multer = require('multer');
const StudentController = require('../controllers/StudentController.js')
const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')
const router = require('express').Router()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/student_details")
    },
    filename: (req, file, cb) => {
        // const dat = Date.parse(req.body.Date_of_Visit)
        // console.log(typeof req.body.Date_of_Visit)
        console.log(req.body)
        cb(null, "DDU" + ".csv")
        console.log(req.body);
    }

})

const upload = multer({ storage: fileStorage })

router.post("/", [upload.single("Student_Details_File")], EmptyFieldCheck, StudentController.addStudent)
router.get("/getAllStudents", StudentController.getAllStudents)
router.get("/getOneStudent/:id", StudentController.getOneStudent)
router.post("/updateStudent/", [upload.single("Student_Details_File")], StudentController.updateStudent)
router.post("/deleteStudent/:id", StudentController.deleteStudent)

module.exports = router