const logger = require("serverloggerjs/logger")
const { announcements } = require("../Models/index")
const log = new logger(true)
const db = require("../Models/index")
const Announcement = db.announcements

async function checkExists(id) {
    const announcements = await Announcement.findAll({ 
        where: { Announcement_ID: id } 
    })
    return announcements.length > 0 ? true : false
}

const createdAnnoucement = async (announcementData) => {
    try {
        await Announcement.create(announcementData)
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllAnnoucements = async () => {
    try {
        let announcements = await Announcement.findAll({})
        return announcements
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const getAnnoucement = async (id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Error finding announcement detials"
        }
        else {
            let announcement = await Announcement.findAll({
                where: { Announcement_ID: id }
            })
            return announcement
        }
    } catch (error) {
        log.error(error.toString() + id)
        return false
    }
}

const updateAnnoucement = async (data, id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Announcement doesn't exist"
        }
        else {
            const announcement = await Announcement.update(data, { where: { Announcement_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteAnnoucement = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error deleting announcement"
        }
        else {
            await Announcement.destroy({ where: { Announcement_ID: id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createdAnnoucement,
    getAllAnnoucements,
    getAnnoucement,
    updateAnnoucement,
    deleteAnnoucement   
}