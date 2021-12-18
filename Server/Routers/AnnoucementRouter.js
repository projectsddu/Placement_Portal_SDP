// import controllers review, products
const AnnouncementController = require('../controllers/AnnoucementController.js')
const router = require('express').Router()
const EmptyFieldCheck = require('../Middlewares/General/EmptyFieldCheck')

router.post("/addAnnoucement", [EmptyFieldCheck], AnnouncementController.addAnnoucement)

router.get("/getAllAnnoucements", AnnouncementController.getAllAnnoucements)
router.get("/getAnnoucement/:annoucementId", AnnouncementController.getAnnoucement)
router.post("/updateAnnoucement/:annoucementId", AnnouncementController.updateAnnoucement)
router.post("/deleteAnnoucement/:annoucementId", AnnouncementController.deleteAnnoucement)


module.exports = router