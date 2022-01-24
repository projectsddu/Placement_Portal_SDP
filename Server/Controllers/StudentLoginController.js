const db = require("../Models")
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const UserLoginService = require("../Services/UserLoginService")

const loginUser = async (req, res) => {
    try {
        const username = req.body.username
        const password = new Date(req.body.password)
        const userPassword = password.getDate() + "/" + password.getMonth() + "/" + password.getFullYear()
        console.log(username, userPassword);
        // console.log(password);
        // console.log(username, userPassword);
        const token = await UserLoginService.loginUser(username, userPassword)
        if (token) {
            // set cookie/.....

            // console.log(token);
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


module.exports = {
    loginUser
}