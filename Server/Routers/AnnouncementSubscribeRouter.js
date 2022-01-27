const router = require('express').Router()
const AnnouncementSubscribeController = require("../Controllers/AnnouncementSubscribeController")
const StudentAuthenticate = require("../Middlewares/StudentLogin/Authenticate")

router.post("/subscribe/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.addStudentToAnnouncement)
router.post("/unsubscribe/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.removeStudentToAnnouncement)
router.get("/getSubscribedAnnouncements", [StudentAuthenticate], AnnouncementSubscribeController.getSubscribedAnnouncements)
router.get("/getSubscribedStatus/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.getSubscribedStatus)
router.get("/getSubscribedStudentsOfAnnouncement/:announcementId", [StudentAuthenticate], AnnouncementSubscribeController.getSubscribedStudentsOfAnnouncement)

module.exports = router