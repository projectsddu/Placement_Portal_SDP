const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
const MailerService = require("./MailerService")
const FirstTimeModel = db.FirstTimeLogin
const StudentModel = db.students
const StudentService = require("./StudentService")

const generateRandomPassword = (length) => {
    try {
        var res = ""
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@%^&*';
        var charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            const seed = parseInt((Math.random() * 10000) % (charactersLength - 1))
            res += (characters[seed])
        }
        return res
    }
    catch (err) {
        console.log(err.toString())
        return false
    }
}


const AddFirstTimePassword = async (studentId) => {
    try {
        const rawPassword = generateRandomPassword(16)
        console.log(rawPassword)
        const password = AES.encrypt(rawPassword, process.env.ECRYPTION_KEY).toString()
        console.log(password)
        const payLoad = {
            StudentId: studentId,
            FirstTimePassword: password
        }
        await FirstTimeModel.create(payLoad)

        return rawPassword
    }
    catch (err) {
        log.error(err.toString())
        console.log(err.toString())
        return false
    }
}


const getFirstTimePassword = async (studentId) => {
    try {
        const data = await FirstTimeModel.find({
            where: {
                StudentId
                    : studentId
            }
        })
        return data
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const getAllFirstTimePasswords = async () => {
    try {
        let passwords = await FirstTimeModel.findAll({})
        passwords = JSON.parse(JSON.stringify(passwords))
        for (let i = 0; i < passwords.length; i++) {
            passwords[i]["FirstTimePassword"] = AES.decrypt(passwords[i]["FirstTimePassword"], process.env.ECRYPTION_KEY).toString(CryptoJS.enc.Utf8)
            passwords[i]["id"] = i
        }
        return passwords
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const sendPasswords = async (dateYear) => {
    try {
        const allPasswords = await getAllFirstTimePasswords()
        dateYear = dateYear.toString()
        for (let i = 0; i < allPasswords.length; i++) {
            const date = allPasswords[i]["StudentId"][0] + allPasswords[i]["StudentId"][1]
            if (date == dateYear) {
                let student = await StudentModel.findAll({ where: { Student_ID: allPasswords[i]["StudentId"]}})
                student = JSON.parse(JSON.stringify(student))
                await MailerService.notificationMail({
                    "header": "Your Access To Placement Portal", "body": `You can access the DDU placement portal via the following credentials<br/><b>Student Id:</b>${allPasswords[i]["StudentId"]}<br/><b>Password:</b> ${allPasswords[i].FirstTimePassword}<br/>please visit ${process.env.DOMAIN}  to login`
                }, student[0]["Email_ID"]
                )
            }
        }
        return true
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    getAllFirstTimePasswords,
    getFirstTimePassword,
    AddFirstTimePassword,
    sendPasswords
}