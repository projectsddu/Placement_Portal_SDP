const SECRETKEY = require("./Secrets")
var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
const SetClientAdminCookies = async function (adminId, expiryTime) {
    try {
        console.log("Here too")
        let exp = new Date(expiryTime)
        let aid = AES.encrypt(adminId, SECRETKEY.SECRETKEY).toString().toString()
        document.cookie = "adminId=" + aid + "; expires=" + exp.toUTCString();
        document.cookie = "isAdmin=" + true + "; expires=" + exp.toUTCString();
        console.log(AES.decrypt(aid, SECRETKEY.SECRETKEY).toString(CryptoJS.enc.Utf8))


    }
    catch (err) {
        console.log(err.toString())
        console.log("Error setting admin client cookies")
    }
}
const SetClientStudentCookies = async function (studentId, expiryTime) {
    try {
        // let expiryTime = new Date(expiryTime)
        // let studentId = AES.encrypt(studentId, SECRETKEY.SECRETKEY)
        // document.cookie = "studentId=" + studentId + "; expires=" + expiryTime.toUTCString();
        // document.cookie += "isAdmin=" + false + "; expires=" + expiryTime.toUTCString();
        console.log("Here too")
        let exp = new Date(expiryTime)
        let sid = AES.encrypt(studentId, SECRETKEY.SECRETKEY)
        document.cookie = "studentId=" + sid + "; expires=" + exp.toUTCString();
        document.cookie = "isAdmin=" + false + "; expires=" + exp.toUTCString();
        console.log(AES.decrypt(sid, SECRETKEY.SECRETKEY).toString(CryptoJS.enc.Utf8))
    }
    catch (err) {
        console.log("Error setting student client cookies")
    }
}
const RemoveClientAdminCookies = async function (history) {
    try {
        let expiryTime = new Date(expiryTime)
        document.cookie = "adminId=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        document.cookie += "isAdmin=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    }
    catch (err) {
        console.log("Error Removing Admin client cookies")
    }
}
const RemoveClientStudentCookies = async function (history) {
    try {
        document.cookie = "studentId=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
        document.cookie = "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC"
    }
    catch (err) {

        console.log("Error setting Student client cookies")
    }
}

const parseCookies = function (cookieData) {
    try {
        let retDict = {}
        let cookies = cookieData.split(";")
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split("=")
            retDict[cookie[0]] = cookie[1]
        }
        return retDict
    }
    catch (err) {

        console.log("Error parsing cookies")
    }
}

const VerifyAdminCookie = function (adminCookie) {
    try {
        const decryptedCookie = AES.decrypt(adminCookie, SECRETKEY.SECRETKEY).toString(CryptoJS.enc.Utf8)
        console.log(decryptedCookie)
        if (decryptedCookie == "admin") {

            return true
        }
        else {
            return false
        }
    }
    catch (err) {
        console.log(err.toString())
        return false
    }
}


module.exports = {
    SetClientAdminCookies,
    SetClientStudentCookies,
    RemoveClientAdminCookies,
    RemoveClientStudentCookies,
    parseCookies,
    VerifyAdminCookie
}