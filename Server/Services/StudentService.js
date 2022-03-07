const UserLoginService = require("./UserLoginService")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const Student = db.students
const FirstTimePasswordService = require("./FirstTimePasswordService")

async function checkExists(id) {
    const students = await Student.findAll({ where: { Student_ID: id } })
    if (students.length == 0) {
        return false
    }
    else {
        return true
    }
}

const createStudent = async (studentData) => {
    try {
        const id = studentData["Student_ID"]
        // console.log("line 21 student Id:")
        // console.log(id)
        if (await checkExists(id)) {
            // console.log("line 25")
            const data = await Student.update(studentData, { where: { Student_ID: id } })
            // console.log(id)
            // return student
        }
        else {
            studentData["Student_Photo"] = "./public/student_details/Photo/default_image.jpg"
            const student = await Student.create(studentData)
            const password = await FirstTimePasswordService.AddFirstTimePassword(student.Student_ID)
            await UserLoginService.createUserLogin(student.Student_ID, password)
            // return true
        }
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
            where: { Student_ID: id }
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
        if (await checkExists(id)) {
            const student = await Student.update(data, { where: { Student_ID: id } })
            console.log(id)
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

const CV_Upload = async (data, id) => {
    try {
        if (await checkExists(id)) {
            const student = await Student.update({ CV_Upload: data }, { where: { Student_ID: id } })
            // console.log(id)
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
            await Student.destroy({ where: { Student_ID: id } })
            return true
        }
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const Photo_Upload = async (data, id) => {
    try {
        if (await checkExists(id)) {
            // console.log(data)
            data = data.toString()
            const student = await Student.update({ Student_Photo: data }, { where: { Student_ID: id } })
            return student
        }
        else {
            return false
        }

    } catch (error) {
        log.error(error.toString())
        return false
    }
}

module.exports = {
    createStudent,
    getOneStudent,
    getAllStudents,
    updateStudent,
    CV_Upload,
    deleteStudent,
    Photo_Upload
}