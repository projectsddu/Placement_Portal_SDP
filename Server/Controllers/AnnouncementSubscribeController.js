const Subscibe = require("../Services/AnnouncementSubscribe")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const AnnouncementService = require("../Services/AnnouncementService")
const AnnouncementSubscribeService = require("../Services/AnnouncementSubscribe")
const ZippingService = require("../Services/ZippingService")

const addStudentToAnnouncement = async (req, res) => {
    try {
        const studentId = req.userId
        const status = Subscibe.addSubsriberToAnnouncement(studentId, req.params.announcementId)
        if (status) {
            return res.json({ status: true, data: "Applied Successfully!" })
        }
        else {
            throw "Error in Subscribing student"
        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error applying to announcement!" })
    }
}


const getSubscribedStatus = async (req, res) => {
    try {
        const studentId = req.userId
        const status = await Subscibe.getSubscribedStatus(studentId, req.params.announcementId)

        if (status) {
            return res.json({ status: true })
        }
        else {
            return res.json({ status: false })
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

        if (status) {
            return res.json({ status: true })
        }
        else {
            return res.json({ status: false })
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
        // const student_id = "19CEUOS003"
        const student_id = req.userId
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


const getSubscribedStudentsOfAnnouncement = async (req, res) => {
    try {
        const announcement_id = req.params.announcementId
        const data = await Subscibe.getSubscribedStudentsOfAnnouncement(announcement_id)
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

const downloadSubscribedStudentZip = async (req, res) => {
    try {
        const announcement_id = req.params.announcementId
        let announcement_details = await AnnouncementService.getAnnoucement(announcement_id)
        // console.log(JSON.parse(JSON.stringify(announcement_details)));
        const zipName = announcement_id + "_" + announcement_details[0]["Company_details"]["Company_name"] + "_" + announcement_details[0]["Job_Role"]
        // console.log(zipName);
        const subscribedStudents = await AnnouncementSubscribeService.getSubscribedStudentsOfAnnouncement(announcement_id)
        const subscribedStudentList = []
        subscribedStudents.map((student) => {
            subscribedStudentList.push(student["Student_ID"])
        })
        // console.log("ehjk");
        // console.log(subscribedStudentList);
        const data = await ZippingService.downloadZipFile("../public/student_details/CV/", zipName, subscribedStudentList)

        // console.log("jer");
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename=${zipName
            }.zip`);
        res.set('Content-Length', data.length);
        return res.send(data);
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching student data!" })
    }

}

module.exports = {
    addStudentToAnnouncement,
    getSubscribedAnnouncements,
    getSubscribedStatus,
    removeStudentToAnnouncement,
    getSubscribedStudentsOfAnnouncement,
    downloadSubscribedStudentZip
}