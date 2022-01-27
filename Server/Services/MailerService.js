const logger = require("serverloggerjs/logger")
const log = new logger(true)
const db = require("../Models/index")
const nodemailer = require('nodemailer')

async function sendMail(mailDetails) {

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abcxyz1814@gmail.com',
            pass: 'abcxyzpass'
        }
    });

    await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            log.error(err.toString())
            return false
        } else {
            console.log(`Email sent to ${mailDetails.to} successfully`);
            return true
        }
    })

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
            <style> 
            </style>
            </head>
            <body>
                <h1>
                    ${notificationData.header}
                </h1>
                <p>
                    ${notificationData.body}
                </p>
            </body>
            </html>
            `
        };

        const status = await sendMail(mailDetails)

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