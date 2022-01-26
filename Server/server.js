const express = require("express")
const multer = require('multer');
const path = require('path');
const app = express()

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

// Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());


// Testing API
app.get("/", (req, res) => {
    res.send("Working all right!")
})
app.get("/dummyMail", async (req, res) => {
    let status = await MailerService.notificationMail("keval sleeping", "jenilgandhi2111@gmail.com")
    console.log(status)
    res.send(status)
})
app.post("/postTest", (req, res) => {
    res.send(req.body)
})

const port = 8000

app.listen(port, () => {
    console.log("Server is running on port 8000")
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
