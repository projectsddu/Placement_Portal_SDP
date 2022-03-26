const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const UserLoginService = require("../Services/UserLoginService")
const ResponseService = require("../Services/ResponseService")
const ERROR = ResponseService.ERROR
const OK = ResponseService.OK

const loginUser = async (req, res) => {
    try {
        const username = req.body.Student_ID
        const token = await UserLoginService.loginUser(username, req.body.password)
        if (token == "Please Set your password to continue") {
            const savedCookie = await res.cookie("StudentId", username, {
                expires: new Date(Date.now() + 258920),
                httpOnly: true,
            })
            return res.json({ status: true, data: token })
        }
        if (token) {
            const savedCookie = await res.cookie("LoginToken", token, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true,
            });
            const userCookie = await res.cookie("UserId", username, {
                expires: new Date(Date.now() + 2589200000),
                httpOnly: true,
            });
            return res.json({ status: true, data: "Logged in successfully!" })
        }
        else {
            throw "Error in generating token!"
        }
    }
    catch (err) {
        log.error(err.toString())
        return res.json({ status: false, data: "Wrong username or password!" })
    }
}



const changePasswordFirstTime = async (req, res) => {
    try {
        const StudentId = req.cookies.StudentId
        if (StudentId) {
            console.log("Student Id", StudentId)
            if (req.body.newPassword == req.body.confirmNewPassword) {
                const resp = await UserLoginService.changePasswordFirstTime(StudentId, req.body.oldPassword, req.body.newPassword)
                if (resp == "Password updated successfully") {
                    return OK(res, resp)
                }
                else {
                    return ERROR(res, resp)
                }
            }
            else {
                return ERROR(res, "Oops new password do not match ")
            }

        }
        else {
            console.log("Token expired user entered in changePasswordFirstTime")
            return ERROR(res, "Please login again with first time credentials")
        }
    }
    catch (err) {
        console.log(err)
        return ERROR(res, "Some Error occured in updating pasword!")
    }
}



const changePassword = async (req, res) => {
    try {
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const newPasswordConfirm = req.body.newPasswordConfirm
        console.log(oldPassword, newPassword, newPasswordConfirm)
        if (newPassword != newPasswordConfirm) {
            return ERROR(res, "New passwords do not match")
        }
        else if (oldPassword == newPassword) {
            return ERROR(res, "New password cannot be same as old password")
        }
        else {
            const status = await UserLoginService.changePassword(req.userId, oldPassword, newPasswordConfirm)
            if (status == true) {
                await res.clearCookie('LoginToken');
                await res.clearCookie('UserId');
                return OK(res, "Password updated successfully. Please login again")
            }
            else if (status == "Too small password! password must be atleast 8 characters long." || status == "Your old password is not correct") {
                return ERROR(res, status)
            }
            else {
                return ERROR(res, "There was some error updating the password.")
            }
        }
    }
    catch (err) {
        console.log(err)
        return ERROR(res, "Cannot set your password!")
    }
}

module.exports = {
    loginUser,
    changePasswordFirstTime,
    changePassword
}