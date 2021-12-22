const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const StudentInternship = db.student_internships

async function checkExists(id) {
    const studentinternships = await StudentInternship.findAll({ 
        where: { id } 
    })
    return studentinternships.length > 0 ? true : false
}

const createStudentInternship = async (data) => {
    try {
        await StudentInternship.create(data)
        return true
    } catch (error) {
        log.error(error.toString())
        return false   
    }
}

const getAllStudentInternship = async () => {
    try {
        let studentinternships = await StudentInternship.findAll({})
        return studentinternships
    } catch (error) {
        log.error(error.toString())
        return false   
    }
}

const getStudentInternship = async (id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Error finding Student Internship details"
        }
        else {
            let studentinternship = await StudentInternship.findAll({ where: { id }})
            return studentinternship
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const updateStudentInternship = async (data, id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Student Internship record doesn't exist"
        }
        else {
            let studentinternship = await StudentInternship.update(data, { where: { id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

const deleteStudentInternship = async (id) => {
    try {
        const status = await checkExists(id)
        if(!status) {
            throw "Student Internship record doesn't exist"
        }
        else {
            await StudentInternship.destroy({ where: { id } })
            return true
        }
    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudentInternship,
    getAllStudentInternship,
    getStudentInternship,
    updateStudentInternship,
    deleteStudentInternship
}