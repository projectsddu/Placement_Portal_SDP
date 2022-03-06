const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const UserLogin = db.userLogin
const SHA256 = require("crypto-js/sha256")
const LoginTokenService = require("./LoginTokensService")
const StudentService = require("./StudentService")
const jwt = require("jsonwebtoken")
const Student = db.students
// const { where } = require("sequelize/dist")

const getUserLoginObj = async (studentId) => {
    try {
        const userLoginObj = await UserLogin.findAll({ where: { studentId } })
        return userLoginObj
    }
    catch (err) {
        return false
    }
}

const createUserLogin = async (studentId, password) => {
    try {
        // const userDob = new Date(DOB)
        // const userPassword = userDob.getDate() + "/" + userDob.getMonth() + "/" + userDob.getFullYear()
        await UserLogin.create({ Password: SHA256(password).toString(), LoginId: studentId, IsFirstTime: true })
    }
    catch (err) {
        log.error("Error creating user login!", err.toString())
        return false
    }
    return true
}

const addFreshPassword = async (studentId, password) => {
    try {
        const userLoginObj = await getUserLoginObj(studentId)
        if (userLoginObj && userLoginObj.IsFirstTime) {
            const passwordHash = SHA256(password).toString()
            const data = { Password: passwordHash, IsFirstTime: false }
            const status = await UserLogin.update(data, { where: { studentId } })
            if (status) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }

    }
    catch (err) {
        return false
    }
}

const changePassword = async (studentId, oldPassword, newPassword) => {
    try {
        const userLoginObj = await getUserLoginObj(studentId);
        if (userLoginObj) {
            const oldPasswordHash = SHA256(oldPassword).toString()
            if (oldPasswordHash == userLoginObj.Password) {
                const status = await UserLogin.update({ Password: SHA256(newPassword).toString() }, { where: { studentId } })
                if (status) {
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
    catch (err) {
        return false
    }
}


const loginUser = async (loginId, password) => {
    try {
        const loginObj = await UserLogin.findAll({ where: { LoginId: loginId, Password: SHA256(password).toString() } })

        if (loginObj.length == 0) {
            return false
        }
        else {
            const token = await LoginTokenService.addToken(loginId);
            if (token) {
                return token
            }
            else {
                return false
            }
        }
    }
    catch (err) {
        return false
    }
}

const verifyUser = async (token, userId) => {
    try {
        // console.log(token);
        const uid = jwt.verify(token, "SECRETKEY")
        // console.log(userId);
        // console.log(uid.id);
        if (userId.toString() == uid.id.toString()) {
            // console.log("here");
            let student = await Student.findOne({
                where: { Student_ID: userId.toString() }
            })
            return student
        }
        else {
            // console.log("false");
            return false;
        }
    }
    catch (err) {
        return false
    }
}
module.exports = {
    addFreshPassword,
    changePassword,
    createUserLogin,
    loginUser,
    verifyUser
}