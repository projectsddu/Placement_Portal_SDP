const logger = require("serverloggerjs/logger")
const multer = require('multer');
const path = require('path');
const { announcements } = require("../Models/index")
const log = new logger(true)
const db = require("../Models/index")
const CompanyService = require("./CompanyService");
const BranchAnnouncementService = require("./BranchAnnouncementService")
const AnnouncementSubscribeService = require("./AnnouncementSubscribe");
// const AnnouncementHelper = require('./HelperServices/AnnouncementHelper')
const NotificationService = require("./NotificationService");
// const AnnouncementSubscribe = require("../Models/AnnouncementSubscribe");
const Announcement = db.announcements
const { sequelize } = require("../Models/index")
const Sequelize = require("sequelize")
const StudentModel = db.students
const MailerService = require("./MailerService")

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
        // const fileName = "./public/" + announcementData["Company_ID"] + "-" + dat.toString() + ".pdf"
        const fileName = job_description_file
        if (fileName != null || fileName != "" || fileName != undefined) {

            announcementData["Job_Description_File"] = fileName
        }
        else {
            announcementData["Job_Description_File"] = ""
        }
        // announcementData["Company_ID"] = 3 // Temporary static
        announcementData["IsOpen"] = true // Temporary static
        const branches = announcementData["Eligible_Branches"].split(",")
        // console.log(branches)
        announcementData["Eligible_Branches"] = ""
        await Announcement.create(announcementData)
        let aData = await Announcement.findAll({
            order: [
                ['Announcement_ID', 'DESC'],
            ],
        })
        aData = JSON.parse(JSON.stringify(aData))[0]
        console.log("FileName", fileName)
        // console.log("Here", JSON.parse(JSON.stringify(aData))[0])
        for (let i = 0; i < branches.length; i++) {
            const status = await BranchAnnouncementService.addBranchToAnnouncement(aData.Announcement_ID, branches[i])
        }
        if (announcementData.sendMail) {
            console.log("in announcement email")
            await sendAnnouncementEmailNotification(announcementData.Passed_out_year)
        }
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const sendAnnouncementEmailNotification = async (year) => {
    try {
        console.log("in email")
        // year = parseInt(year)

        var students = await StudentModel.findAll({ where: [sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), year)] })

        students = JSON.parse(JSON.stringify(students))
        console.log("from email notification: ", students)

        let email_list = [];

        for (let i = 0; i < students.length; i++) {
            let student = students[i]
            let email = student["Email_ID"]
            // console.log(email)
            email_list.push(email)
        }

        console.log(email_list)

        // const announcement = await Announcement.findAll({})

        // await MailerService.batchNotificationMail({
        //     "subject": "NEW ANNOUNCEMENT - PLACEMENT PORTAL - CE DEPARTMENT, DHARMSINH DESAI UNIVERSITY", "header": "New Announcement created", "body": `You can access the DDU placement portal via the following credentials:<br/><br/><b>Student Id:</b>${password.student_id}<br/><b>Password:</b> ${password.password}<br/><br/>Please visit <a href="${process.env.DOMAIN}">${process.env.DOMAIN}</a> to login.<br/><br/><b>Follow these steps to set up your account:</b><br/><br/>Step-1: Open the url given above and login using your student id and first time password.<br/>Step-2: Go to the 'edit profile' page and add your personal email id there (if not added) and update your profile (This is the email where you would receive all the notifications about any placement announcement).<br/>Step-3: Next add your CV and photo from 'dashboard' page.<br/>Step-4: Update all the your profile details (NOTE: edit only the details that are editable) under 'edit profile' page.<br/><br/><b>NOTE: Please mail to jatayubaxi.ce@ddu.ac.in incase you face any issue while using the placement portal web application.</b><br/><b>Note:</b> Ignore if already recieved.`
        // }, email_list
        // )
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllAnnoucements = async (Passed_out_year = "all") => {
    try {
        let announcements;
        if (Passed_out_year == "all") {

            announcements = await Announcement.findAll({
                order: [
                    ['Announcement_ID', 'DESC']]
            })
        }
        else {
            let year = new Date(Date.now())
            year.setDate(0)
            year.setMonth(0)
            year.setFullYear(parseInt(Passed_out_year))
            log.info(year)
            announcements = await Announcement.findAll({
                where: sequelize.where(sequelize.fn('YEAR', sequelize.col('Passed_out_year')), year),
                order: [
                    ['Announcement_ID', 'DESC']]
            })
        }
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
            announcement = JSON.parse(JSON.stringify(announcement))

            // console.log(JSON.parse(JSON.stringify(announcement)));
            let company = await CompanyService.getCompany(announcement[0].Company_ID)
            announcement[0]["Company_details"] = company

            let branches = await BranchAnnouncementService.getBranchesOfAnnouncement(announcement[0]["Announcement_ID"])
            branches = JSON.parse(JSON.stringify(branches))

            announcement[0]["Eligible_Branches"] = branches

            return announcement
        }
    } catch (error) {
        log.error(error.toString() + id)
        return false
    }
}

const updateAnnoucement = async (data, id, sendNotification = false, job_description_file = "") => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Announcement doesn't exist"
        }
        else {
            console.log(JSON.parse(JSON.stringify(data)))
            // console.log(data["Eligible_Branches"])
            const fileName = job_description_file
            if (fileName != "") {

                data["Job_Description_File"] = fileName
            }

            console.log("File Naem", fileName == "")
            // return false
            // data["Job_Description_File"] = fileName
            await BranchAnnouncementService.deleteBranchesOfAnnouncement(id)
            let branches = data["Eligible_Branches"].split(",")
            for (let i = 0; i < branches.length; i++) {
                await BranchAnnouncementService.addBranchToAnnouncement(id, branches[i])
                // console.log(branches[i])
            }
            data["Eligible_Branches"] = ""
            const announcement = await Announcement.update(data, { where: { Announcement_ID: id } })

            if (sendNotification) {
                let students = await AnnouncementSubscribeService.getSubscribedStudentsOfAnnouncement(id)
                students = JSON.parse(JSON.stringify(students))
                const student_list = []
                for (let i = 0; i < students.length; i++) {
                    student_list.push(students[i].Student_ID)
                }

                // console.log(student_list)

                const announcementDetails = await getAnnoucement(id)

                const message = announcementDetails[0]["Company_details"]["Company_name"] + " " + announcementDetails[0]["Job_Role"] + " has been updated. Please check the updated announcement details!"

                const mailData = {
                    "subject": "DDU Placement Cell - " + announcementDetails[0]["Company_details"]["Company_name"] + " announcement has been updated!",
                    "header": message,
                    "body": ""
                }

                const status = await NotificationService.adminToBatchNotification(student_list, message, true, mailData)

                if (status) {
                    return true
                }
                else {
                    throw "Error in sending the notifications!!"
                }
            }

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
    deleteAnnoucement,
    sendAnnouncementEmailNotification
}