const multer = require('multer');
const StudentController = require('../Controllers/StudentController.js')
const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')
const router = require('express').Router()
const Authenticate = require("../Middlewares/StudentLogin/Authenticate")
const AdminAuthenticate = require("../Middlewares/Admin/AdminAuthenticate")
require("dotenv").config();
const { google, oauth2_v2, cloudfunctions_v1 } = require("googleapis")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const ResponseService = require("../Services/ResponseService")
const ERROR = ResponseService.ERROR
const fs = require("fs")
const fileUpload = require("../Middlewares/FileUpload/FileUpload")
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
    destination: async (req, file, cb) => {
        try {
            console.log("Here", file)
            console.log(req.files)
            // const OAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
            // OAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })
            // const drive = google.drive({
            //     version: "v3",
            //     auth: OAuthClient
            // })
            // const res = await drive.files.create({
            //     requestBody: {
            //         name: "jenilgandhi.pdf",
            //         mimeType: "image/jpeg"
            //     },
            //     media: {
            //         mimeType: "image/jpeg",
            //         body: fs.createReadStream(req.files.Student_Photo_File.path)
            //     }
            // })
            // console.log(res.data)

            // console.log(file)
        }
        catch (err) {
            console.log(err)
        }
        // cb(null, "./public/student_details/Photo")
    },

    filename: (req, file, cb) => {



        // console.log(req.body)
        // cb(null, req.userId + '.jpg')
        // console.log(req.body)
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
router.post("/addCV", [Authenticate, fileUpload.pdfUploadMiddleWare], StudentController.CV_Upload)
router.post("/updateStudent/", [AdminAuthenticate.AdminAuthenticate, upload.single("Student_Details_File")], StudentController.updateStudent)
router.post("/deleteStudent/:id", [AdminAuthenticate.AdminAuthenticate], StudentController.deleteStudent)
router.post("/getAllStudentPasswords", [AdminAuthenticate.AdminAuthenticate], StudentController.getAllStudentPasswords)
router.post("/sendPasswords", [AdminAuthenticate.AdminAuthenticate], StudentController.sendFirstTimePasswords)
router.post("/uploadPhoto", [Authenticate, fileUpload.fileUploadMiddleware], StudentController.Photo_Upload)

module.exports = router