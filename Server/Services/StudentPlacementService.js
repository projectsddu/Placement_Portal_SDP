const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const StudentPlacement = db.student_placements
const CompanyService = require("./CompanyService")

async function checkExists(id) {
    const studentplacement = await StudentPlacement.findAll({ where: { id } })
    return studentplacement.length > 0 ? true : false
}

const createStudentPlacement = async (studentplacementdata) => {
    try {
        await StudentPlacement.create(studentplacementdata)
        return true
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const getStudentPlacement = async (id) => {
    try {
        let studentplacement = await StudentPlacement.findAll({
            where: { Student_ID: id }
        })
        studentplacement = JSON.parse(JSON.stringify(studentplacement))
        for (let i = 0; i < studentplacement.length; i++) {
            studentplacement[i]["Company_details"] = await CompanyService.getCompany(studentplacement[i]["Company_ID"])
            console.log("Here")
        }
        return studentplacement

    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const getAllStudentPlacement = async () => {
    try {
        let studentplacements = await StudentPlacement.findAll({})
        return studentplacements
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const updateStudentPlacement = async (studentplacementdata, id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Student Placement record doesn't exist"
        }
        else {
            const studentplacement = await StudentPlacement.update(studentplacementdata, { where: { id } })
            console.log("here from service");
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteStudentPlacement = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Student Placement record doesn't exist"
        }
        else {
            await StudentPlacement.destroy({ where: { id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudentPlacement,
    getStudentPlacement,
    getAllStudentPlacement,
    updateStudentPlacement,
    deleteStudentPlacement
}