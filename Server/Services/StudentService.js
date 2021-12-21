const UserLoginService = require("./UserLoginService")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Student = db.students

async function checkExists(id) {
    const students = await Student.findAll({ where: { id } })
    if (students.length == 0) {
        return false
    }
    else {
        return true
    }
}

const createStudent = async (studentData) => {
    try {
        const student = await Student.create(studentData)
        await UserLoginService.createUserLogin(student.id)
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
    return true
}

const getAllStudents = async () => {
    try {
        let students = await Student.findAll({})
        return students
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getOneStudent = async (id) => {
    try {
        let student = await Student.findOne({
            where: { id }
        })
        return student
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const updateStudent = async (data, id) => {
    try {
        if (checkExists(id)) {
            const student = await Student.update(data, { where: { id } })
            return student
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}


const deleteStudent = async (id) => {
    try {
        const status = await checkExists(id)
        if (!status) {
            throw "Error deleting student"
        }
        else {
            await Student.destroy({ where: { id } })
            return true
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    createStudent,
    getOneStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
}