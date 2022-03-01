var CryptoJS = require("crypto-js")
var AES = require("crypto-js/aes");
// var SHA256 = require("crypto-js/sha256");

const SetClientAdminCookies = async function (adminId, expiryTime) {
    try {
        let exp = new Date(expiryTime)
        let aid = AES.encrypt(adminId, process.env.React_App_Encryption_Key).toString().toString()
        console.log("Here too")
        console.log(aid)
        document.cookie = "adminId=" + aid + "; expires=" + exp.toUTCString();
        console.log(AES.decrypt(aid, process.env.React_App_Encryption_Key).toString(CryptoJS.enc.Utf8))

    }
    catch (err) {
        console.log(err)
        console.log("Error setting admin client cookies")
    }
}
const SetClientStudentCookies = async function (studentId, expiryTime) {
    try {
        console.log("Here too1")
        let exp = new Date(expiryTime)
        let sid = AES.encrypt(studentId, process.env.React_App_Encryption_Key).toString().toString()
        document.cookie = "studentId=" + sid + "; expires=" + exp.toUTCString();
        console.log(AES.decrypt(sid, process.env.React_App_Encryption_Key).toString(CryptoJS.enc.Utf8))
    }
    catch (err) {
        console.log("Error setting student client cookies")
    }
}
const RemoveClientAdminCookies = async function (history) {
    try {
        let expiryTime = new Date(expiryTime)
        document.cookie = "adminId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie += "isAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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
        const decryptedCookie = AES.decrypt(adminCookie, process.env.React_App_Encryption_Key).toString(CryptoJS.enc.Utf8)
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
const VerifyStudentCookie = function (studentCookie) {
    try {
        const decryptedCookie = AES.decrypt(studentCookie, process.env.React_App_Encryption_Key).toString(CryptoJS.enc.Utf8)
        console.log(decryptedCookie)

        let year = parseInt(decryptedCookie[0] + decryptedCookie[1])
        let branch = decryptedCookie[2] + decryptedCookie[3]
        let admissionType = decryptedCookie[4] + decryptedCookie[5] + decryptedCookie[6]
        let admissionNumber = parseInt(decryptedCookie[7] + decryptedCookie[8] + decryptedCookie[9])
        if (year <= 0 && year >= 99) {
            throw "Year not in range"
        }
        else if (admissionNumber <= 0 && admissionNumber >= 999) {
            throw "Admission number not in range"
        }
        return true

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
    VerifyAdminCookie,
    VerifyStudentCookie
}