const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const StudentService = require("../Services/StudentService")
const Student = db.students
const Announcement = db.announcements
// require csvtojson module
const CSVToJSON = require('csvtojson');
const fs = require("fs")
// to add a new student
const addStudent = async (req, res) => {
    try {
        // Student.create({
            // Student_ID: "19CEUOS001",
            // FirstName: "Manan",
            // MiddleName: "Dipakkumar",
            // LastName: "Chauhan",
            // Admission_type: "Normal",
            // Cast_category: "General",
            // Gender: "Male",
            // DOB: "2001-02-29",
            // SSC_Percentage: 85.59,
            // SSC_Percentile: 95.97,
            // SSC_Board: "GSEB",
            // SSC_School: "GTG",
            // HSC_Percentage: 80.59,
            // HSC_Percentile: 95.97,
            // HSC_Board: "GSEB",
            // HSC_School: "GTG",
            // IsD2D: "FALSE",
            // Diploma_Result_CPI: 0,
            // Diploma_Result_Percentage: 0,
            // Diploma_College_Name: "NOT APPLICABLE",
            // Diploma_University: "NOT APPLICABLE",
            // Sem_1_SPI: 9.5,
            // Sem_2_SPI: 9.2,
            // Sem_3_SPI: 9.1,
            // Sem_4_SPI: 9.1,
            // Sem_5_SPI: 9.2,
            // Sem_6_SPI: 9.1,
            // Sem_7_SPI: 9.0,
            // Sem_8_SPI: 9.5,
            // Current_CPI: 9.5,
            // Enrollment_year: "2019",
            // Passed_out_year: "2023",
            // Email_ID: "abc@gmail.com",
            // Contact_No_1: "1234567890",
            // Contact_No_2: "0987654321",
            // Address: "gujarat",
            // City: "vadodara",
            // Pin_Code: "390021",
            // Current_semester: "6",
            // Career_Preference: "Placement",
            // CV_Upload: "image.png",
            // Student_Photo: "image1.png",
            // Branch_Id: "CE"
        // })
        // Student.create(req.body)



        // convert students.csv file to JSON array
        const path = "./public/student_details/DDU.csv"
        const studentData = await CSVToJSON().fromFile(path)
        // console.log(studentData.length);

        if(studentData)
        {
            for (let i = 0; i < studentData.length; i++) {
    
                // console.log(studentData[i]);
    
                try {

                    let studentStatus = await StudentService.createStudent(studentData[i]);

                } catch (error) {

                    log.error(error.toString());
                    throw "Error from create student using file"

                }
            }
        }
        return res.json({ status: true, data: "Student Added" })

        // if (studentStatus) {
        //     return res.json({ status: true, data: "Student Added" })
        // }
        // else {
        //     throw "Error from create student controller"
        // }
        
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error adding Student !!!" })
    }
}

// to get all students info
const getAllStudents = async (req, res) => {
    try {
        let students = await StudentService.getAllStudents()
        if (students) {

            return res.json({ status: students.length == 0 ? false : true, data: students.length == 0 ? "No Student data!" : students })
        }
        else {
            throw "Error in getAllstudents"
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching Students data !!!" })
    }
}

// get particular student info
const getOneStudent = async (req, res) => {
    try {
        let id = req.userId
        console.log(id)
        let student = await StudentService.getOneStudent(id)
        if (student) {

            return res.json({ status: student.length == 0 ? false : true, data: student.length == 0 ? "No Student data!" : student })
        }
        else {
            throw "Error in get One student"
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching Student data !!!" })
    }
}

const getOneStudentInAdmin = async (req, res) => {
    try
    {
        const student_id = req.params.id;
        console.log(student_id)

        let student = await StudentService.getOneStudent(student_id)
        if (student) {

            return res.json({ status: student.length == 0 ? false : true, data: student.length == 0 ? "No Student data!" : student })
        }
        else {
            throw "Error in get One student in admin"
        }

    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error Fetching Student data !!!" })
    }
}

const updateStudent = async (req, res) => {
    try {

        // convert students.csv file to JSON array
        const path = "./public/student_details/DDU.csv"
        const studentData = await CSVToJSON().fromFile(path)
        console.log(studentData.length);

        
        if(studentData)
        {
            for (let i = 0; i < studentData.length; i++) {
                
                console.log(studentData[i]);
                let id = studentData[i]["Student_ID"];
                console.log(id)
                
                try {

                    let studentStatus = await StudentService.updateStudent(studentData[i], id)
                    if(!studentStatus)
                    {
                        throw `Error from update student for record ${id}`
                    }

                } catch (error) {

                    log.error(error.toString());
                    throw error.toString()

                }
            }
        }
        return res.json({ status: true, data: "Student data updated" })



        // const studentData = await StudentService.updateStudent(req.body, id)
        // if (studentData) {
        //     return res.json({ status: true, data: "Student data updated" })
        // }
        // else {
        //     throw "Error updating student"
        // }
    }
    catch (err) {
        log.error(err.toString())
        console.log()
        return res.json({ status: false, data: err.toString() })
    }
}

const CV_Upload = async(req, res) => {
    try {
        let id = req.userId;
        const studentData = await StudentService.CV_Upload("./public/student_details/CV/" + id +".pdf", id)
        if(studentData)
        {
            return res.json({status: true, data: "Student CV uploaded"})
        }
        else
        {
            throw "Error uploading student CV"
        }

    } catch (error) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error updating Student CV !!!" })
    }
}



const deleteStudent = async (req, res) => {
    try {
        let id = req.params.id
        const status = await StudentService.deleteStudent(id)
        if (status) {
            res.json({ status: true, data: "Student data deleted" })
        }
        else {
            throw "Error deleting student!"
        }

    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Error deleting Student data !!!" })
    }
}

const Photo_Upload = async (req, res) => {
    try {
        let id = req.userId
        const studentData = await StudentService.Photo_Upload("./public/student_details/Photo/" + id +".jpg", id)
        if(studentData)
        {
            return res.json({status: true, data: "Student Photo uploaded"})
        }
        else
        {
            throw "Error uploading student Photo"
        }
    } catch (error) {
        log.error(error.toString())
        return res.json({ status: true, data: "Error updating student photo !!!" })
    }
}

module.exports = {
    addStudent,
    getAllStudents,
    getOneStudent,
    updateStudent,
    CV_Upload,
    deleteStudent,
    Photo_Upload,
    getOneStudentInAdmin
}