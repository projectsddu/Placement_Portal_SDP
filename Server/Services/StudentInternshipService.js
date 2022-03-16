const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const StudentInternship = db.student_internships
const CompanyService = require("./CompanyService")
const StudentService = require("./StudentService")
const { sequelize } = require("../Models/index")
const Sequelize = require("sequelize")

async function checkExists(id) {
    const studentinternships = await StudentInternship.findAll({ 
        where: { id } 
    })
    return studentinternships.length > 0 ? true : false
}

const createStudentInternship = async (data, viaCSV = false) => {
    try {
        const studentDetails = await StudentService.getOneStudent(data.Student_ID)
        if(!studentDetails)
        {
            return "No student found"
        }
        if(viaCSV)
        {
            if(data["Company_ID"] == "" || data["Student_ID"] == "")
            {
                return "Empty"
            }
            let [res1, res2] = await sequelize.query("SELECT Company_ID FROM Companies WHERE LOWER(Company_name)='" + data["Company_ID"].toLowerCase() + "'")
            console.log(data["Company_ID"])
            console.log("from line 23",res2)
            if(res2[0]["Company_ID"] == 0)
            {
                throw "Company not found"
            }
            data["Company_ID"] = res2[0]["Company_ID"]
        }
        data["Passed_out_year"] = studentDetails.Passed_out_year
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
        
        let studentinternship = await StudentInternship.findAll({
            where: { Student_ID: id }
        })
        studentinternship = JSON.parse(JSON.stringify(studentinternship))
        for (let i = 0; i < studentinternship.length; i++) {
            studentinternship[i]["Company_details"] = await CompanyService.getCompany(studentinternship[i]["Company_ID"])
            console.log("Here")
        }
        return studentinternship

    } 
    catch (error) {
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

const deleteAllInternshipOfStudent = async (id) => {
    try {
        const temp = await StudentInternship.findAll({ where: { Student_ID: id } })
        const status = temp.length > 0 ? true : false
        if(!status)
        {
            throw "Internship record doesn't exist for the particular Student_ID"
        }
        else
        {
            await StudentInternship.destroy({ where: { Student_ID: id } })
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
    deleteStudentInternship,
    deleteAllInternshipOfStudent
}