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
            subject: 'Test mail',
            html: `<!DOCTYPE html>
            <html>
            <head>
            <style> 
            div {
              width: 100px;
              height: 50px;
              background-color: red;
              font-weight: bold;
              position: relative;
              animation: mymove 5s infinite;
            }
            
            #div1 {animation-timing-function: linear;}
            #div2 {animation-timing-function: ease;}
            #div3 {animation-timing-function: ease-in;}
            #div4 {animation-timing-function: ease-out;}
            #div5 {animation-timing-function: ease-in-out;}
            
            @keyframes mymove {
              from {left: 0px;}
              to {left: 300px;}
            }
            </style>
            </head>
            <body>
            <div id="div1">linear</div>
            <div id="div2">ease</div>
            <div id="div3">ease-in</div>
            <div id="div4">ease-out</div>
            <div id="div5">ease-in-out</div>
            
            </body>
            </html>
            `
            // text: 'Node.js testing mail for GeeksforGeeks'
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