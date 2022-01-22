// import controllers review, products
const multer = require('multer');
const AnnouncementController = require('../controllers/AnnoucementController.js')
const router = require('express').Router()
// const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')
const EmptyFieldCheck = require("../Middlewares/Annoucement/EmptyFieldCheck");
const SalaryVerifier = require("../Middlewares/Annoucement/SalaryVerifier");
const DateValidator = require("../Middlewares/Annoucement/DateValidator");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        const dat = Date.parse(req.body.Date_of_Visit)
        // console.log(typeof req.body.Date_of_Visit)
        console.log(req.body)
        cb(null, req.body.Company_ID + "-" + dat.toString() + ".pdf")
        console.log(req.body);
    }

})

const upload = multer({ storage: fileStorage })

router.post("/addAnnoucement", [upload.single("Job_Description_File"), EmptyFieldCheck, SalaryVerifier], AnnouncementController.addAnnoucement)
router.post("/deleteAnnoucement/:annoucementId", AnnouncementController.deleteAnnoucement)
router.get("/getAllAnnoucements", AnnouncementController.getAllAnnoucements)
router.get("/getAnnoucement/:annoucementId", AnnouncementController.getAnnoucement)
router.post("/updateAnnoucement/:annoucementId", [EmptyFieldCheck, SalaryVerifier, DateValidator], AnnouncementController.updateAnnoucement)
router.post("/deleteAnnoucement/:annoucementId", AnnouncementController.deleteAnnoucement)
router.get("/requiredAnnoucementDetails", AnnouncementController.requiredAnnoucementDetails)

// related to comments
router.post("/addComment/:annoucementId", AnnouncementController.addComment)
router.get("/getAllComments/:annoucementId", AnnouncementController.getAllComments)


module.exports = router