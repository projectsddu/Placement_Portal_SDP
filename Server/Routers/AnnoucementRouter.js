// import controllers review, products
const multer = require('multer');
const AnnouncementController = require('../controllers/AnnoucementController.js')
const router = require('express').Router()
const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        cb(null, "keval")
        console.log(req);
    }

})

const upload = multer({storage: fileStorage })

router.post("/addAnnoucement", [upload.single("Job_Description_File")], AnnouncementController.addAnnoucement)

router.get("/getAllAnnoucements", AnnouncementController.getAllAnnoucements)
router.get("/getAnnoucement/:annoucementId", AnnouncementController.getAnnoucement)
router.post("/updateAnnoucement/:annoucementId", AnnouncementController.updateAnnoucement)
router.post("/deleteAnnoucement/:annoucementId", AnnouncementController.deleteAnnoucement)


module.exports = router