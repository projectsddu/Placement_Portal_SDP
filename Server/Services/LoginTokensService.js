const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const LoginTokens = db.LoginTokens
const jwt = require("jsonwebtoken")

const addToken = async (loginId) => {
    try {
        const token = jwt.sign({ id: loginId }, "SECRETKEY")
        const payLoad = { LoginId: loginId, Token: token }
        const status = await LoginTokens.create(payLoad)
        if (status) {
            return token
        }
        else {
            return false
        }
    }
    catch (err) {
        log.error("Error adding tokens!" + err.toString())
        console.log(err.toString());
        return false
    }
}


module.exports = {
    addToken
}