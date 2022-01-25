const Subscibe = require("../Services/AnnouncementSubscribe")
const logger = require("serverloggerjs/logger")
const log = new logger(true)

const addStudentToAnnouncement = async (req, res) => {
    try {
        const studentId = req.userId
        const status = Subscibe.addSubsriberToAnnouncement(studentId, req.params.announcementId)
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


const getSubscribedStatus = async (req, res) => {
    try {
        const studentId = req.userId
        const status = await Subscibe.getSubscribedStatus(studentId, req.params.announcementId)

        if(status) {
            return res.json({ status: true})
        }
        else {
            return res.json({ status: false})
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching status!" })
    }
}


const removeStudentToAnnouncement = async (req, res) => {
    try {
        const studentId = req.userId
        const status = await Subscibe.removeSubscribedStatus(studentId, req.params.announcementId)

        if(status) {
            return res.json({ status: true})
        }
        else {
            return res.json({ status: false})
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching status!" })
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
    getSubscribedAnnouncements,
    getSubscribedStatus,
    removeStudentToAnnouncement
}