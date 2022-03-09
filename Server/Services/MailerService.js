require("dotenv").config();
const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = "1//04v41n0pPJYJNCgYIARAAGAQSNwF-L9IrDeLZFk-mYVho5MP3nSpv_Rvhol_tCNa_S9yp1ctE1dUltQH6BMGkt_oYDNcarxqcBlg"
console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN)

async function sendMail(mailDetails) {

    // console.log("> ")
    try {

        const OAuthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
        OAuthClient.setCredentials({ refresh_token: REFRESH_TOKEN })
        const accessToken = await OAuthClient.getAccessToken()
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "abcxyz1814@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        let result = await mailTransporter.sendMail(mailDetails)
        if (result) {
            // console.log("Here in true")
            return true
        }
        else {
            // console.log("Here in false")
            return false
        }
    }
    catch (err) {
        console.log("Some error")
        console.log(err)
        return false
    }

    // let mailTransporter = nodemailer.createTransport({
    //     service: process.env.EMAIL_SERVICE,
    //     auth: {
    //         user: process.env.EMAIL_ID,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });

    // await mailTransporter.sendMail(mailDetails, function (err, data) {
    //     if (err) {
    //         log.error(err.toString())
    //         return false
    //     } else {
    //         console.log(`Email sent to ${mailDetails.to} successfully`);
    //         return true
    //     }
    // })

    // return false
    // let mailDetails = {
    //     from: 'abcxyz1814@gmail.com',
    //     to: 'abc@gmail.com',
    //     subject: 'Test mail',
    //     text: 'Node.js testing mail for GeeksforGeeks'
    // };
}


const notificationMail = async (notificationData, to) => {
    try {
        let mailDetails = {
            from: 'abcxyz1814@gmail.com',
            to: to,
            subject: notificationData.subject,
            html: `<!DOCTYPE html>
            <html>
            <head>
            

            </head>
            <body>
                <div style="width:800px; margin:0 auto; text-align: center; background: #F55734">
                    <i>
                        <h2 style="color: white; padding: 2%;">
                            DHARMSINH DESAI UNIVERSITY
                        </h2>
                    </i>
                </div>
                <hr style="max-width:800px; margin:0 auto;">
                <div style="max-width:800px; margin:0 auto; min-height: 500px; background: #e7e9eb">
                    <h1 style="padding-left: 20px; padding-top: 20px;">
                        ${notificationData.header}
                    </h1>
                    <p style="padding-left: 20px;">
                        ${notificationData.body}
                    </p>
                </div>
                <hr style="max-width:800px; margin:0 auto;">
                <div style="width:800px; margin:0 auto; text-align: center; background: #706e6f">
                    <i>
                        <h2 style="color: white; padding: 2%;">
                            &copy; DHARMSINH DESAI UNIVERSITY PLACEMENT PORTAL
                        </h2>
                    </i>
                </div>
            </body>
            </html>
            `

        };

        const status = await sendMail(mailDetails)
        console.log(`> Mail sent to ${to} successfully`)
        return status
    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

const batchNotificationMail = async (notificationData, students_list) => {
    // try {
    //     let mailDetails = {
    //         from: 'abcxyz1814@gmail.com',
    //         to: to,
    //         subject: 'Test mail',
    //         html: "<b>Hello world?</b>"
    //         // text: 'Node.js testing mail for GeeksforGeeks'
    //     };
    // }
    // catch (err) {
    //     log.error(err.toString())
    //     return false
    // }
}

const subscribeMail = async (announcementData) => {

    try {

    }
    catch (err) {
        log.error(err.toString())
        return false
    }
}

module.exports = {
    notificationMail,
    subscribeMail,
    batchNotificationMail
}