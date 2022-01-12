const logger = require("serverloggerjs/logger")
const multer = require('multer');
const path = require('path');
const { announcements } = require("../Models/index")
const log = new logger(true)
const db = require("../Models/index")
const CompanyService = require("./CompanyService");
const Announcement = db.announcements

async function checkExists(id) {
    const announcements = await Announcement.findAll({
        where: { Announcement_ID: id }
    })
    return announcements.length > 0 ? true : false
}

const createdAnnoucement = async (announcementData, job_description_file) => {
    try {
        console.log(announcementData)
        const dat = Date.parse(announcementData["Date_of_Visit"])
        const fileName = "./public/" + announcementData["Company_Name"] + "-" + dat.toString() + ".pdf"
        announcementData["Job_Description_File"] = fileName
        announcementData["Company_ID"] = 3 // Temporary static
        announcementData["IsOpen"] = true // Temporary static

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
        let announcements = await Announcement.findAll({
            order: [
                ['Announcement_ID', 'DESC']]
        })
        if (announcements) {
            announcements = JSON.parse(JSON.stringify(announcements))
            for (let i = 0; i < announcements.length; i++) {
                const company = await CompanyService.getCompany(announcements[i].Company_ID)
                announcements[i]["Company_details"] = JSON.parse(JSON.stringify(company))
            }
        }
        return announcements
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const getAnnoucement = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
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
        if (!status) {
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