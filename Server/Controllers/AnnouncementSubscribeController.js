const Subscibe = require("../Services/AnnouncementSubscribe")
const logger = require("serverloggerjs/logger")
const log = new logger(true)

const addStudentToAnnouncement = async (req, res) => {
    try {
        // studentID would be added in a middleware later on....
        const studentId = "19CEUOS003"
        const status = Subscibe.addSubsriberToAnnouncement(studentId, req.body.announcement_id)
        if (status) {
            return res.json({ status: true, data: "Subscribed Successfully!" })
        }
        else {
            throw "Error in Subscribing student"
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error subscribing to announcement!" })
    }
}

const getSubscribedAnnouncements = async (req, res) => {
    try {
        const student_id = "19CEUOS003"
        const data = await Subscibe.getSubscribedAnnouncements(student_id)
        if (data) {
            return res.json({ status: true, data: data })
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching announcements!" })
    }
}
module.exports = {
    addStudentToAnnouncement,
    getSubscribedAnnouncements
}