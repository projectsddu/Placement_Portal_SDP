const express = require("express")
const multer = require('multer');
const path = require('path');
const http = require("http")
const app = express()
const hostingConfig = require("./Config/hostingConfig")
const StudentRouter = require("./Routers/StudentRouter")
const AnnoucementRouter = require("./Routers/AnnoucementRouter")
const CompanyRouter = require("./Routers/CompanyRouter")
const StudentPlacementRouter = require("./Routers/StudentPlacementRouter")
const StudentInternshipRouter = require("./Routers/StudentInternshipRouter")
const AnnouncementSubscibeRouter = require("./Routers/AnnouncementSubscribeRouter")
const NotificationRouter = require("./Routers/NotificationRouter")
const StudentLoginRouter = require("./Routers/StudentLoginRouter")
const CommentRouter = require("./Routers/CommentRouter")
const cookieParser = require('cookie-parser');
const MailerService = require("./Services/MailerService")
const SkillsAndAchievementsRouter = require("./Routers/SkillsAndAchievementRouter")
const AdminLoginRouter = require("./Routers/AdminLoginRouter")
const StudentProjectRouter = require("./Routers/StudentProjectRouter")
const StudentAchievementsInternshipsRouter = require("./Routers/StudentAchievementsInternshipsRouter")

require("dotenv").config();

// Middlewares


try {


    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname + '/public'));
    app.use(cookieParser());


    // Testing API

    app.get("/dummyMail", async (req, res) => {
        let status = await MailerService.notificationMail("keval sleeping", "jenilgandhi2111@gmail.com")
        console.log(status)
        res.send(status)
    })
    app.post("/postTest", (req, res) => {
        res.send(req.body)
    })




    // const port = hostingConfig.SERVER_PORT_NO

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT
            }`)
    })

    //routers
    app.use("/public", express.static(__dirname + "/public"));
    app.use("/student", StudentRouter)
    app.use("/studentLogin", StudentLoginRouter)
    app.use("/annoucement", AnnoucementRouter)
    app.use("/company", CompanyRouter)
    app.use("/studentplacement", StudentPlacementRouter)
    app.use("/studentinternship", StudentInternshipRouter)
    app.use("/subscribeannouncement", AnnouncementSubscibeRouter)
    app.use("/comment", CommentRouter)
    app.use("/notifications", NotificationRouter)
    app.use("/adminLogin", AdminLoginRouter)
    app.use("/skillsandachievements", SkillsAndAchievementsRouter)
    app.use("/studentproject", StudentProjectRouter)
    app.use("/StudentAchievementsInternships", StudentAchievementsInternshipsRouter)
    app.get("/", (req, res) => {
        res.send("Working all right!")
    })
}
catch (err) {
    console.log(err.toString())
}
