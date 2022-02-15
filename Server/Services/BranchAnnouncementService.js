const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const BranchAnnouncement = db.BranchAnnouncement

const addBranchToAnnouncement = async (announcementId, branchName) => {
    try {
        const payLoad = { AnnouncementId: announcementId, BranchName: branchName }

        const status = await BranchAnnouncement.create(payLoad)
        if (status) {
            return true
        }
        else {
            throw "Error in create BranchAnnouncementService"
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getBranchesOfAnnouncement = async (AnnouncementId) => {
    try {
        const allBranches = await BranchAnnouncement.findAll({ where: { AnnouncementId } })
        console.log(allBranches)
        return allBranches
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    addBranchToAnnouncement,
    getBranchesOfAnnouncement
}