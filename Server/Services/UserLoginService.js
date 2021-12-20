const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const UserLogin = db.userLogin
const SHA256 = require("crypto-js/sha256")


const getUserLoginObj = async (studentId) => {
    try {
        const userLoginObj = await UserLogin.findAll({ where: { studentId } })
        return userLoginObj
    }
    catch (err) {
        return false
    }
}

const createUserLogin = async (studentId) => {
    try {
        await UserLogin.create({ Password: "notassigned", studentId })
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

module.exports = {
    addFreshPassword,
    changePassword,
    createUserLogin
}