const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const AnnouncementService = require("./AnnouncementService")
const Subscribers = db.subscribes

const addSubsriberToAnnouncement = async (student_id, announcement_id) => {
    try {
        const payLoad = {
            Announcement_ID: announcement_id,
            Student_ID: student_id
        }
        await Subscribers.create(payLoad);
        return true;
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}

const getSubscribedStatus = async (student_id, announcement_id) => {
    try {
        let data = await Subscribers.findAll({
            where: { Student_ID: student_id, Announcement_ID: announcement_id }
        })

        if(data) {
            console.log(data)
            if(data.length > 0) {
                return true
            }
        }
        return false
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}


const removeSubscribedStatus = async (student_id, announcement_id) => {
    try {
        let data = await Subscribers.destroy({
            where: { Student_ID: student_id, Announcement_ID: announcement_id }
        })

        if(data) {
            return true
        }
        return false
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}


const getSubscribedAnnouncements = async (student_id) => {
    try {
        let data = await Subscribers.findAll({
            where: { Student_ID: student_id }
        })

        let announcements = []
        if (data) {
            // announcements = []
            let flag = false;
            data = JSON.parse(JSON.stringify(data))
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let elem = data[i]
                let announcement_data = await AnnouncementService.getAnnoucement(elem["Announcement_ID"])
                if (announcement_data) {
                    // console.log(JSON.parse(JSON.stringify(announcement_data)));
                    announcements.push(JSON.parse(JSON.stringify(announcement_data))[0])
                }
            }
            // console.log("Announcement List:");
            // console.log(announcements);
            return announcements


        }
    }
    catch (err) {
        console.log(err.toString());
        log.error(err.toString())
        return false;
    }
}

module.exports = {
    addSubsriberToAnnouncement,
    getSubscribedAnnouncements,
    getSubscribedStatus,
    removeSubscribedStatus
}