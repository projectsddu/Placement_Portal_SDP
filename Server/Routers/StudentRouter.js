const multer = require('multer');
const StudentController = require('../controllers/StudentController.js')
const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')
const router = require('express').Router()
const Authenticate = require("../Middlewares/StudentLogin/Authenticate")
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")


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

const fileStorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/student_details/CV")
    },
    filename: (req, file, cb) => {
        // const dat = Date.parse(req.body.Date_of_Visit)
        // console.log(typeof req.body.Date_of_Visit)
        console.log(req.body)
        cb(null, req.userId + ".pdf")
        console.log(req.body);
    }

})

const upload1 = multer({ storage: fileStorage1 })

const fileStorage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/student_details/Photo")
    },

    filename: (req, file, cb) => {
        console.log(req.body)
        cb(null, req.userId + '.jpg')
        console.log(req.body)
    }
})

const upload2 = multer({ storage: fileStorage2 })

router.post("/addStudent", [upload.single("Student_Details_File")], StudentController.addStudent)
router.get("/getAllStudents",
    [AdminAuthenticate.AdminAuthenticate],
    StudentController.getAllStudents)
router.get("/getOneStudent", [Authenticate], StudentController.getOneStudent)
router.get("/getOneStudentInAdmin/:id", [AdminAuthenticate.AdminAuthenticate], StudentController.getOneStudentInAdmin)
router.post("/updateOneStudent/:id", [AdminAuthenticate.AdminAuthenticate], StudentController.updateOneStudent)
router.post("/addCV", [Authenticate, upload1.single("Student_CV_File")], StudentController.CV_Upload)
router.post("/updateStudent/", [AdminAuthenticate.AdminAuthenticate, upload.single("Student_Details_File")], StudentController.updateStudent)
router.post("/deleteStudent/:id", [AdminAuthenticate.AdminAuthenticate], StudentController.deleteStudent)
router.post("/getAllStudentPasswords", [AdminAuthenticate.AdminAuthenticate], StudentController.getAllStudentPasswords)
router.post("/sendPasswords", [AdminAuthenticate.AdminAuthenticate], StudentController.sendFirstTimePasswords)
router.post("/uploadPhoto", [Authenticate, upload2.single("Student_Photo_File")], StudentController.Photo_Upload)

module.exports = router