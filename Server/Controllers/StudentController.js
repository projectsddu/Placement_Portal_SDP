const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const Student = db.students
const Announcement = db.announcements

// to add a new student
const addStudent = async (req, res) => {
    try {
        // Student.create({
        //     Student_ID: "19CEUOS001",
        //     FirstName: "Manan",
        //     MiddleName: "Dipakkumar",
        //     LastName: "Chauhan",
        //     Admission_type: "Normal",
        //     Cast_category: "General",
        //     Gender: "Male",
        //     DOB: "2001-02-29",
        //     SSC_Percentage: 85.59,
        //     SSC_Percentile: 95.97,
        //     SSC_Board: "GSEB",
        //     SSC_School: "GTG",
        //     HSC_Percentage: 80.59,
        //     HSC_Percentile: 95.97,
        //     HSC_Board: "GSEB",
        //     HSC_School: "GTG",
        //     IsD2D: "FALSE",
        //     Diploma_Result_CPI: 0,
        //     Diploma_Result_Percentage: 0,
        //     Diploma_College_Name: "NOT APPLICABLE",
        //     Diploma_University: "NOT APPLICABLE",
        //     Sem_1_SPI: 9.5,
        //     Sem_2_SPI: 9.2,
        //     Sem_3_SPI: 9.1,
        //     Sem_4_SPI: 9.1,
        //     Sem_5_SPI: 9.2,
        //     Sem_6_SPI: 9.1,
        //     Sem_7_SPI: 9.0,
        //     Sem_8_SPI: 9.5,
        //     Current_CPI: 9.5,
        //     Enrollment_year: "2019",
        //     Passed_out_year: "2023",
        //     Email_ID: "abc@gmail.com",
        //     Contact_No_1: "1234567890",
        //     Contact_No_2: "0987654321",
        //     Address: "gujarat",
        //     City: "vadodara",
        //     Pin_Code: "390021",
        //     Current_semester: "6",
        //     Career_Preference: "Placement",
        //     CV_Upload: "image.png",
        //     Student_Photo: "image1.png",
        //     Branch_Id: "CE"
        // })
        Student.create(req.body)
        return res.json({ status: true, data: "Student Added" })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error adding Student !!!" })
    }
}

// to get all students info
const getAllStudents = async (req, res) => {
    try {
        let students = await Student.findAll({})
        return res.json({ status: students.length == 0 ? false : true, data: students.length == 0 ? "No Student data!" : students })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching Students data !!!" })
    }
}

// get particular student info
const getOneStudent = async (req, res) => {
    try {
        let id = req.params.id
        let student = await Student.findOne({
            where: { id }
        })
        return res.json({ status: student.length == 0 ? false : true, data: student.length == 0 ? "No Student data!" : student })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching Student data !!!" })
    }
}

const updateStudent = async (req, res) => {
    try {
        let id = req.params.id
        const student = await Student.update(req.body, { where: { id }})
        return res.json({ status: true, data: "Student data updated" })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error updating Student data !!!" })
    }
}

const deleteStudent = async (req, res) => {
    try {
        let id = req.params.id
        await Student.destroy({ where: { id }})
        return res.json({ status: true, data: "Student data deleted" })
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error deleting Student data !!!" })
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getOneStudent,
    updateStudent,
    deleteStudent
}