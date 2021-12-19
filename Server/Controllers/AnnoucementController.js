const db = require("../Models")
const Announcement = db.announcements
const addAnnoucement = async (req, res) => {
    try {
        const { Announcement_ID, Company_ID, Date_of_Visit, Date_of_announcement,
            Eligible_Branches, Passed_out_year, Job_Role, Salary, Job_Location, Bond_Details, Other_Details, Job_Description_File, Registration_Deadline, Eligiblity, IsOpen } = req.body;

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
                Eligiblity: Eligiblity,
                IsOpen: IsOpen
            }

            const createdAnnoucement = await Announcement.create(annoucement)
            res.status(200).send(createdAnnoucement);
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
        let announcements = await Announcement.findAll({})
        res.send({ status: true, data: announcements })
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }

}

// return one annoucment by its id
const getAnnoucement = async (req, res) => {

    try {
        const annoucementId = req.params.annoucementId;
        let annoucement = await Announcement.findAll({
            where: {
                Announcement_ID: annoucementId
            }
        })

        res.json({ status: annoucement.length == 0 ? false : true, data: annoucement.length == 0 ? "Annoucement Not Found!" : annoucement })
        // res.send(annoucement)
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }

}

const updateAnnoucement = async (req, res) => {
    try {
        const annoucementId = req.params.annoucementId;

        let annoucementExist = await Announcement.findAll({
            where: {
                Announcement_ID: annoucementId
            }
        })

        if (!annoucementExist) {
            res.json({ status: false, data: "Annoucement Not Found!!" })
        }

        let annoucement = await Announcement.update(req.body, {
            where: {
                Announcement_ID: annoucementId
            }
        })

        res.json({ status: annoucement.length == 0 ? false : true, data: annoucement.length == 0 ? "Annoucement Not Found!" : "updated rows " + annoucement })
    }
    catch (e) {
        console.log(e.toString());
        res.json({ status: false, data: e.toString() })
    }
}

const deleteAnnoucement = async (req, res) => {
    try {
        const annoucementId = req.params.annoucementId;

        let annoucementExist = await Announcement.findAll({
            where: {
                Announcement_ID: annoucementId
            }
        })

        if (!annoucementExist) {
            res.json({ status: false, data: "Annoucement Not Found!!" })
        }

        let annoucement = await Announcement.destroy({
            where: {
                Announcement_ID: annoucementId
            }
        })

        res.json({ status: annoucement.length == 0 ? false : true, data: annoucement.length == 0 ? "Annoucement Not Found!" : "updated rows " + annoucement })
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