const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentPlacement = db.student_placements
const StudentPlacementService = require("../Services/StudentPlacementService")
const CSVToJSON = require('csvtojson');

async function checkExists(id) {
    const studentplacement = await StudentPlacement.findAll({ where: { id } })
    return studentplacement.length > 0 ? true : false
}

const addStudentPlacement = async (req, res) => {
    try {
        const data = req.body
        if (req.emptyField) {
            throw req.empty_arr[0] + " cannot be empty!!!"
        }
        const studentplacementStatus = await StudentPlacementService.createStudentPlacement(data)
        if (studentplacementStatus) {
            return res.json({ data: "StudentPlacement Record created", status: true })
        }
        else {
            throw "Error from createStudentPlacement controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: "Error from createStudentPlacement controller", status: false })
    }
}

const addStudentPlacementViaCSV = async(req, res) => {
    try {
        // convert CSV file to JSON array
        const path = "./public/PlacementFiles/DDU_PLACEMENT.csv"
        const studentPlacementData = await CSVToJSON().fromFile(path)
        // console.log("from line 37")
        // console.log(studentPlacementData)
        if(studentPlacementData)
        {
            for(let i = 0; i < studentPlacementData.length; i++)
            {
                try {
                    let studentStatus = await StudentPlacementService.createStudentPlacement(studentPlacementData[i])
                    
                } catch (error) {
                    log.error(error.toString())
                    throw "Error from create student placement using file"
                }
            }
        }
        return res.json({ status: true, data: "Student placement added" })
    } catch (error) {
        log.error(error.toString())
        return res.json({ data: "Error from addStudentPlacementViaCSV controller", status: false })
    }
}

const getStudentPlacement = async (req, res) => {
    try {
        const id = req.params.id
        let studentplacement = await StudentPlacementService.getStudentPlacement(id)
        if (studentplacement) {
            return res.json({ status: studentplacement.length == 0 ? false : true, data: studentplacement.length == 0 ? "Student Placement Record Not Found!" : studentplacement })
        }
        else {
            throw "Error from getStudentPlacement controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from getStudentPlacement controller" })
    }
}

const getAllStudentPlacement = async (req, res) => {
    try {
        let studentplacements = await StudentPlacementService.getAllStudentPlacement()
        if (studentplacements) {
            return res.json({ status: studentplacements.length == 0 ? false : true, data: studentplacements.length == 0 ? "No Student Placement Record found" : studentplacements })
        }
        else {
            throw "Error from getAllStudentPlacement controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from getAllStudentPlacement controller" })
    }
}

const updateStudentPlacement = async (req, res) => {
    try {
        const id = req.params.id
        // console.log("data from controller")
        // console.log(req.body)
        const studentplacement = await StudentPlacementService.updateStudentPlacement(req.body, id)
        console.log(studentplacement)
        if (studentplacement) {
            return res.json({ status: true, data: "Student Placement Record Updated" })
        }
        else {
            throw "Error from updateStudentPlacement controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from updateStudentPlacement controller" })
    }
}

const deleteStudentPlacement = async (req, res) => {
    try {
        const id = req.params.id
        const studentplacement = await StudentPlacementService.deleteStudentPlacement(id)
        if (studentplacement) {
            return res.json({ status: true, data: "Student Placement Record Deleted Successfully!!" })
        }
        else {
            throw "Error from deleteStudentPlacement controller"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: false, data: "Error from deleteStudentPlacement controller" })
    }
}

module.exports = {
    addStudentPlacement,
    addStudentPlacementViaCSV,
    getStudentPlacement,
    getAllStudentPlacement,
    updateStudentPlacement,
    deleteStudentPlacement
}