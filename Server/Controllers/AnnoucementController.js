const db = require("../Models")
const multer = require('multer');
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const Announcement = db.announcements
const AnnouncementService = require("../Services/AnnouncementService");
const { request } = require("express");

async function checkExists(id) {
    const annoucements = await Announcement.findAll({ where: { Announcement_ID: id } })
    return annoucements.length > 0 ? true : false
}



const addAnnoucement = async (req, res) => {
    try {

        // console.log(req);

        const { Announcement_ID, Company_ID, Date_of_Visit, Date_of_announcement,
            Eligible_Branches, Passed_out_year, Job_Role, Salary, Job_Location, Bond_Details, Other_Details, Job_Description_File, Registration_Deadline, Eligibility, IsOpen } = req.body;

        if (req.emptyField) {
            throw req.empty_arr[0] + " cannot be empty!!"
        }
        // valid
        else {
            let annoucement = {
                Announcement_ID: Announcement_ID,
                Company_ID: Company_ID,
                Date_of_Visit: Date_of_Visit,
                Date_of_announcement: Date_of_announcement,
                Eligible_Branches: Eligible_Branches,
                Passed_out_year: Passed_out_year,
                Job_Role: Job_Role,
                Salary: Salary,
                Job_Location: Job_Location,
                Bond_Details: Bond_Details,
                Other_Details: Other_Details,
                Job_Description_File: Job_Description_File,
                Registration_Deadline: Registration_Deadline,
                Eligibility: Eligibility,
                IsOpen: IsOpen
            }
            // console.log(annoucement);
            // console.log("Req.file: ", req);
            // const job_description_file = req.file

            // const annoucementStatus = await AnnouncementService.createdAnnoucement(req.body, job_description_file)
            if(1)
            {
                return res.json({ data: "Announcement Created", status: true })
            }
            else {
                throw "Error from createdAnnoucement controller"
            }
        }
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }
}

// returns all annoucements
const getAllAnnoucements = async (req, res) => {
    try {
        let announcements = await AnnouncementService.getAllAnnoucements()
        if (announcements) {
            return res.json({ status: announcements.length == 0 ? false : true, data: announcements.length == 0 ? "No Student data!" : announcements })
        }
        else {
            throw "Error in getAllAnnoucements"
        }
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }

}

// return one annoucment by its id
const getAnnoucement = async (req, res) => {

    try {
        const id = req.params.annoucementId
        let announcement = await AnnouncementService.getAnnoucement(id)
        if(announcement) {
            return res.json({ status: announcement.length == 0 ? false : true, data: announcement.length == 0 ? "Annoucement Not Found!" : announcement })
        }
        else {
            throw "Error in getAnnouncement"
        }
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }

}

const updateAnnoucement = async (req, res) => {
    try {
        const id = req.params.annoucementId
        const annoucement = await AnnouncementService.updateAnnoucement(req.body, id)
        if(annoucement) {
            return res.json({ status: true, data: "Announcement Updated!!" })
        }
        else { 
            return res.json({ status: false, data: "Error updating Announcement !!!" })
        }
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: "Error updating announcement !!" })
    }
}

const deleteAnnoucement = async (req, res) => {
    try {
        let id = req.params.annoucementId
        const status = await AnnouncementService.deleteAnnoucement(id)
        if(status) {
            return res.json({ status: true, data: "Announcement Deleted Successfully!!" })
        }
        else {
            throw "Error deleting announcement"
        }
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }
}

module.exports = {
    addAnnoucement,
    getAllAnnoucements,
    getAnnoucement,
    updateAnnoucement,
    deleteAnnoucement
}