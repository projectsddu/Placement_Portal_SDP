const router = require('express').Router()
const AnnouncementSubscribeController = require("../Controllers/AnnouncementSubscribeController")

router.post("/subscribe", AnnouncementSubscribeController.addStudentToAnnouncement)
router.get("/getSubscribedAnnouncements", AnnouncementSubscribeController.getSubscribedAnnouncements)

module.exports = router