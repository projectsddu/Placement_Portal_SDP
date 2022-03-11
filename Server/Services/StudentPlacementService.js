const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const StudentPlacement = db.student_placements
const CompanyService = require("./CompanyService")
const StudentService = require("./StudentService")


async function isFinalPlacementPresent(studentId) {
    try {
        const allPlacements = await getStudentPlacement(studentId)
        if (allPlacements) {
            for (let i = 0; i < allPlacements.length; i++) {
                let obj = allPlacements[i]
                if (obj["IsFinal"] == 1) {
                    obj["IsFinal"] = 0
                    // update to 0 and break return true
                    await updateStudentPlacement(obj, obj["id"])
                    return true
                }
            }
            return true
        }
        else {
            return true
        }
    }
    catch (err) {
        log.error("")
    }
}

async function isFirstPlacement(studentId) {
    try {
        const studentplacement = await StudentPlacement.findAll({ where: { Student_ID: studentId } })

        return studentplacement.length == 0 ? true : false
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

async function checkExists(id) {
    const studentplacement = await StudentPlacement.findAll({ where: { id } })
    return studentplacement.length > 0 ? true : false
}

const createStudentPlacement = async (studentplacementdata) => {
    try {
        const status = await isFirstPlacement(studentplacementdata.Student_ID)
        if (status) {
            studentplacementdata["IsFinal"] = true
        }
        else {
            if (studentplacementdata["IsFinal"] == true) {

                await isFinalPlacementPresent(studentplacementdata.Student_ID)
            }

        }
        const student_details = await StudentService.getOneStudent(studentplacementdata.Student_ID)
        studentplacementdata["Passed_out_year"] = student_details.Passed_out_year
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
            if (studentplacementdata["IsFinal"] == 1) {
                const status1 = await isFinalPlacementPresent(studentplacementdata.Student_ID)
                if (status1) {

                    const studentplacement = await StudentPlacement.update(studentplacementdata, { where: { id } })
                    console.log("here from service");
                    return true
                }
            }
            else {
                const studentplacement = await StudentPlacement.update(studentplacementdata, { where: { id } })
                console.log("here from service");
                return true
            }
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