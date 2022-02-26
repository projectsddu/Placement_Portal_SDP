const StudentPlacementController = require("../Controllers/StudentPlacementController")
const router = require('express').Router()
const EmptyFieldCheck = require("../Middlewares/General/EmptyFieldCheck")
const multer = require('multer');



const fileStorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/PlacementFiles")
    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".")[1]
        console.log(req.body)
        cb(null, req.body.Student_ID + "-" + req.body.Designation + "-" + req.body.Company_ID + "." + extension)
        req.body.Offer_Letter = "/public/PlacementFiles/" + req.body.Student_ID + "-" + req.body.Designation + "-" + req.body.Company_ID + "." + extension
    }

})

const upload1 = multer({ storage: fileStorage1 })


router.post("/addStudentPlacement", [upload1.single("Job_Description_File")], StudentPlacementController.addStudentPlacement)
router.get("/getStudentPlacement/:id", StudentPlacementController.getStudentPlacement)
router.get("/getAllStudentPlacement", StudentPlacementController.getAllStudentPlacement)
router.post("/updateStudentPlacement/:id", [upload1.single("Job_Description_File")], StudentPlacementController.updateStudentPlacement)
router.post("/deleteStudentPlacement/:id", StudentPlacementController.deleteStudentPlacement)

module.exports = router